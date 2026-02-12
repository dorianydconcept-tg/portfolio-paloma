export interface Project {
  id: string;
  title: string;
  tag: "Client" | "Perso";
  category: string;
  thumbnail: string;
  images: string[];
  description: string;
  role: string;
  tools: string[];
  year: number;
  behanceUrl: string;
}

export const projects: Project[] = [
  {
    id: "242034207",
    title: "Projet d'amenagement interieur - Maison a theme bleu",
    tag: "Client",
    category: "Architecture",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/projects/404/a604bf242034207.Y3JvcCwxMzA5LDEwMjQsMTEzLDA.png",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/fa42fb242034207.69650ba0cb0f3.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/a12f79242034207.69650ba0ccdf4.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2271f5242034207.69650ba0cc409.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b5b487242034207.69650ba0cb688.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/db4ff0242034207.69650ba0cdc83.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ed631b242034207.69650ba0cbdfa.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/00fab2242034207.69650ba0cd407.png"
    ],
    description: "Dans le cadre d'un projet client, j'ai realise la modelisation 3D et la proposition d'amenagement d'une maison basee sur l'existant, autour d'un theme bleu deja present.",
    role: "Design & Modélisation 3D",
    tools: [],
    year: 2026,
    behanceUrl: "https://www.behance.net/gallery/242034207/-Projet-damnagement-intrieur-Maison-a-theme-bleu"
  },
  {
    id: "236382209",
    title: "Concept board orange",
    tag: "Perso",
    category: "Architecture",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/projects/404/fb0bd4236382209.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/6d8a20236382209.68ea8df3d95c0.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/09e00d236382209.68ea8df3da474.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/11d8ba236382209.68ea8df3d7b5e.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/31dc2b236382209.68ea8df3d8121.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/5080b8236382209.68ea8df3d8644.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/a90fc3236382209.68ea8df3d8e3b.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/1d484b236382209.68ea8df3d9d5c.png"
    ],
    description: "",
    role: "Design & Modélisation 3D",
    tools: ["Canva", "Istockphoto.com"],
    year: 2025,
    behanceUrl: "https://www.behance.net/gallery/236382209/Concept-board-orange"
  },
  {
    id: "236382093",
    title: "Concept Board SIAAP",
    tag: "Client",
    category: "Architecture",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/projects/404/ab473d236382093.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/bcc2ac236382093.68ea8d44968ff.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/dd8b37236382093.68ea8d4497bae.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/3ead78236382093.68ea8d449af69.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/0066ba236382093.68ea8d449a255.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/7f1978236382093.68ea8d4499d1a.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/156c22236382093.68ea8d4498188.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/9d704e236382093.68ea8d449750a.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/2a4aeb236382093.68ea8d449c609.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/55e0da236382093.68ea8d449ccd5.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ef3b68236382093.68ea8d4496fdc.png"
    ],
    description: "",
    role: "Design & Modélisation 3D",
    tools: ["Photoshop", "Canva", "Istockphoto.com"],
    year: 2025,
    behanceUrl: "https://www.behance.net/gallery/236382093/Concept-Board-SIAAP"
  },
  {
    id: "235919957",
    title: "Concept board appartement toulousain",
    tag: "Client",
    category: "Architecture",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/projects/404/f8e04b235919957.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
    images: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/f8e04b235919957.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png"
    ],
    description: "",
    role: "Design & Modélisation 3D",
    tools: [],
    year: 2025,
    behanceUrl: "https://www.behance.net/gallery/235919957/Concept-board-appartement-toulousain"
  },
  {
    id: "235199111",
    title: "Modelisation appartement",
    tag: "Client",
    category: "Architecture",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/projects/404/af84dd235199111.Y3JvcCwxMTkyLDkzMyw3MCww.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/af84dd235199111.Y3JvcCwxMTkyLDkzMyw3MCww.jpg"
    ],
    description: "",
    role: "Design & Modélisation 3D",
    tools: [],
    year: 2025,
    behanceUrl: "https://www.behance.net/gallery/235199111/Modlisation-appartement"
  },
  {
    id: "235193827",
    title: "Emojis interactifs",
    tag: "Perso",
    category: "Design",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/projects/404/079d69235193827.Y3JvcCw3NzksNjA5LDM3OCw3MQ.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/079d69235193827.Y3JvcCw3NzksNjA5LDM3OCw3MQ.jpg"
    ],
    description: "",
    role: "Design",
    tools: [],
    year: 2025,
    behanceUrl: "https://www.behance.net/gallery/235193827/Emojis-interactifs"
  },
  {
    id: "235193303",
    title: "Appel game",
    tag: "Perso",
    category: "Design",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/projects/404/bced7a235193303.Y3JvcCwxNzA0LDEzMzMsMTQ3LDA.png",
    images: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/bced7a235193303.Y3JvcCwxNzA0LDEzMzMsMTQ3LDA.png"
    ],
    description: "",
    role: "Design",
    tools: [],
    year: 2025,
    behanceUrl: "https://www.behance.net/gallery/235193303/Appel-game"
  },
  {
    id: "235187355",
    title: "Galeries d'art mobile",
    tag: "Perso",
    category: "Design",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/projects/404/ede896235187355.Y3JvcCw0MjYxLDMzMzMsMzY5LDA.png",
    images: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/ede896235187355.Y3JvcCw0MjYxLDMzMzMsMzY5LDA.png"
    ],
    description: "",
    role: "Design",
    tools: [],
    year: 2025,
    behanceUrl: "https://www.behance.net/gallery/235187355/Galeries-dart-mobile"
  },
  {
    id: "235150473",
    title: "Retouche 3D",
    tag: "Perso",
    category: "3D",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/projects/404/75f31a235150473.Y3JvcCwxMDA3LDc4OCwwLDA.png",
    images: [
      "https://mir-s3-cdn-cf.behance.net/projects/404/75f31a235150473.Y3JvcCwxMDA3LDc4OCwwLDA.png"
    ],
    description: "",
    role: "Design",
    tools: [],
    year: 2025,
    behanceUrl: "https://www.behance.net/gallery/235150473/Retouche-3D"
  }
];

export const featuredProjectIds = ["242034207", "236382209"];
