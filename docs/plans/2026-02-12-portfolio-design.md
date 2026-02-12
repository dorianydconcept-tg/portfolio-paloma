# Portfolio — Document de design

## Profil

- **Type** : Hybride Design + Développement
- **Projets** : Mix clients/professionnels et personnels/expérimentaux
- **Direction artistique** : Créatif / expérimental

## Identité visuelle

### Couleurs

| Rôle | Couleur |
|------|---------|
| Accent chaud | `#ffc9b9` (rose pêche) |
| Vert principal | `#4c956c` |
| Vert foncé | `#2c6e49` |
| Fond | `#ffffff` |

### Typographie

- **Police** : Aileron (géométrique sans-serif)
- Titres : Aileron Bold
- Corps : Aileron Regular
- Labels/Tags : Aileron Medium

## Stack technique

- **Next.js 14** (App Router)
- **GSAP + ScrollTrigger** — animations principales
- **Framer Motion** — micro-interactions (hover, transitions)
- **CSS Modules ou Tailwind** — styles scopés

## Architecture

```
app/
├── layout.tsx          ← Barre d'onglets verticale (persistante)
├── page.tsx            ← Splash intro (diaporama) + Hero
├── components/
│   ├── Splash/         ← Diaporama auto + bouton "Entrer"
│   ├── Hero/           ← Nom, sous-titre, plein écran
│   ├── TabBar/         ← Onglets verticaux gauche
│   ├── Home/           ← Accroche + projets vedettes
│   ├── Work/           ← Layout désordre
│   ├── ProjectGallery/ ← Galerie horizontale d'un projet
│   ├── About/          ← Présentation asymétrique
│   └── Contact/        ← Email, liens, formulaire
├── data/
│   └── projects.ts     ← Données des projets
└── public/
    └── images/         ← Visuels des projets
```

## Expérience d'arrivée (3 étapes)

### 1. Splash — Diaporama

- Plein écran, les images des projets défilent automatiquement
- Transitions fluides (fondu, slide ou scale)
- Pas de navigation visible, juste les visuels
- CTA centré discret : "Entrer" ou flèche, Aileron Light, `#ffffff`

### 2. Hero — Plein écran

- Déclenché au clic sur le CTA du splash
- Le diaporama se dissout via une timeline GSAP
- Affiche : nom en grand (Aileron Bold, taille massive) + sous-titre ("Designer & Développeur créatif")
- Fond `#ffffff`, accents `#ffc9b9` et `#4c956c`
- Scroll indicator animé

### 3. Transition vers le site

- Au scroll, le hero glisse vers le haut
- Les onglets et le contenu apparaissent

## Navigation — Onglets verticaux (gauche)

- Barre fixée sur le bord gauche, toujours visible
- 4 labels en Aileron Bold, texte tourné à 90° : **HOME · WORK · ABOUT · CONTACT**
- Onglet actif : fond `#ffc9b9` ou `#4c956c`, texte `#ffffff`
- Onglets inactifs : texte `#2c6e49`, fond transparent
- Hover : changement de couleur subtil
- Le contenu occupe tout l'espace restant à droite
- Transition GSAP entre sections au clic

### Mobile

- La barre latérale se transforme en bottom tabs ou menu hamburger
- Swipe natif entre sections

## HOME

- Phrase d'accroche courte et punchy
- 2-3 projets vedettes en aperçu (disposition organique)
- Liens rapides vers réseaux / GitHub / Dribbble
- Fond `#ffffff`, touches décoratives en `#ffc9b9`

## WORK — Layout désordre

### Listing

- Images/thumbnails à positions, tailles et rotations variées
- Pas de grille — disposition organique, chevauchements légers
- Chaque projet : image principale + titre (Aileron Bold) + tag (Client/Perso, catégorie)

### Interactions

- Hover : image se soulève (scale + ombre), les autres reculent en opacité
- Parallaxe légère au scroll

### Projet individuel — Galerie horizontale

- Au clic, le layout désordre s'efface
- Galerie plein écran en scroll horizontal
- Visuels grand format + blocs de texte intercalés (contexte, rôle, outils)
- Bouton retour → animation inversée vers le layout désordre
- Couleurs `#ffc9b9` et `#4c956c` rythment les séparations entre slides

## ABOUT

- Mise en page asymétrique / éditorial
- Photo de profil en grand, décalée (pas centrée)
- Texte de présentation en face, Aileron Regular
- Compétences en mots-clés organiques (tailles variables, rappel du layout désordre)
- Parcours en timeline horizontale ou blocs décalés révélés au scroll
- Fond `#ffffff`, formes décoratives en `#ffc9b9`, titres en `#2c6e49`

## CONTACT

- Minimaliste et direct
- Email en grand (Aileron Bold, taille statement), cliquable
- Liens sociaux en icônes, hover animé en `#4c956c`
- Formulaire simple optionnel : nom, email, message
- Champs stylisés, bordures `#4c956c`, focus `#ffc9b9`
- Accroche : "Un projet en tête ? Parlons-en."

## Références (veille Notion)

- Oliver Millar — désordre
- Paul Calver — diaporama, désordre
- Michaël Bernard — aperçu au survol
- Jon Howell — icône/avatar, hero
- Roman Jean-Elie — hero plein écran
- Paolo Vendramini — hero
