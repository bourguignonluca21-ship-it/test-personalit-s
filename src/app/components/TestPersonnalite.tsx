"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Quiz from "./Quiz";
import ScrollHaut from "./ScrollHaut";
import TestPageTitle from "./TestPageTitle";
import { PHASE1_QUESTIONS, getPhase2Questions } from "../data/questions";
import { calculerType, calculerVariante, encoderScores } from "../data/moteur";
import { getTypeByCode } from "../data/types";

const STEPS = [
  {
    step: "Étape 1",
    title: "Réponds au test",
    description: "Sois toi-même et réponds en toute sincérité.",
    color: "rgba(51,164,116,0.85)",
    bg: "#f3fbf7",
  },
  {
    step: "Étape 2",
    title: "Découvre ton profil",
    description: "Vois comment ton type influence ta vie, tes relations et ta carrière.",
    color: "rgba(51,164,116,0.85)",
    bg: "#e7f5ee",
  },
  {
    step: "Étape 3",
    title: "Va plus loin",
    description: "Explore ton profil en profondeur et trouve les réponses qu'il te faut.",
    color: "rgba(51,164,116,0.85)",
    bg: "#d8f1e4",
  },
];

// 60 questions de phase 1 + 9 de variante = 69 (total affiché, sans rupture visible).
const TOTAL = PHASE1_QUESTIONS.length + 9;

