# Système d'Administration du Portfolio — Plan d'Implémentation

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Créer un panneau d'administration protégé permettant de gérer les projets (CRUD) et d'éditer tous les contenus du site (Hero, About, Contact) sans toucher au code.

**Architecture:** L'admin utilise Supabase comme backend (PostgreSQL + Storage + Auth). Les données du site passent de fichiers hardcodés à des appels API Next.js qui interrogent Supabase. Le panneau admin est une route protégée `/admin` avec authentification par mot de passe unique (un seul administrateur). Le site public reste en SSR/ISR pour la performance.

**Tech Stack:** Next.js 16 (App Router, API Routes), Supabase (PostgreSQL, Storage, Auth), React 19, CSS Modules, GSAP (existant)

---

## Architecture Globale

```
┌──────────────────────────────────────────────────────┐
│                     FRONTEND                         │
│                                                      │
│  /                    → Site public (SSR/ISR)        │
│  /admin               → Login admin                  │
│  /admin/projects      → CRUD projets                 │
│  /admin/content       → Édition Hero/About/Contact   │
│                                                      │
├──────────────────────────────────────────────────────┤
│                   API ROUTES (Next.js)               │
│                                                      │
│  /api/auth/login      → POST login admin             │
│  /api/auth/logout     → POST logout                  │
│  /api/projects        → GET (public) / POST (admin)  │
│  /api/projects/[id]   → GET / PUT / DELETE (admin)   │
│  /api/projects/reorder→ PUT (admin)                  │
│  /api/content         → GET (public) / PUT (admin)   │
│  /api/upload          → POST image upload (admin)    │
│                                                      │
├──────────────────────────────────────────────────────┤
│                   SUPABASE                           │
│                                                      │
│  Tables : projects, site_content, admin_users        │
│  Storage : project-images bucket                     │
│  Auth : session-based via cookies                    │
└──────────────────────────────────────────────────────┘
```

## Modèle de Données Supabase

### Table `projects`
| Colonne       | Type          | Notes                              |
|---------------|---------------|------------------------------------|
| id            | text (PK)     | ID Behance ou UUID                 |
| title         | text          | Titre du projet                    |
| tag           | text          | "Client" ou "Perso"               |
| category      | text          | Ex: "Architecture", "3D", "Design" |
| thumbnail     | text          | URL image miniature                |
| images        | text[]        | Array d'URLs images                |
| description   | text          | Description du projet              |
| role          | text          | Rôle sur le projet                 |
| tools         | text[]        | Array d'outils utilisés            |
| year          | int           | Année du projet                    |
| behance_url   | text          | Lien Behance                       |
| is_featured   | boolean       | Projet mis en avant sur HOME       |
| sort_order    | int           | Ordre d'affichage                  |
| created_at    | timestamptz   | Auto                               |
| updated_at    | timestamptz   | Auto                               |

### Table `site_content`
| Colonne       | Type          | Notes                              |
|---------------|---------------|------------------------------------|
| key           | text (PK)     | Ex: "hero_name", "about_bio"       |
| value         | text          | Contenu texte                      |
| updated_at    | timestamptz   | Auto                               |

**Clés prévues :**
- `hero_name` → "Paloma DELACROIX"
- `hero_subtitle` → "Designer d'espaces"
- `about_bio` → Texte de la bio
- `about_skills` → JSON array des skills avec tailles
- `about_video_url` → URL vidéo avatar
- `contact_headline` → "Un projet en tête ?..."
- `contact_email` → Email affiché
- `social_behance` → URL Behance
- `social_linkedin` → URL LinkedIn

---

## Task 1 : Setup Supabase — Créer le projet et les tables

**Files:**
- Create: `lib/supabase.ts`
- Create: `supabase/migrations/001_initial_schema.sql`

**Step 1: Installer le client Supabase**

```bash
npm install @supabase/supabase-js
```

**Step 2: Créer le fichier de configuration Supabase**

Créer `lib/supabase.ts` :
```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client public (côté client, lecture seule via RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client admin (côté serveur uniquement, bypass RLS)
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceKey);
}
```

