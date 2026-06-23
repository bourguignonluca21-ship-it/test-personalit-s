<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Procédure de commit / push

Le dépôt vit dans OneDrive et `.git` n'est accessible que depuis Windows (pas depuis le sandbox Cowork). Donc commit/push se font ici, dans Claude Code. Quand on me demande « commit » ou « push » :

1. `git status` pour voir ce qui a changé, et vérifier qu'on est bien sur la branche `main`.
2. Si un fichier `.git/index.lock` existe, le supprimer (`del .git\index.lock`).
3. Lancer `npm run build`. **Si le build échoue, afficher l'erreur et NE PAS pousser** (corriger d'abord, ou demander).
4. Si le build passe : `git add -A`, puis commit avec un message clair (résumé court ; bullets si gros changement), puis `git push`.

Le détail de l'état du projet, des décisions et du point de reprise est dans `ETAT_DU_PROJET.md` (à lire en premier pour reprendre le contexte).

