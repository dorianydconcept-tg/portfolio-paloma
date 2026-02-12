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
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/bc4997235919957.68e124bca4046.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/fbec11235919957.68e124bca565d.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/c8442d235919957.68e124bca4549.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b81e42235919957.68e124bca8dba.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ab1fcb235919957.68e124bcaa23f.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/d66f1c235919957.68e124bca7908.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/cfcb07235919957.68e124bca8139.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/1ff833235919957.68e124bca6422.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/8a0eec235919957.68e124bca7150.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/d9c48a235919957.68e124bca8653.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/bcd5fe235919957.68e124bca965a.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/c4ad31235919957.68e124bca9b13.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/3e196d235919957.68e124bca920f.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/667f41235919957.68e124bca4ec4.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/229d5c235919957.68e124bca6944.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/12279a235919957.68e124bca5e3c.png"
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
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/bde44d235199111.68ea94a22eb59.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/4cd0d7235199111.68ea94a22f654.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/08302d235199111.68ea94a22e362.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/de0d7d235199111.68ea94a22dd1b.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/3a62a2235199111.68ea94a22cc68.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/393e10235199111.68ea94a22d66a.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/382eef235199111.68ea94a22f0b6.jpg"
    ],
    description: "Reproduction en 3D d'un appartement existant realisee lors d'un stage, mettant l'accent sur la fidelite des volumes, des materiaux et de l'eclairage.",
    role: "Design & Modélisation 3D",
    tools: ["Autodesk Revit"],
    year: 2025,
    behanceUrl: "https://www.behance.net/gallery/235199111/Modlisation-appartement"
  },
  {
    id: "235193827",
    title: "Emojis interactifs",
    tag: "Perso",
    category: "3D",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/projects/404/079d69235193827.Y3JvcCw3NzksNjA5LDM3OCw3MQ.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/cc6c30235193827.68d27aef6fa32.gif",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b1207e235193827.68d28e3447d9e.jpg"
    ],
    description: "Projet academique visant a experimenter la modelisation 3D de formes et de textures a travers une serie d'emojis interactifs.",
    role: "Design & Modélisation 3D",
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
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/c9d4a9235193303.68d2794b0ad1f.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/b0326c235193303.68d2794b0b24b.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/47fb77235193303.68d2794b0a46d.png"
    ],
    description: "Projet d'application mobile concu pour rendre l'appel des eleves en classe plus ludique et interactif.",
    role: "UI/UX Design",
    tools: ["Illustrator", "Figma", "Istockphoto.com"],
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
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/6cf427235187355.68d2659b3766d.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/25a4f6235187355.68d2659b361b0.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/818c95235187355.68d2659b3531a.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/1170ae235187355.68d2659b36b0d.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/38a248235187355.68d2659b35a07.png"
    ],
    description: "Application mobile concue pour faciliter la decouverte et l'achat d'oeuvres d'art en ligne.",
    role: "UI/UX Design",
    tools: ["Figma", "Istockphoto.com"],
    year: 2025,
    behanceUrl: "https://www.behance.net/gallery/235187355/Galeries-dart-mobile"
  },
  {
    id: "235150473",
    title: "Retouche 3D",
    tag: "Perso",
    category: "Architecture",
    thumbnail: "https://mir-s3-cdn-cf.behance.net/projects/404/75f31a235150473.Y3JvcCwxMDA3LDc4OCwwLDA.png",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/6c2b20235150473.68ea8ac050ac5.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/e257bc235150473.68ea8ac050409.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f1e87d235150473.68ea8ac052403.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/d622de235150473.68ea8ac052b35.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/3deae7235150473.68ea8ac051b2b.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/c787aa235150473.68ea8ac0511ea.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/865a12235150473.68ea8ac04ff0a.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/796e08235150473.68ea8ac04f6ac.png",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/23443a235150473.68ea8ac051fc4.png"
    ],
    description: "Retouche et declinaison visuelle d'une perspective architecturale realisee lors d'un stage avec Photoshop.",
    role: "Retouche & Design",
    tools: ["Photoshop"],
    year: 2025,
    behanceUrl: "https://www.behance.net/gallery/235150473/Retouche-3D"
  }
];

export const featuredProjectIds = ["242034207", "236382209"];
