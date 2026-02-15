# Portfolio Paloma DELACROIX — Contexte Projet

## Projet
- **Repo** : `dorianydconcept-tg/portfolio-paloma` (GitHub)
- **Stack** : Next.js, CSS Modules, déployé sur Vercel (auto-deploy sur push main)
- **URL Vercel** : portfolio-paloma sur dorianydconcept-tgs-projects

## État actuel (15 fév 2026)
- **Design actif** : Version "peach-green" (originale) — remise en production
- La refonte "Matière Brute" (brutaliste : fond noir #1a1a1a, ocre #c4712f, Instrument Serif + Syne) a été **revertée** via `git revert` (commit `c8c740a`)
- La branche `backup/version-originale-peach-green` existe comme sauvegarde mais est désormais identique au main
- Le design brutaliste reste dans l'historique git (commit `1fe44a9`) si on veut y revenir

## Historique des features implémentées
1. Implémentation complète initiale (images Behance, avatar vidéo)
2. Diapo splash — coupes rapides style Paul Calver + ordre aléatoire
3. Fix marge TabBar (CSS natif au lieu de Tailwind)
4. Fond Particles animé sur page portfolio
5. ClickSpark — étincelles vertes au clic
6. Bouton fermeture ProjectGallery — croix ronde ×

## Prochaines étapes
- Continuer le développement sur la base du design peach-green

## Structure clé
- `app/` — pages Next.js (layout.tsx, page.tsx, globals.css)
- `components/` — Hero, About, Contact, Home, Work, Splash, TabBar, ProjectGallery
- Chaque composant a son `.module.css`

## Préférences
- Langue : français pour toute communication
- Commits avec Co-Authored-By Claude
