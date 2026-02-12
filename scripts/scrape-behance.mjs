#!/usr/bin/env node

/**
 * Script de scraping Behance
 * Usage: node scripts/scrape-behance.mjs [username]
 *
 * Requires: npm install playwright
 *
 * Scrape tous les projets d'un profil Behance et sauvegarde
 * les données dans data/behance-scraped.json
 */

import { chromium } from "playwright";
import { writeFileSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../data/behance-scraped.json");

const username = process.argv[2] || "palomanuel";
const PROFILE_URL = `https://www.behance.net/${username}`;

async function scrapeProfile(page) {
  await page.goto(PROFILE_URL, { waitUntil: "networkidle" });

  const projects = await page.evaluate(() => {
    const articles = document.querySelectorAll("article");
    const results = [];
    articles.forEach((article) => {
      const allLinks = article.querySelectorAll('a[href*="/gallery/"]');
      let title = "";
      let url = "";
      allLinks.forEach((link) => {
        const text = link.textContent.trim();
        if (text && text.length > 0 && !text.includes("Lien vers")) {
          title = text;
        }
        if (!url && link.href.includes("/gallery/")) {
          url = link.href;
        }
      });
      const img = article.querySelector("img");
      const thumbnail = img ? img.src : "";
      const id = url.match(/gallery\/(\d+)\//)?.[1] || "";

      if (url && id) {
        results.push({ id, title, url, thumbnail });
      }
    });
    return results;
  });

  return projects;
}

async function scrapeProject(page, projectUrl) {
  await page.goto(projectUrl, { waitUntil: "networkidle" });

  const data = await page.evaluate(() => {
    // Images haute résolution
    const imgs = document.querySelectorAll('img[src*="project_modules"]');
    const uniqueImages = new Set();
    imgs.forEach((img) => {
      let src = img.src;
      src = src.replace(/project_modules\/[^/]+\//, "project_modules/1400/");
      src = src.replace(/_webp/, "");
      // Filtrer les thumbnails d'autres projets
      if (!src.includes("projects/404")) {
        uniqueImages.add(src);
      }
    });

    // Description
    const textModules = document.querySelectorAll(
      '[class*="ProjectModule"] [class*="text"]'
    );
    let description = "";
    textModules.forEach((el) => {
      const text = el.textContent.trim();
      if (text.length > description.length) description = text;
    });

    // Tags
    const tagLinks = document.querySelectorAll(
      'a[href*="tracking_source=project_tag"]'
    );
    const tags = [...tagLinks].map((a) => a.textContent.trim());

    // Disciplines
    const disciplineLinks = document.querySelectorAll(
      'a[href*="search/projects?field="]'
    );
    const disciplines = [...disciplineLinks].map((a) => a.textContent.trim());

    // Tools
    const toolLinks = document.querySelectorAll(
      'a[href*="search/projects?tools="]'
    );
    const tools = [...toolLinks]
      .map((a) => a.textContent.trim())
      .filter((t) => t.length > 0);

    // Date
    const timeEl = document.querySelector("time");
    const date = timeEl ? timeEl.textContent.trim() : "";

    return {
      images: [...uniqueImages],
      description,
      tags,
      disciplines,
      tools,
      date,
    };
  });

  return data;
}

async function main() {
  console.log(`Scraping profil Behance: ${PROFILE_URL}`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 1. Scraper le profil pour la liste des projets
  console.log("Recuperation de la liste des projets...");
  const projects = await scrapeProfile(page);
  console.log(`${projects.length} projets trouves.`);

  // 2. Scraper chaque projet pour les details
  const fullProjects = [];
  for (const project of projects) {
    console.log(`  Scraping: ${project.title}...`);
    try {
      const details = await scrapeProject(page, project.url);
      fullProjects.push({
        ...project,
        category: details.disciplines[0] || "Design",
        tags: details.tags,
        tools: details.tools,
        date: details.date,
        description: details.description,
        images: details.images,
      });
    } catch (err) {
      console.error(`  Erreur pour ${project.title}: ${err.message}`);
      fullProjects.push({
        ...project,
        category: "Design",
        tags: [],
        tools: [],
        date: "",
        description: "",
        images: [],
      });
    }
  }

  await browser.close();

  // 3. Sauvegarder
  const output = {
    profile: {
      name: "Paloma DELACROIX",
      url: PROFILE_URL,
      scrapedAt: new Date().toISOString(),
    },
    projects: fullProjects,
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  console.log(`\nDonnees sauvegardees dans ${OUTPUT_PATH}`);
  console.log(
    `${fullProjects.length} projets avec ${fullProjects.reduce((sum, p) => sum + p.images.length, 0)} images au total.`
  );
}

main().catch(console.error);