export default function TestPersonnalite({
  invitation,
}: {
  /* PARCOURS À DEUX, côté invité (vérifié côté serveur, test/page.tsx) :
     jeton signé + prénom de l'inviteur. null = test normal. */
  invitation?: { jeton: string; prenom: string } | null;
} = {}) {
  const router = useRouter();
  // Miroir des réponses du Quiz (clés = id de question) pour recalculer le type en continu.
  const [answers, setAnswers] = useState<Record<string, number>>({});
  /* Le bloc d'accueil de l'invitation (VISUEL PROVISOIRE, à reprendre avec
     Luca) : ouvert à l'arrivée si l'invitation est valide. */
  const [invitOuverte, setInvitOuverte] = useState(!!invitation);
  /* Fermeture EN FONDU (0,3 s) : « C'est parti » ou un clic n'importe où
     lance le fondu de sortie, puis le bloc est démonté. */
  const [invitFermeture, setInvitFermeture] = useState(false);
  function fermerInvit() {
    if (invitFermeture) return;
    setInvitFermeture(true);
    window.setTimeout(() => setInvitOuverte(false), 300);
  }

  // Type provisoire dès que les 60 de phase 1 sont répondues (recalculé à chaque changement).
  const phase1Done = PHASE1_QUESTIONS.every((q) => answers[q.id] != null);
  const typeProvisoire = phase1Done ? calculerType(PHASE1_QUESTIONS, answers) : null;

  // Type réellement affiché : suit typeProvisoire, mais reste monté le temps du fondu de sortie.
  const [shownType, setShownType] = useState<string | null>(null);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    if (typeProvisoire) {
      setShownType(typeProvisoire);
      setLeaving(false);
    } else if (shownType) {
      setLeaving(true);
      const t = setTimeout(() => {
        setShownType(null);
        setLeaving(false);
      }, 360);
      return () => clearTimeout(t);
    }
  }, [typeProvisoire, shownType]);

  const phase2Questions = shownType ? getPhase2Questions(shownType) : [];

  // Liste affichée : phase 1, puis (une fois le type connu) les 9 questions de variante.
  const allQuestions = [
    ...PHASE1_QUESTIONS.map((q) => ({ id: q.id, texte: q.texte })),
    ...phase2Questions.map((q) => ({ id: q.id, texte: q.texte })),
  ];

  // Titre révélé juste avant les questions de variante : code + nom du type, puis « Trouve ta variante ».
  const typeInfo = shownType ? getTypeByCode(shownType) : undefined;
  const phase2Intro = shownType ? (
    <div className={`my-12 ${leaving ? "variante-leave" : "variante-enter"}`}>
      <div
        className="text-white text-center py-16 px-6 rounded-3xl flex flex-col items-center gap-4"
        style={{ background: "rgba(51,164,116,0.75)" }}
      >
        <div className="flex items-baseline justify-center gap-3 flex-wrap leading-none">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-none">{shownType}</h2>
          {typeInfo && <span className="text-xl text-white/80 leading-none">{typeInfo.name}</span>}
        </div>
        <p className="text-2xl md:text-3xl font-bold tracking-tight leading-none">Trouve ta variante</p>
        <p className="text-base md:text-lg text-white/85 max-w-md mx-auto leading-[1.9] text-balance">
          Les personnalités donnent les grandes lignes ; entre elles, 3 variantes te rendent presque
          unique.
        </p>
        <p className="text-sm italic text-white leading-tight whitespace-nowrap">
          Si une réponse précédente est modifiée, les questions de la variante s&apos;adapteront.
        </p>
      </div>
    </div>
  ) : null;

  return (
    <>
      <ScrollHaut />
      <Quiz
      title="Test de personnalité"
      titleNode={<TestPageTitle />}
      subtitle="48 portraits possibles · Un seul te ressemble"
      microligne={
        <>
          <span className="font-semibold" style={{ color: "rgb(82,178,137)" }}>Gratuit</span> · 10 minutes · 69 questions
        </>
      }
      questions={allQuestions.map((q) => q.texte)}
      questionIds={allQuestions.map((q) => q.id)}
      total={TOTAL}
      phase1Count={PHASE1_QUESTIONS.length}
      phase2Intro={phase2Intro}
      steps={STEPS}
      accent="rgba(51,164,116,0.75)"
      note="Réponds à toutes les questions pour découvrir ton profil."
      onAnswersChange={setAnswers}
      onSubmit={(ans, info) => {
        const code = calculerType(PHASE1_QUESTIONS, ans);
        const v = calculerVariante(code, getPhase2Questions(code), ans);
        const scores = encoderScores(PHASE1_QUESTIONS, ans);
        const vs = `${v.scores.V1}-${v.scores.V2}-${v.scores.V3}`;
        const slug = `${code.toLowerCase()}-${v.variante.toLowerCase()}`;
        // Envoi du mail « ton profil » + inscription newsletter (best-effort).
        // keepalive : la requête survit à la navigation vers la page résultat.
        if (info.email || info.newsletter) {
          fetch("/api/rapport", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            keepalive: true,
            body: JSON.stringify({
              email: info.email,
              newsletter: info.newsletter,
              slug,
              s: scores,
              v: vs,
              origin: window.location.origin,
            }),
          }).catch(() => {});
        }
        /* Invité d'un parcours à deux : le jeton suit jusqu'au résultat,
           c'est lui qui rattachera ce résultat à l'inviteur (table liens). */
        const invite = invitation ? `&invite=${encodeURIComponent(invitation.jeton)}` : "";
        router.push(`/resultat/${slug}?s=${scores}&v=${vs}${invite}`);
      }}
    />
      {/* ————— BLOC D'INVITATION AU PARCOURS À DEUX (côté invité) —————
          Fenêtre par-dessus la page du test : qui invite + le guide.
          Fermeture par « C'est parti » OU un clic n'importe où, toujours
          en FONDU (0,3 s) avant le démontage. */}
      {invitation && invitOuverte && (
        <div
          onClick={fermerInvit}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 80,
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            display: "grid",
            placeItems: "center",
            padding: 20,
            opacity: invitFermeture ? 0 : 1,
            transition: "opacity .3s ease",
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            /* max-w-xl (au lieu de lg) : le paragraphe guide tient sur
               3 lignes. stopPropagation : cliquer SUR le bloc ne ferme pas
               la fenêtre (seuls le fond et « C'est parti » ferment). */
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-3xl bg-white p-8 text-center"
            style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold tracking-tight"
              style={{ color: "rgba(51,164,116,0.85)" }}
            >
              {`${invitation.prenom} t'invite`}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              {`${invitation.prenom} aimerait faire son parcours à deux avec toi.`}
            </p>
            <p className="mt-3 text-base leading-relaxed text-gray-600">
              {"Dans un premier temps, tu dois réaliser un test de personnalité :"}
              <br />
              {`il trouvera ta personnalité ainsi que ta variante. Et grâce à ce portrait écrit, le parcours à deux de ${invitation.prenom} pourra être créé.`}
            </p>
            <button
              type="button"
              onClick={fermerInvit}
              className="mt-7 rounded-full px-7 py-3 text-sm font-semibold text-white transition-transform hover:scale-105 cursor-pointer"
              style={{ background: "rgba(51,164,116,0.85)" }}
            >
              C&apos;est parti
            </button>
            {/* Réassurance : cadenas + phrase (patron FenetreConnexion) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                marginTop: 16,
                color: "rgba(0,0,0,0.40)",
              }}
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              <span style={{ fontSize: 12 }}>Test gratuit. Tes réponses restent privées.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
