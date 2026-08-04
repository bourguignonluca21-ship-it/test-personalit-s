-- =============================================================================
-- L'EFFACEMENT AUTOMATIQUE DES COMMENTAIRES REFUSÉS
--
-- Le RGPD demande de ne pas garder des données personnelles plus longtemps que
-- nécessaire. Un message refusé sert à deux choses : revenir sur une décision,
-- et repérer un récidiviste. Six mois couvrent largement les deux.
--
-- CE QUI EST EFFACÉ :
--   • les commentaires REFUSÉS de plus de 6 mois ;
--   • les signalements déjà traités de plus de 6 mois.
--
-- CE QUI NE L'EST JAMAIS :
--   • les commentaires publiés — c'est le contenu du site ;
--   • ceux qui attendent encore ta décision — ils ne sont pas traités ;
--   • ceux marqués « AUTORITES » — contenu à signaler, donc à conserver comme
--     preuve. Ceux-là ne doivent pas disparaître tout seuls.
--
-- À coller dans Supabase : SQL Editor → New query → Run.
-- ⚠️ AVANT : activer l'extension pg_cron dans Database → Extensions.
-- =============================================================================

create extension if not exists pg_cron;

create or replace function public.purger_commentaires()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.commentaires
  where etat = 'bloque'
    and cree_le < now() - interval '6 months'
    and coalesce(motif_etat, '') not like 'AUTORITES%';

  delete from public.commentaires_signalements
  where traite = true
    and cree_le < now() - interval '6 months';
$$;

-- Tous les dimanches à 4 h du matin. Si la tâche existe déjà, on la remplace.
select cron.unschedule('purge-commentaires')
where exists (select 1 from cron.job where jobname = 'purge-commentaires');

select cron.schedule(
  'purge-commentaires',
  '0 4 * * 0',
  $$select public.purger_commentaires()$$
);

-- Pour vérifier plus tard que la tâche est bien en place :
--   select jobname, schedule, active from cron.job;
-- Pour la lancer à la main une fois :
--   select public.purger_commentaires();