**Step 3: Créer le fichier .env.local**

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
ADMIN_PASSWORD=xxx
```

**Step 4: Ajouter `.env.local` au `.gitignore`** (vérifier qu'il y est déjà)

**Step 5: Exécuter les migrations SQL dans Supabase**

```sql
-- Table projects
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  tag TEXT NOT NULL CHECK (tag IN ('Client', 'Perso')),
  category TEXT NOT NULL,
  thumbnail TEXT NOT NULL DEFAULT '',
  images TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  tools TEXT[] NOT NULL DEFAULT '{}',
  year INT NOT NULL DEFAULT 2025,
  behance_url TEXT NOT NULL DEFAULT '',
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table site_content
CREATE TABLE site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS : lecture publique, écriture restreinte
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read content" ON site_content
  FOR SELECT USING (true);

-- Les écritures se font via le service role key (bypass RLS)
```

**Step 6: Seed des données existantes**

Migrer les 9 projets de `data/projects.ts` et les contenus du site vers Supabase via un script :

Créer `scripts/seed-supabase.ts` :
```typescript
// Script à exécuter une fois pour migrer les données existantes
// npx tsx scripts/seed-supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Importer les données actuelles
import { projects, featuredProjectIds } from "../data/projects";

async function seed() {
  // Seed projects
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    await supabase.from("projects").upsert({
      id: p.id,
      title: p.title,
      tag: p.tag,
      category: p.category,
      thumbnail: p.thumbnail,
      images: p.images,
      description: p.description,
      role: p.role,
      tools: p.tools,
      year: p.year,
      behance_url: p.behanceUrl,
      is_featured: featuredProjectIds.includes(p.id),
      sort_order: i,
    });
  }

  // Seed site content
  const content = [
    { key: "hero_name", value: "Paloma DELACROIX" },
    { key: "hero_subtitle", value: "Designer d'espaces" },
    { key: "about_bio", value: "Designer et développeuse créative basée à Toulouse, je crée des expériences digitales qui allient esthétique et technique. Mon approche hybride me permet de maîtriser un projet de la conception à la mise en ligne." },
    { key: "about_skills", value: JSON.stringify([
      { name: "Architecture d'intérieur", size: "large" },
      { name: "Modélisation 3D", size: "large" },
      { name: "UI/UX Design", size: "large" },
      { name: "Figma", size: "medium" },
      { name: "Photoshop", size: "medium" },
      { name: "Concept Board", size: "medium" },
      { name: "Direction artistique", size: "medium" },
      { name: "Canva", size: "small" },
      { name: "Illustrator", size: "small" },
    ]) },
    { key: "about_video_url", value: "/videos/avatar-3d.mp4" },
    { key: "contact_headline", value: "Un projet en tête ?<br />Parlons-en." },
    { key: "contact_email", value: "paloma.delacroix@email.com" },
    { key: "social_behance", value: "https://www.behance.net/palomanuel" },
    { key: "social_linkedin", value: "https://linkedin.com/" },
  ];

  for (const c of content) {
    await supabase.from("site_content").upsert(c);
  }

  console.log("Seed terminé !");
}

seed();
```

**Step 7: Commit**
```bash
git add lib/supabase.ts scripts/seed-supabase.ts supabase/
git commit -m "feat: setup Supabase — config client, migrations, seed"
```

---

## Task 2 : API d'authentification admin

**Files:**
- Create: `app/api/auth/login/route.ts`
- Create: `app/api/auth/logout/route.ts`
- Create: `lib/auth.ts`

**Approche :** Authentification simplifiée par mot de passe unique. Le mot de passe est stocké dans `ADMIN_PASSWORD` (env var). Un cookie HTTP-only sécurisé est créé à la connexion.

**Step 1: Créer le helper d'auth**

Créer `lib/auth.ts` :
```typescript
import { cookies } from "next/headers";
import { createHmac } from "crypto";

const SECRET = process.env.ADMIN_PASSWORD!;
const COOKIE_NAME = "admin_session";
const SESSION_DURATION = 60 * 60 * 24; // 24h en secondes

function generateToken(): string {
  const timestamp = Date.now().toString();
  const hmac = createHmac("sha256", SECRET).update(timestamp).digest("hex");
  return `${timestamp}.${hmac}`;
}

function verifyToken(token: string): boolean {
  const [timestamp, hmac] = token.split(".");
  if (!timestamp || !hmac) return false;

  const age = Date.now() - parseInt(timestamp);
  if (age > SESSION_DURATION * 1000) return false;

  const expected = createHmac("sha256", SECRET).update(timestamp).digest("hex");
  return hmac === expected;
}

