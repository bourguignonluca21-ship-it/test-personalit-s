-- =============================================================================
-- LES COMMENTAIRES DES PAGES DE TYPE
-- À coller dans Supabase : menu de gauche « SQL Editor » → « New query » → Run.
-- Sans danger : ne touche à aucune table existante, ne fait que créer.
-- =============================================================================

-- 1. LES COMMENTAIRES ---------------------------------------------------------
-- Le pseudo et le type sont RECOPIÉS dans la ligne au moment d'écrire : ils
-- vivent dans le compte, pas dans une table de profils, et on ne peut pas faire
-- de jointure dessus depuis une lecture publique.
create table if not exists public.commentaires (
  id            uuid primary key default gen_random_uuid(),
  fil           text not null,                    -- le chemin exact de la page
  auteur_id     uuid not null references auth.users(id) on delete cascade,
  auteur_pseudo text not null,
  auteur_type   text,                             -- INFJ, ENFP… si connu
  parent_id     uuid references public.commentaires(id) on delete cascade,
  texte         text not null check (char_length(texte) between 2 and 1500),
  etat          text not null default 'publie'
                check (etat in ('publie', 'a_revoir', 'bloque')),
  motif_etat    text,                             -- pourquoi il est bloqué / à revoir
  cree_le       timestamptz not null default now()
);

create index if not exists commentaires_fil_idx
  on public.commentaires (fil, cree_le desc);
create index if not exists commentaires_parent_idx
  on public.commentaires (parent_id);

-- 2. LES J'AIME ---------------------------------------------------------------
-- Un compte ne peut aimer qu'une fois : c'est la clé primaire qui l'impose.
create table if not exists public.commentaires_jaimes (
  commentaire_id uuid not null references public.commentaires(id) on delete cascade,
  user_id        uuid not null references auth.users(id) on delete cascade,
  cree_le        timestamptz not null default now(),
  primary key (commentaire_id, user_id)
);

-- 3. LES SIGNALEMENTS ---------------------------------------------------------
-- Pas de compte requis : le DSA demande que toute personne puisse signaler.
-- « empreinte » sert seulement à limiter les abus, pas à identifier quelqu'un.
create table if not exists public.commentaires_signalements (
  id             uuid primary key default gen_random_uuid(),
  commentaire_id uuid not null references public.commentaires(id) on delete cascade,
  motif          text not null
                 check (motif in ('haine', 'sexuel', 'danger', 'spam', 'autre')),
  detail         text,                            -- le texte libre d'« autre raison »
  empreinte      text,
  traite         boolean not null default false,
  cree_le        timestamptz not null default now()
);

create index if not exists signalements_a_traiter_idx
  on public.commentaires_signalements (traite, cree_le desc);

-- =============================================================================
-- LES RÈGLES D'ACCÈS
-- Principe : le navigateur ne peut RIEN écrire dans les commentaires. Toute
-- écriture passe par la route serveur, qui est la seule à exécuter les
-- contrôles. Sans ça, il suffirait d'ouvrir les outils du navigateur pour
-- publier n'importe quoi en contournant la modération.
-- =============================================================================

alter table public.commentaires               enable row level security;
alter table public.commentaires_jaimes        enable row level security;
alter table public.commentaires_signalements  enable row level security;

-- Commentaires : tout le monde lit ceux qui sont PUBLIÉS, personne n'écrit.
drop policy if exists "lecture publique des commentaires publies" on public.commentaires;
create policy "lecture publique des commentaires publies"
  on public.commentaires for select
  using (etat = 'publie');

-- J'aime : tout le monde les compte, un inscrit ne pose et ne retire que le sien.
drop policy if exists "lecture publique des jaimes" on public.commentaires_jaimes;
create policy "lecture publique des jaimes"
  on public.commentaires_jaimes for select using (true);

drop policy if exists "un inscrit pose son propre jaime" on public.commentaires_jaimes;
create policy "un inscrit pose son propre jaime"
  on public.commentaires_jaimes for insert with check (auth.uid() = user_id);

drop policy if exists "un inscrit retire son propre jaime" on public.commentaires_jaimes;
create policy "un inscrit retire son propre jaime"
  on public.commentaires_jaimes for delete using (auth.uid() = user_id);

-- Signalements : aucune règle. Personne ne peut ni les lire ni les écrire depuis
-- le navigateur ; seule la route serveur y accède.
