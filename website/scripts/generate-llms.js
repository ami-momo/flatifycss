// Builds static/llms.txt from the docs, so it always matches the pages.
// Runs before every build (see "prebuild" in package.json).
const fs = require("fs");
const path = require("path");

const SITE = "https://flatifycss.amimomo.me";
const DOCS = path.join(__dirname, "..", "docs");

function readCategory(dir) {
  try {
    return JSON.parse(fs.readFileSync(path.join(dir, "_category_.json"), "utf8"));
  } catch {
    return {};
  }
}

function parse(file) {
  const raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const fm = /^---\n([\s\S]*?)\n---\n/.exec(raw);
  const meta = {};
  if (fm) for (const line of fm[1].split("\n")) {
    const m = /^(\w+):\s*(.*)$/.exec(line);
    if (m) meta[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  const body = fm ? raw.slice(fm[0].length) : raw;
  let desc = "";
  let inFence = false;
  for (const line of body.split("\n")) {
    const t = line.trim();
    if (t.startsWith("```")) inFence = !inFence;
    if (inFence || !t) continue;
    if (/^(import |export |<|:::|\||#|-|\*|\{)/.test(t)) continue;
    desc = t;
    break;
  }
  desc = desc
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<\/(a|p|strong|em|mark|span|b|i)>|<(a|p|strong|em|mark|span|b|i)\s[^>]*>/g, "")
    .replace(/[`*]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (desc.length > 150) desc = desc.slice(0, 147).replace(/\s+\S*$/, "") + "...";
  return { title: meta.title, position: Number(meta.sidebar_position ?? 999), desc };
}

function walk(dir, rel = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const pages = [];
  const groups = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      groups.push({ name: e.name, dir: full, rel: rel + e.name + "/", ...readCategory(full) });
    } else if (/\.mdx?$/.test(e.name)) {
      const id = rel + e.name.replace(/\.mdx?$/, "");
      pages.push({ id, ...parse(full) });
    }
  }
  pages.sort((a, b) => a.position - b.position || a.title.localeCompare(b.title));
  groups.sort((a, b) => (a.position ?? 999) - (b.position ?? 999));
  return { pages, groups };
}

const line = (p) => `- [${p.title}](${SITE}/docs/${p.id})${p.desc ? ": " + p.desc : ""}`;

const root = walk(DOCS);
const out = [];
out.push("# FlatifyCSS");
out.push("");
out.push(
  "> A modern flat design CSS framework for the web, inspired by the Duolingo design system. Plain CSS with a small optional JavaScript file, customizable with CSS variables and Sass, with right to left support and accessibility in mind. MIT licensed, made by Amir M. Mohamadi."
);
out.push("");
out.push("Install with `npm install flatifycss` or load it from a CDN: `https://cdn.jsdelivr.net/npm/flatifycss@2/dist/css/flatify-min.css`. The JavaScript (`flatify-min.js`) is only needed for accordions, alerts, dropdowns, modals, tabs, the show password button and text truncation, and dropdowns need Popper (`@popperjs/core@2`). The same stylesheet works for left to right and right to left pages, set `dir=\"rtl\"` on `<html>`.");
out.push("");

out.push("## Start here");
out.push("");
for (const p of root.pages) out.push(line(p));
out.push("");

for (const g of root.groups) {
  out.push(`## ${g.label || g.name}`);
  out.push("");
  const sub = walk(g.dir, g.rel);
  for (const p of sub.pages) out.push(line(p));
  for (const sg of sub.groups) {
    const nested = walk(sg.dir, sg.rel);
    for (const p of nested.pages) out.push(line({ ...p, title: `${sg.label || sg.name}: ${p.title}` }));
  }
  out.push("");
}

out.push("## Related");
out.push("");
out.push(`- [React FlatifyCSS](https://react-flatifycss.amimomo.me): React components for FlatifyCSS, written in TypeScript. Its docs are at https://react-flatifycss.amimomo.me/playground/ and its llms.txt is at https://react-flatifycss.amimomo.me/llms.txt`);
out.push(`- [Source code](https://github.com/ami-momo/flatifycss): GitHub repository, MIT license`);
out.push(`- [npm package](https://www.npmjs.com/package/flatifycss)`);
out.push(`- [AGENTS.md](https://raw.githubusercontent.com/ami-momo/flatifycss/master/AGENTS.md): Commands, layout and conventions for coding agents working on the repository`);
out.push(`- [News](${SITE}/blog): Release notes and announcements`);
out.push("");

fs.writeFileSync(path.join(__dirname, "..", "static", "llms.txt"), out.join("\n"));
console.log("llms.txt written");