export async function setAdminSession(): Promise<void> {
  const token = generateToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/",
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}
```

**Step 2: Créer la route login**

Créer `app/api/auth/login/route.ts` :
```typescript
import { NextRequest, NextResponse } from "next/server";
import { setAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
```

**Step 3: Créer la route logout**

Créer `app/api/auth/logout/route.ts` :
```typescript
import { NextResponse } from "next/server";
import { clearAdminSession } from "@/lib/auth";

export async function POST() {
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
```

**Step 4: Commit**
```bash
git add lib/auth.ts app/api/auth/
git commit -m "feat: API auth admin — login/logout par cookie sécurisé"
```

---

## Task 3 : API CRUD Projets

**Files:**
- Create: `app/api/projects/route.ts`
- Create: `app/api/projects/[id]/route.ts`
- Create: `app/api/projects/reorder/route.ts`
- Create: `app/api/upload/route.ts`

**Step 1: Créer la route liste/création projets**

Créer `app/api/projects/route.ts` :
```typescript
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, supabase } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";

// GET /api/projects — public, retourne tous les projets triés
export async function GET() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST /api/projects — admin, créer un projet
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await req.json();
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("projects")
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
```

**Step 2: Créer la route projet individuel**

Créer `app/api/projects/[id]/route.ts` :
```typescript
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, supabase } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";

// GET /api/projects/[id] — public
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

// PUT /api/projects/[id] — admin
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("projects")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE /api/projects/[id] — admin
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const admin = createAdminClient();

  const { error } = await admin.from("projects").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
```

**Step 3: Créer la route de réordonnement**

Créer `app/api/projects/reorder/route.ts` :
```typescript
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";

// PUT /api/projects/reorder — admin, réordonne les projets
export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { orderedIds } = await req.json(); // ["id1", "id2", ...]
  const admin = createAdminClient();

  for (let i = 0; i < orderedIds.length; i++) {
    await admin
      .from("projects")
      .update({ sort_order: i })
      .eq("id", orderedIds[i]);
  }

  return NextResponse.json({ ok: true });
}
```

**Step 4: Créer la route upload images**

Créer `app/api/upload/route.ts` :
```typescript
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });
  }

  const admin = createAdminClient();
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await admin.storage
    .from("project-images")
    .upload(path, file, { contentType: file.type });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: urlData } = admin.storage
    .from("project-images")
    .getPublicUrl(path);

  return NextResponse.json({ url: urlData.publicUrl });
}
```

**Step 5: Commit**
```bash
git add app/api/projects/ app/api/upload/
git commit -m "feat: API CRUD projets + upload images"
```

---

## Task 4 : API Contenu du site

**Files:**
- Create: `app/api/content/route.ts`

**Step 1: Créer la route contenu**

Créer `app/api/content/route.ts` :
```typescript
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, supabase } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth";

// GET /api/content — public, retourne tous les contenus
export async function GET() {
  const { data, error } = await supabase
    .from("site_content")
    .select("key, value");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Transformer en objet { key: value }
  const content: Record<string, string> = {};
  for (const row of data) {
    content[row.key] = row.value;
  }
  return NextResponse.json(content);
}

// PUT /api/content — admin, met à jour plusieurs clés
export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const updates: Record<string, string> = await req.json();
  const admin = createAdminClient();

  for (const [key, value] of Object.entries(updates)) {
    await admin
      .from("site_content")
      .upsert({ key, value });
  }

  return NextResponse.json({ ok: true });
}
```

**Step 2: Commit**
```bash
git add app/api/content/
git commit -m "feat: API contenu du site — GET/PUT"
```

---

## Task 5 : Hook de données — Remplacer le hardcodé par Supabase

**Files:**
- Create: `lib/hooks/useProjects.ts`
- Create: `lib/hooks/useSiteContent.ts`
- Modify: `app/page.tsx`
- Modify: `components/Home/Home.tsx`
- Modify: `components/Work/Work.tsx`
- Modify: `components/About/About.tsx`
- Modify: `components/Contact/Contact.tsx`
- Modify: `components/Hero/Hero.tsx`
- Modify: `components/Splash/Splash.tsx`

**Step 1: Créer le hook useProjects**

Créer `lib/hooks/useProjects.ts` :
```typescript
"use client";

import { useState, useEffect } from "react";

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
  behance_url: string;
  is_featured: boolean;
  sort_order: number;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const featured = projects.filter((p) => p.is_featured);
  const allImages = projects.flatMap((p) => p.images).filter(Boolean);

  return { projects, featured, allImages, loading };
}
```

**Step 2: Créer le hook useSiteContent**

Créer `lib/hooks/useSiteContent.ts` :
```typescript
"use client";

import { useState, useEffect } from "react";

export interface SiteContent {
  hero_name: string;
  hero_subtitle: string;
  about_bio: string;
  about_skills: string; // JSON string
  about_video_url: string;
  contact_headline: string;
  contact_email: string;
  social_behance: string;
  social_linkedin: string;
}

const defaults: SiteContent = {
  hero_name: "Paloma DELACROIX",
  hero_subtitle: "Designer d'espaces",
  about_bio: "",
  about_skills: "[]",
  about_video_url: "/videos/avatar-3d.mp4",
  contact_headline: "Un projet en tête ?<br />Parlons-en.",
  contact_email: "paloma.delacroix@email.com",
  social_behance: "https://www.behance.net/palomanuel",
  social_linkedin: "https://linkedin.com/",
};

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        setContent({ ...defaults, ...data });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { content, loading };
}
```

**Step 3: Refactorer les composants**

Modifier `app/page.tsx` pour utiliser les hooks au lieu de `data/projects.ts`. Les composants enfants reçoivent les données en props. Le `page.tsx` devient le "data provider" centralisé.

**Step 4: Mettre à jour chaque composant**

- `Hero.tsx` : props `name` et `subtitle` au lieu du texte hardcodé
- `About.tsx` : props `bio`, `skills`, `videoUrl` au lieu du hardcodé
- `Contact.tsx` : props `headline`, `email`, `socialBehance`, `socialLinkedin`
- `Home.tsx` : props `featured` (projets en avant), `socialBehance`, `socialLinkedin`
- `Work.tsx` : props `projects` (déjà en props)
- `Splash.tsx` : props `images` (déjà en props)

**Step 5: Commit**
```bash
git add lib/hooks/ app/page.tsx components/
git commit -m "feat: remplacer données hardcodées par hooks Supabase"
```

---

## Task 6 : Page Admin — Login

**Files:**
- Create: `app/admin/page.tsx`
- Create: `app/admin/layout.tsx`
- Create: `app/admin/admin.module.css`

**Step 1: Créer le layout admin**

Créer `app/admin/layout.tsx` :
```typescript
export const metadata = { title: "Admin — Portfolio" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

**Step 2: Créer la page login**

Créer `app/admin/page.tsx` :
```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/projects");
    } else {
      setError("Mot de passe incorrect");
    }
    setLoading(false);
  };

  return (
    <div className={styles.loginPage}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h1 className={styles.loginTitle}>Administration</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className={styles.loginInput}
          autoFocus
        />
        {error && <p className={styles.loginError}>{error}</p>}
        <button type="submit" disabled={loading} className={styles.loginButton}>
          {loading ? "..." : "Connexion"}
        </button>
      </form>
    </div>
  );
}
```

**Step 3: Créer les styles admin**

Créer `app/admin/admin.module.css` avec des styles simples et fonctionnels (fond gris clair, formulaires propres, palette verte du site).

**Step 4: Commit**
```bash
git add app/admin/
git commit -m "feat: page login admin"
```

---

## Task 7 : Page Admin — Gestion des projets

**Files:**
- Create: `app/admin/projects/page.tsx`
- Create: `app/admin/projects/[id]/page.tsx`
- Create: `app/admin/projects/new/page.tsx`
- Create: `components/admin/ProjectForm.tsx`
- Create: `components/admin/ProjectForm.module.css`
- Create: `components/admin/ImageUploader.tsx`
- Create: `components/admin/AdminNav.tsx`

**Step 1: Créer la navigation admin**

Créer `components/admin/AdminNav.tsx` :
```typescript
"use client";

import { usePathname, useRouter } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  };

  const links = [
    { href: "/admin/projects", label: "Projets" },
    { href: "/admin/content", label: "Contenu" },
  ];

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "1rem 2rem",
      borderBottom: "1px solid #e5e7eb",
      background: "#fff",
    }}>
      <strong style={{ color: "#2c6e49" }}>Admin</strong>
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          style={{
            color: pathname.startsWith(l.href) ? "#2c6e49" : "#666",
            fontWeight: pathname.startsWith(l.href) ? 600 : 400,
            textDecoration: "none",
          }}
        >
          {l.label}
        </a>
      ))}
      <button onClick={handleLogout} style={{ marginLeft: "auto", color: "#999", background: "none", border: "none", cursor: "pointer" }}>
        Déconnexion
      </button>
    </nav>
  );
}
```

**Step 2: Créer le composant ImageUploader**

Créer `components/admin/ImageUploader.tsx` :
```typescript
"use client";

import { useState } from "react";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);

    const newImages = [...images];
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const { url } = await res.json();
        newImages.push(url);
      }
    }

    onChange(newImages);
    setUploading(false);
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, direction: -1 | 1) => {
    const newImages = [...images];
    const target = index + direction;
    if (target < 0 || target >= newImages.length) return;
    [newImages[index], newImages[target]] = [newImages[target], newImages[index]];
    onChange(newImages);
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
        {images.map((img, i) => (
          <div key={i} style={{ position: "relative", width: 120, height: 80 }}>
            <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }} />
            <div style={{ position: "absolute", top: 2, right: 2, display: "flex", gap: 2 }}>
              <button onClick={() => handleMove(i, -1)} style={{ fontSize: 10, padding: "0 4px" }}>←</button>
              <button onClick={() => handleMove(i, 1)} style={{ fontSize: 10, padding: "0 4px" }}>→</button>
              <button onClick={() => handleRemove(i)} style={{ fontSize: 10, padding: "0 4px", color: "red" }}>×</button>
            </div>
          </div>
        ))}
      </div>

      <label style={{ cursor: "pointer", color: "#2c6e49", fontWeight: 600 }}>
        {uploading ? "Upload en cours..." : "+ Ajouter des images"}
        <input type="file" accept="image/*" multiple onChange={handleUpload} style={{ display: "none" }} />
      </label>

      <p style={{ fontSize: "0.75rem", color: "#999", marginTop: "0.5rem" }}>
        Ou coller une URL directement dans le champ images ci-dessous.
      </p>
    </div>
  );
}
```

**Step 3: Créer le formulaire projet**

Créer `components/admin/ProjectForm.tsx` — formulaire complet avec tous les champs du projet (title, tag select, category, thumbnail, images via ImageUploader, description textarea, role, tools, year, behance_url, is_featured checkbox).

**Step 4: Créer la liste projets**

Créer `app/admin/projects/page.tsx` — tableau des projets avec : titre, catégorie, tag, année, actions (éditer, supprimer), bouton "Nouveau projet", drag-and-drop pour réordonnement (ou boutons ↑↓ pour simplifier).

**Step 5: Créer la page nouveau projet**

Créer `app/admin/projects/new/page.tsx` — utilise `ProjectForm` en mode création, POST vers `/api/projects`.

**Step 6: Créer la page édition projet**

Créer `app/admin/projects/[id]/page.tsx` — charge le projet via GET, utilise `ProjectForm` en mode édition, PUT vers `/api/projects/[id]`.

**Step 7: Commit**
```bash
git add app/admin/projects/ components/admin/
git commit -m "feat: admin — CRUD projets avec upload images"
```

---

## Task 8 : Page Admin — Édition du contenu du site

**Files:**
- Create: `app/admin/content/page.tsx`

**Step 1: Créer la page édition contenu**

Créer `app/admin/content/page.tsx` :
```typescript
"use client";

import { useState, useEffect } from "react";
import AdminNav from "@/components/admin/AdminNav";

export default function ContentEditor() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content").then((r) => r.json()).then(setContent);
  }, []);

  const update = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setSaved(true);
  };

  return (
    <>
      <AdminNav />
      <div style={{ maxWidth: 800, margin: "2rem auto", padding: "0 1rem" }}>
        <h1>Contenu du site</h1>

        <section>
          <h2>Hero</h2>
          <label>Nom affiché</label>
          <input value={content.hero_name || ""} onChange={(e) => update("hero_name", e.target.value)} />
          <label>Sous-titre</label>
          <input value={content.hero_subtitle || ""} onChange={(e) => update("hero_subtitle", e.target.value)} />
        </section>

        <section>
          <h2>À propos</h2>
          <label>Bio</label>
          <textarea rows={4} value={content.about_bio || ""} onChange={(e) => update("about_bio", e.target.value)} />
          <label>URL vidéo avatar</label>
          <input value={content.about_video_url || ""} onChange={(e) => update("about_video_url", e.target.value)} />
          <label>Skills (JSON)</label>
          <textarea rows={6} value={content.about_skills || "[]"} onChange={(e) => update("about_skills", e.target.value)} />
        </section>

        <section>
          <h2>Contact</h2>
          <label>Titre</label>
          <input value={content.contact_headline || ""} onChange={(e) => update("contact_headline", e.target.value)} />
          <label>Email</label>
          <input value={content.contact_email || ""} onChange={(e) => update("contact_email", e.target.value)} />
        </section>

        <section>
          <h2>Réseaux sociaux</h2>
          <label>Behance URL</label>
          <input value={content.social_behance || ""} onChange={(e) => update("social_behance", e.target.value)} />
          <label>LinkedIn URL</label>
          <input value={content.social_linkedin || ""} onChange={(e) => update("social_linkedin", e.target.value)} />
        </section>

        <button onClick={handleSave} disabled={saving}>
          {saving ? "Enregistrement..." : saved ? "✓ Enregistré" : "Enregistrer"}
        </button>
      </div>
    </>
  );
}
```

**Step 2: Commit**
```bash
git add app/admin/content/
git commit -m "feat: admin — éditeur de contenu du site"
```

---

## Task 9 : Middleware de protection des routes admin

**Files:**
- Create: `middleware.ts` (à la racine)

**Step 1: Créer le middleware**

Créer `middleware.ts` à la racine du projet :
```typescript
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protéger toutes les routes admin sauf /admin (login)
  if (pathname.startsWith("/admin/") && !pathname.startsWith("/admin/page")) {
    const session = req.cookies.get("admin_session")?.value;
    if (!session) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path+"],
};
```

**Step 2: Commit**
```bash
git add middleware.ts
git commit -m "feat: middleware protection routes admin"
```

---

## Task 10 : Configuration Supabase Storage + Variables d'env Vercel

**Step 1: Créer le bucket `project-images` dans Supabase**

Via le dashboard Supabase ou via l'API MCP :
- Bucket name: `project-images`
- Public: true (les images doivent être accessibles publiquement)

**Step 2: Configurer les variables d'environnement sur Vercel**

Ajouter dans Vercel > Settings > Environment Variables :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`

**Step 3: Commit et déployer**
```bash
git push origin main
```

---

## Task 11 : Tests et vérification finale

**Step 1: Tester le login admin**
- Aller sur `/admin`
- Entrer un mauvais mot de passe → erreur
- Entrer le bon mot de passe → redirection vers `/admin/projects`

**Step 2: Tester le CRUD projets**
- Créer un projet → apparaît dans la liste
- Éditer un projet → modifications sauvées
- Upload une image → URL retournée
- Supprimer un projet → disparaît

**Step 3: Tester l'édition de contenu**
- Modifier le nom Hero → vérifié sur le site public
- Modifier la bio → vérifié sur la page About

**Step 4: Tester la protection**
- Accéder à `/admin/projects` sans login → redirigé vers `/admin`
- Les API POST/PUT/DELETE sans cookie → 401

**Step 5: Commit final**
```bash
git add -A
git commit -m "feat: système admin complet — projets + contenu + auth"
```

---

## Résumé des Tasks

| # | Task | Fichiers principaux | Dépendances |
|---|------|---------------------|-------------|
| 1 | Setup Supabase | `lib/supabase.ts`, migrations, seed | — |
| 2 | API Auth | `lib/auth.ts`, routes login/logout | Task 1 |
| 3 | API CRUD Projets | routes projects/, upload | Task 1, 2 |
| 4 | API Contenu | route content/ | Task 1, 2 |
| 5 | Hooks + Refactor composants | hooks, tous les composants | Task 3, 4 |
| 6 | Page Login Admin | `app/admin/page.tsx` | Task 2 |
| 7 | Page Gestion Projets | admin/projects/, composants admin | Task 3, 6 |
| 8 | Page Édition Contenu | admin/content/ | Task 4, 6 |
| 9 | Middleware protection | `middleware.ts` | Task 2 |
| 10 | Config Supabase Storage + Vercel | Dashboard config | Task 1 |
| 11 | Tests et vérification | — | Toutes |
