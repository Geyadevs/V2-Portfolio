import { useState, useRef, useEffect } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────
const EXPERIENCES = [
  { role:"Senior Frontend Developer", company:"TechCorp Solutions", period:"2022 – Present",
    highlights:["Architected design system used across 12 product teams — cut UI dev time 40%","Led jQuery → React/TS migration, boosting performance scores by 65%","Mentored 5 junior devs; shipped 8 major features at 99.9% uptime"],
    tech:["React","TypeScript","GraphQL","Storybook"] },
  { role:"Frontend Developer", company:"Pixel & Code Agency", period:"2020 – 2021",
    highlights:["Built 20+ responsive client sites from wireframe to deployment","Lifted Lighthouse scores from avg 55 → 92 across all projects","Introduced CI/CD pipelines, reducing deploy time by 70%"],
    tech:["Vue.js","Nuxt","SCSS","Vercel"] },
  { role:"UI Developer Intern", company:"StartupLab Inc.", period:"2019 – 2020",
    highlights:["Built reusable React component library for main SaaS product","Redesigned onboarding flow — reduced drop-off by 28%","Achieved 80% test coverage with Jest + RTL"],
    tech:["React","CSS Modules","Jest","Figma"] },
];

const PROJECTS = [
  { title:"KJK Jewelry",  desc:"Enterprise design system platform used by 3 clients", tech:["React","Storybook"],    color:"#00C2FF", icon:"◈" },
  { title:"Kartify",   desc:"E-commerce storefront — 97/100 Lighthouse score",     tech:["Next.js","Stripe"],    color:"#7B61FF", icon:"◉" },
  { title:"DataPulse", desc:"Real-time analytics dashboard for fintech startup",   tech:["Vue.js","D3.js"],      color:"#00E5A0", icon:"◎" },
  { title:"FlowForge", desc:"Open-source drag-and-drop workflow builder",          tech:["React Flow","Node.js"],color:"#FF6B6B", icon:"◆" },
];

const SKILLS = ["JavaScript","TypeScript","React","Vue.js","Next.js","Tailwind CSS","Figma","Storybook","SCSS","Framer Motion","Jest","Cypress","Git","Vite","Vercel","WCAG / a11y"];

// ── Inline SVG tech icons ─────────────────────────────────────────────────────
const TECH_ICONS = {
  "JavaScript":<svg viewBox="0 0 32 32" width="13" height="13"><rect width="32" height="32" rx="4" fill="#F7DF1E"/><path d="M9.5 25.5l2.3-1.4c.4.8.8 1.4 1.7 1.4.9 0 1.4-.3 1.4-1.7V16h2.8v7.9c0 2.7-1.6 4-3.9 4-2.1 0-3.3-1.1-3.9-2.4zm8.2-.3l2.3-1.4c.6 1 1.4 1.8 2.8 1.8 1.2 0 1.9-.6 1.9-1.4 0-1-.7-1.3-2-1.9l-.7-.3c-2-.8-3.3-1.9-3.3-4.1 0-2 1.5-3.6 3.9-3.6 1.7 0 2.9.6 3.8 2.1l-2.2 1.4c-.5-.8-1-.8-1.6-.8-.7 0-1.2.5-1.2 1.1 0 .8.5 1.1 1.6 1.6l.7.3c2.3 1 3.6 2 3.6 4.3 0 2.4-1.9 3.8-4.5 3.8-2.5 0-4.1-1.2-4.9-2.9z" fill="#000"/></svg>,
  "TypeScript":<svg viewBox="0 0 32 32" width="13" height="13"><rect width="32" height="32" rx="4" fill="#3178C6"/><path d="M18 18.9v2.3c.4.2.8.3 1.3.4.5.1 1 .1 1.5.1.5 0 1 0 1.4-.1.4-.1.8-.3 1.1-.5.3-.2.6-.5.8-.9.2-.4.3-.8.3-1.3 0-.4 0-.7-.1-1-.1-.3-.2-.5-.4-.7-.2-.2-.4-.4-.7-.5-.3-.1-.6-.3-1-.4l-.8-.3c-.2-.1-.4-.1-.5-.2-.1-.1-.2-.1-.3-.2-.1-.1-.1-.2-.1-.3 0-.1 0-.2.1-.3.1-.1.1-.2.2-.2.1-.1.2-.1.4-.1.1 0 .3 0 .4.1.4.1.8.4 1.1.8l1.5-1.5c-.4-.5-.9-.8-1.5-1-.5-.2-1.1-.3-1.8-.3-.5 0-.9.1-1.3.2-.4.1-.7.3-1 .6-.3.2-.5.5-.6.9-.1.4-.2.7-.2 1.1 0 .6.2 1.1.5 1.5.3.4.8.7 1.5.9l.9.3c.3.1.5.2.7.3.2.1.3.2.3.3.1.1.1.2.1.4 0 .1 0 .3-.1.4-.1.1-.2.2-.3.3-.1.1-.3.1-.4.1-.2 0-.3 0-.5-.1-.4-.1-.7-.3-1.1-.6-.2-.2-.4-.4-.5-.6zm-4.5-5.5H9v2h3.2V25h2.3V15.4H17.5v-2H13.5z" fill="#fff"/></svg>,
  "React":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#222"/><circle cx="16" cy="16" r="3.1" fill="#61DAFB"/><ellipse cx="16" cy="16" rx="12" ry="4.5" fill="none" stroke="#61DAFB" strokeWidth="1.3"/><ellipse cx="16" cy="16" rx="12" ry="4.5" fill="none" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="12" ry="4.5" fill="none" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(120 16 16)"/></svg>,
  "Vue.js":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#1a1a2e"/><polygon points="16,6 25,6 16,22 7,6" fill="#42B883"/><polygon points="16,6 21.5,6 16,15.5 10.5,6" fill="#35495E"/></svg>,
  "Next.js":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#000"/><path d="M19.5 21.5l-7.5-11v11h-2V10h3l7 10.2V10h2v11.5z" fill="#fff"/></svg>,
  "Tailwind CSS":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#0F172A"/><path d="M16 10c-2.2 0-3.6 1.1-4.2 3.3.8-1.1 1.8-1.5 2.8-1.2.6.2 1 .6 1.5 1.1.8.8 1.7 1.8 3.6 1.8 2.2 0 3.6-1.1 4.2-3.3-.8 1.1-1.8 1.5-2.8 1.2-.6-.2-1-.6-1.5-1.1C18.8 11 17.9 10 16 10zm-4.2 6.7c-2.2 0-3.6 1.1-4.2 3.3.8-1.1 1.8-1.5 2.8-1.2.6.2 1 .6 1.5 1.1.8.8 1.7 1.8 3.6 1.8 2.2 0 3.6-1.1 4.2-3.3-.8 1.1-1.8 1.5-2.8 1.2-.6-.2-1-.6-1.5-1.1-.8-.8-1.7-1.8-3.6-1.8z" fill="#38BDF8"/></svg>,
  "Figma":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#1E1E1E"/><rect x="11" y="7" width="5" height="5" rx="2.5" fill="#FF7262"/><rect x="16" y="7" width="5" height="5" rx="2.5" fill="#F24E1E"/><rect x="11" y="12" width="5" height="5" rx="2.5" fill="#A259FF"/><circle cx="18.5" cy="14.5" r="2.5" fill="#1ABCFE"/><rect x="11" y="17" width="5" height="5" rx="2.5" fill="#0ACF83"/></svg>,
  "Storybook":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#FF4785"/><path d="M20 8h-8l-.5 5 2-.5c.3-.8 1-1.3 1.8-1.3.9 0 1.6.7 1.7 1.6L19 13h1V8zm-2 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" fill="#fff"/><rect x="12" y="12" width="8" height="8" rx="1" fill="none" stroke="#fff" strokeWidth="1.5"/></svg>,
  "SCSS":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#CC6699"/><path d="M10 19.5c.3.2.6.3 1 .3.7 0 1.3-.5 1.3-1.2 0-.6-.3-1-.9-1.3-.5-.3-.7-.4-.7-.7 0-.2.2-.4.5-.4.3 0 .5.1.7.3l.4-.7c-.3-.2-.7-.4-1.1-.4-.8 0-1.3.5-1.3 1.2 0 .7.4 1 .9 1.3.4.2.7.4.7.7 0 .3-.2.5-.6.5-.3 0-.6-.2-.8-.4l-.4.8zm4-5.5h-1l-.8 4.3c-.1.3-.2.5-.5.5-.1 0-.2 0-.3-.1l-.2.8c.2.1.4.1.6.1.8 0 1.2-.4 1.4-1.3L14 14zm2 .5c-.2-.1-.4-.2-.7-.2-1.3 0-2.2 1.2-2.2 2.7 0 1 .5 1.7 1.3 1.7.3 0 .7-.1 1-.4l-.1.3h1l.9-4.7h-1l-.2.6zm-.3 2.5c-.1.8-.6 1.4-1.1 1.4-.4 0-.6-.3-.6-.8 0-.9.5-1.7 1.1-1.7.2 0 .4.1.5.2l-.1.9zm3.5-2.5c-.2-.1-.5-.2-.8-.2-1.2 0-2 1.1-2 2.5 0 1 .5 1.8 1.5 1.8.3 0 .6-.1.8-.3l-.1.2h1l.9-4.7h-1l-.3.7zm-.4 2.7c-.2.5-.6.8-1 .8-.4 0-.6-.3-.6-.8 0-.9.4-1.7 1-1.7.2 0 .4.1.5.2l.1-.2-.2.9.2.8z" fill="#fff"/></svg>,
  "Framer Motion":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#0055FF"/><path d="M9 8h14v7H16l7 7H9v-7h7L9 8z" fill="#fff"/></svg>,
  "Jest":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#C21325"/><path d="M16 8a8 8 0 100 16A8 8 0 0016 8zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-9h2v4h-2zm0 5h2v2h-2z" fill="#fff"/><path d="M21 10l2-2 1 1-2 2zM10 21l-2 2-1-1 2-2z" fill="#fff"/></svg>,
  "Cypress":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#1B1E2E"/><circle cx="16" cy="16" r="7" fill="none" stroke="#69D3A7" strokeWidth="2"/><circle cx="16" cy="16" r="2.5" fill="#69D3A7"/><line x1="16" y1="7" x2="16" y2="9" stroke="#69D3A7" strokeWidth="2" strokeLinecap="round"/><line x1="16" y1="23" x2="16" y2="25" stroke="#69D3A7" strokeWidth="2" strokeLinecap="round"/><line x1="7" y1="16" x2="9" y2="16" stroke="#69D3A7" strokeWidth="2" strokeLinecap="round"/><line x1="23" y1="16" x2="25" y2="16" stroke="#69D3A7" strokeWidth="2" strokeLinecap="round"/></svg>,
  "Git":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#F05033"/><path d="M27 15l-10-10-1.4 1.4 3.8 3.8-6.7 6.7-3.8-3.8L7.5 14.5l10 10 1.4-1.4-4.1-4.1 6.7-6.7 4.1 4.1L27 15z" fill="#fff"/></svg>,
  "Vite":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#1a1a2e"/><polygon points="16,6 27,25 5,25" fill="none" stroke="#646CFF" strokeWidth="2"/><polygon points="16,10 23,23 9,23" fill="#FFA500" opacity="0.9"/></svg>,
  "Vercel":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#000"/><polygon points="16,9 27,23 5,23" fill="#fff"/></svg>,
  "WCAG / a11y":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#005A9C"/><circle cx="16" cy="10" r="2.5" fill="#fff"/><path d="M10 13h12M16 15v9M12 24l4-9 4 9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none"/></svg>,
  "Nuxt":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#00DC82"/><path d="M8 22h4.5l-4-7 6.5-11 6.5 11H25l-8-13.5z" fill="#fff"/></svg>,
  "CSS Modules":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#1572B6"/><path d="M8 8l1.5 14 6.5 2 6.5-2L24 8H8zm13 3H11l.2 2.5h9.4l-.7 7-4 1.1-4-1.1-.3-3h2.4l.1 1.5 1.8.5 1.8-.5.2-2.5H10.6l-.5-5.5h11.8z" fill="#fff"/></svg>,
  "GraphQL":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#E10098"/><circle cx="16" cy="8" r="2" fill="#fff"/><circle cx="16" cy="24" r="2" fill="#fff"/><circle cx="8" cy="12" r="2" fill="#fff"/><circle cx="24" cy="12" r="2" fill="#fff"/><circle cx="8" cy="20" r="2" fill="#fff"/><circle cx="24" cy="20" r="2" fill="#fff"/><polygon points="16,8 24,12 24,20 16,24 8,20 8,12" fill="none" stroke="#fff" strokeWidth="1.2"/><line x1="16" y1="8" x2="24" y2="20" stroke="#fff" strokeWidth="1.2"/><line x1="16" y1="8" x2="8" y2="20" stroke="#fff" strokeWidth="1.2"/><line x1="24" y1="12" x2="8" y2="12" stroke="#fff" strokeWidth="1.2"/><line x1="24" y1="20" x2="8" y2="20" stroke="#fff" strokeWidth="1.2"/><line x1="24" y1="12" x2="16" y2="24" stroke="#fff" strokeWidth="1.2"/><line x1="8" y1="12" x2="16" y2="24" stroke="#fff" strokeWidth="1.2"/></svg>,
  "D3.js":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#F9A03C"/><path d="M10 22c0-4 2-7 6-8-2-1-3-3-3-5h2c0 2 1.5 3.5 3.5 3.5S22 11 22 9h2c0 2-1 4-3 5 4 1 6 4 6 8H10z" fill="#fff"/></svg>,
  "React Flow":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#1a1a2e"/><circle cx="9" cy="16" r="3" fill="none" stroke="#61DAFB" strokeWidth="1.5"/><circle cx="23" cy="10" r="3" fill="none" stroke="#61DAFB" strokeWidth="1.5"/><circle cx="23" cy="22" r="3" fill="none" stroke="#61DAFB" strokeWidth="1.5"/><line x1="12" y1="15" x2="20" y2="11" stroke="#61DAFB" strokeWidth="1.2"/><line x1="12" y1="17" x2="20" y2="21" stroke="#61DAFB" strokeWidth="1.2"/></svg>,
  "Node.js":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#339933"/><path d="M16 7l9 5v8l-9 5-9-5v-8l9-5z" fill="none" stroke="#fff" strokeWidth="1.5"/><path d="M16 11v10M11.5 13.5l4.5 2.5 4.5-2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  "Stripe":<svg viewBox="0 0 32 32" width="13" height="13"><circle cx="16" cy="16" r="16" fill="#635BFF"/><path d="M14.5 13.3c0-.7.6-1 1.5-1 1.4 0 2.8.4 4 1.1v-3.7c-1.3-.5-2.6-.8-4-.8-3.3 0-5.5 1.7-5.5 4.6 0 4.5 6.2 3.8 6.2 5.7 0 .8-.7 1.1-1.7 1.1-1.5 0-3.4-.6-4.8-1.5v3.8c1.6.7 3.3 1 4.8 1 3.4 0 5.7-1.7 5.7-4.6-.1-4.8-6.2-4-6.2-5.7z" fill="#fff"/></svg>,
  "default":<svg viewBox="0 0 13 13" width="13" height="13"><circle cx="6.5" cy="6.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="6.5" cy="6.5" r="2" fill="currentColor"/></svg>,
};

// ── Photos ────────────────────────────────────────────────────────────────────
const PHOTO_1 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face";
const PHOTO_2 = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face";

// ── AI ────────────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an AI assistant embedded in a frontend developer portfolio. Answer concisely and naturally.
DEVELOPER: [Your Name] — Senior Frontend Developer, 6+ years, Philippines.
ABOUT: Bridges design & engineering. Known for design systems, performance, mentoring, open-source.
EXPERIENCE: TechCorp Solutions (2022–Present) · Pixel & Code Agency (2020–2021) · StartupLab Inc. (2019–2020)
SKILLS: JavaScript, TypeScript, React, Vue.js, Next.js, Tailwind CSS, Figma, Storybook, SCSS, Framer Motion, Jest, Cypress, Git, Vite, Vercel, WCAG
PROJECTS: DesignOS, Kartify, DataPulse, FlowForge
CONTACT: hello@yourname.dev | github.com/yourname | linkedin.com/in/yourname
Keep answers short, friendly, helpful. Max 3 sentences.`;

const INIT_MSGS = [{ role:"assistant", content:"Hi! I'm an AI trained on this portfolio. Ask me anything — experience, skills, availability, projects." }];

// ── Theme tokens ──────────────────────────────────────────────────────────────
const DARK = {
  bg:"#030D1A", bgCard:"rgba(3,14,32,0.85)", bgInput:"rgba(3,14,30,0.95)",
  bgChatPanel:"rgba(3,12,26,0.98)", bgChatHdr:"rgba(3,18,42,0.97)",
  bgChatInput:"rgba(3,14,32,0.7)", bgChatPwrd:"rgba(2,10,22,0.8)",
  bgAboutTag:"rgba(0,120,238,0.1)",
  border:"rgba(0,100,200,0.18)", borderAccent:"rgba(0,120,238,0.32)",
  borderFaint:"rgba(0,100,200,0.1)", borderChat:"rgba(0,100,200,0.15)",
  navBg:"rgba(3,13,26,0.92)", navBorder:"rgba(0,100,200,0.12)",
  text:"#D4EAFF", textSub:"#7AAAC0", textMuted:"#4A7090", textFaint:"#2A4A68",
  accent:"#00C2FF", accentDim:"#0077EE",
  glowA:"rgba(0,100,220,0.09)", glowB:"rgba(0,80,200,0.1)", gridLine:"rgba(0,100,200,0.04)",
  pill:"rgba(0,120,238,0.12)", pillText:"#4AB4FF", pillBorder:"rgba(0,180,255,0.2)",
  projBg:"rgba(3,18,38,0.85)", projBorder:"rgba(0,100,200,0.18)", projHov:"rgba(0,194,255,0.4)",
  expActBg:"rgba(0,194,255,0.07)", expHovBg:"rgba(0,120,238,0.05)", expTabBd:"rgba(0,100,200,0.2)",
  chatU:"rgba(0,100,200,0.22)", chatUBd:"rgba(0,180,255,0.25)", chatUTx:"#B8DCFF",
  chatA:"rgba(3,18,38,0.9)",    chatABd:"rgba(0,100,200,0.22)", chatATx:"#90B8D8",
  scrollThumb:"#0077EE", scrollTrack:"#030D1A",
  sbDis:"#0A1E35", sbDisTx:"#2A4A68",
  availBg:"rgba(0,194,80,0.07)", availBd:"rgba(0,220,100,0.2)", availTx:"#00E57A", availSubTx:"#3A6050",
  socialBd:"rgba(0,100,200,0.08)",
  fabTipBg:"rgba(3,14,32,0.95)", fabTipBd:"rgba(0,120,238,0.3)",
  sectionTag:"#0077EE", statNum:"#00C2FF", statLbl:"#3A6280",
  footerTx:"#2A4A68", footerTx2:"#1A3050",
  quoteColor:"#5A88A8", aboutTagBd:"rgba(0,180,255,0.2)",
  toggleBg:"rgba(3,14,32,0.9)", toggleBd:"rgba(0,120,238,0.3)", toggleTx:"#4AB4FF",
  dotBg:"#0077EE",
  photoRing:"rgba(0,194,255,0.45)", photoRing2:"rgba(0,194,255,0.12)",
  photoGlow:"rgba(0,194,255,0.3)", photoBadgeBg:"#00C2FF", photoBadgeTx:"#030D1A",
  mobileMenuBg:"rgba(3,10,22,0.98)",
};
const LIGHT = {
  bg:"#EEF4FF", bgCard:"rgba(255,255,255,0.95)", bgInput:"rgba(240,246,255,0.98)",
  bgChatPanel:"rgba(255,255,255,0.99)", bgChatHdr:"rgba(235,244,255,0.99)",
  bgChatInput:"rgba(238,246,255,0.85)", bgChatPwrd:"rgba(220,233,255,0.6)",
  bgAboutTag:"rgba(0,100,220,0.06)",
  border:"rgba(0,80,180,0.13)", borderAccent:"rgba(0,100,220,0.28)",
  borderFaint:"rgba(0,80,180,0.08)", borderChat:"rgba(0,80,180,0.12)",
  navBg:"rgba(238,244,255,0.95)", navBorder:"rgba(0,80,180,0.1)",
  text:"#0A1E36", textSub:"#2A5080", textMuted:"#4A6A90", textFaint:"#7A9ABE",
  accent:"#0055CC", accentDim:"#0044AA",
  glowA:"rgba(0,100,220,0.07)", glowB:"rgba(0,80,200,0.07)", gridLine:"rgba(0,80,200,0.03)",
  pill:"rgba(0,100,220,0.08)", pillText:"#0044BB", pillBorder:"rgba(0,100,220,0.2)",
  projBg:"rgba(255,255,255,0.9)", projBorder:"rgba(0,80,180,0.12)", projHov:"rgba(0,120,240,0.35)",
  expActBg:"rgba(0,100,220,0.08)", expHovBg:"rgba(0,100,220,0.05)", expTabBd:"rgba(0,80,180,0.15)",
  chatU:"rgba(0,90,200,0.11)", chatUBd:"rgba(0,120,240,0.2)", chatUTx:"#002A6A",
  chatA:"rgba(240,246,255,0.97)", chatABd:"rgba(0,80,180,0.14)", chatATx:"#1E4A78",
  scrollThumb:"#0077EE", scrollTrack:"#E4EEF8",
  sbDis:"#C8D8F0", sbDisTx:"#8AAAC8",
  availBg:"rgba(0,180,80,0.06)", availBd:"rgba(0,180,80,0.18)", availTx:"#007040", availSubTx:"#3A6A50",
  socialBd:"rgba(0,80,180,0.07)",
  fabTipBg:"rgba(255,255,255,0.99)", fabTipBd:"rgba(0,100,220,0.22)",
  sectionTag:"#0044AA", statNum:"#0055CC", statLbl:"#5A7A9A",
  footerTx:"#8AAAC0", footerTx2:"#A0BAD0",
  quoteColor:"#4A6A8A", aboutTagBd:"rgba(0,100,220,0.18)",
  toggleBg:"rgba(255,255,255,0.95)", toggleBd:"rgba(0,100,220,0.2)", toggleTx:"#0044BB",
  dotBg:"#0077EE",
  photoRing:"rgba(0,100,220,0.4)", photoRing2:"rgba(0,100,220,0.1)",
  photoGlow:"rgba(0,100,220,0.2)", photoBadgeBg:"#0055CC", photoBadgeTx:"#ffffff",
  mobileMenuBg:"rgba(240,246,255,0.99)",
};

// ── Apply base dark background immediately before first render ────────────────
if (typeof document !== "undefined") {
  document.documentElement.style.background = "#030D1A";
  document.body.style.background = "#030D1A";
  document.body.style.margin = "0";
}

// ── Breakpoint hook ───────────────────────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024, w };
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark]             = useState(true);
  const [activeExp, setActiveExp]   = useState(0);
  const [chatOpen, setChatOpen]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [messages, setMessages]     = useState(INIT_MSGS);
  const [input, setInput]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [glowX, setGlowX]           = useState(30);
  const [glowY, setGlowY]           = useState(30);
  const [imgHovered, setImgHovered] = useState(false);
  const chatEndRef = useRef(null);
  const c = dark ? DARK : LIGHT;
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  // Sync html + body background with active theme on every toggle
  useEffect(() => {
    const els = [document.documentElement, document.body];
    els.forEach(el => {
      el.style.background = c.bg;
      el.style.margin = "0";
      el.style.padding = "0";
      el.style.minHeight = "100%";
      el.style.transition = "background 0.3s";
    });
  }, [c.bg]);

  useEffect(() => {
    const fn = (e) => { setGlowX((e.clientX/window.innerWidth)*100); setGlowY((e.clientY/window.innerHeight)*100); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  // Close mobile menu on nav click
  const navClick = () => setMenuOpen(false);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role:"user", content:input.trim() };
    const next = [...messages, userMsg];
    setMessages(next); setInput(""); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:SYSTEM_PROMPT, messages:next.map(m=>({role:m.role,content:m.content})) }),
      });
      const data = await res.json();
      setMessages([...next, { role:"assistant", content:data.content?.[0]?.text||"Sorry, try again." }]);
    } catch { setMessages([...next, { role:"assistant", content:"Connection error. Please try again." }]); }
    setLoading(false);
  };

  // Style helpers
  const card = (ex={}) => ({ background:c.bgCard, border:`1px solid ${c.border}`, borderRadius: isMobile ? 16 : 20, ...ex });
  const tag  = ()       => ({ fontSize:10, color:c.sectionTag, letterSpacing:"0.18em", textTransform:"uppercase", fontFamily:"'DM Mono',monospace", marginBottom:6 });
  const hd   = (sz=20)  => ({ fontSize:sz, fontWeight:800, fontFamily:"'Syne',sans-serif", lineHeight:1.1, color:c.text });
  const pl   = ()       => ({ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 11px 4px 7px", borderRadius:20, fontSize:11, background:c.pill, color:c.pillText, border:`1px solid ${c.pillBorder}`, margin:3, fontFamily:"'DM Mono',monospace", verticalAlign:"middle", lineHeight:1 });
  const Pill = ({ label }) => (
    <span style={pl()}>
      <span style={{ display:"flex", alignItems:"center", flexShrink:0, lineHeight:0 }}>
        {TECH_ICONS[label] || TECH_ICONS["default"]}
      </span>
      {label}
    </span>
  );
  const inp = () => ({ background:c.bgInput, border:`1px solid ${c.border}`, borderRadius:8, padding:"10px 12px", fontSize:13, color:c.text, outline:"none", fontFamily:"'DM Mono',monospace", width:"100%", transition:"border-color 0.2s" });

  const NAV_LINKS = ["#about","#summary","#experience","#projects","#contact"];
  const px = isMobile ? "16px" : isTablet ? "24px" : "32px";

  return (
    <div className="grid-bg" style={{ fontFamily:"'DM Mono','Fira Code',monospace", background:c.bg, color:c.text, minHeight:"100vh", position:"relative", transition:"background 0.3s,color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html,body{background:${c.bg} !important;margin:0;padding:0;min-height:100%;transition:background 0.3s;}
        html{scroll-behavior:smooth;overflow-x:hidden;}
        body{overflow-x:hidden;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:${c.scrollTrack};}
        ::-webkit-scrollbar-thumb{background:${c.scrollThumb};border-radius:2px;}

        .glow-btn{background:linear-gradient(135deg,#004CBB,#0088FF);color:#fff;border:none;border-radius:9px;padding:10px 20px;font-size:13px;font-weight:500;cursor:pointer;font-family:'DM Mono',monospace;letter-spacing:0.04em;transition:all 0.2s;white-space:nowrap;}
        .glow-btn:hover{box-shadow:0 0 22px rgba(0,120,255,0.45);transform:translateY(-1px);}
        .out-btn{background:transparent;color:${c.accent};border:1px solid ${c.borderAccent};border-radius:9px;padding:10px 20px;font-size:13px;font-weight:500;cursor:pointer;font-family:'DM Mono',monospace;transition:all 0.2s;white-space:nowrap;}
        .out-btn:hover{background:${dark?"rgba(0,194,255,0.07)":"rgba(0,100,220,0.06)"};}

        .fab{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#004CBB,#00AAFF);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px;color:#fff;box-shadow:0 4px 24px rgba(0,120,255,0.45);transition:transform 0.2s,box-shadow 0.2s;position:relative;}
        .fab:hover{transform:scale(1.08);}
        .fab-badge{position:absolute;top:-2px;right:-2px;width:13px;height:13px;border-radius:50%;background:#00E57A;border:2px solid ${c.bg};animation:pls 2s infinite;}

        .proj-card{background:${c.projBg};border:1px solid ${c.projBorder};border-radius:12px;padding:14px;transition:all 0.25s;cursor:default;}
        .proj-card:hover{border-color:${c.projHov};transform:translateY(-2px);}

        .exp-tab{width:100%;text-align:left;background:none;border:none;border-left:2px solid ${c.expTabBd};padding:10px 14px;color:${c.textMuted};font-size:12px;cursor:pointer;transition:all 0.2s;font-family:'DM Mono',monospace;}
        .exp-tab:hover{color:${c.pillText};background:${c.expHovBg};}
        .exp-tab.active{color:${c.accent};border-left-color:${c.accent};background:${c.expActBg};}

        /* Mobile exp tabs — horizontal scroll row */
        .exp-tab-h{background:none;border:none;border-bottom:2px solid ${c.expTabBd};padding:8px 14px;color:${c.textMuted};font-size:12px;cursor:pointer;transition:all 0.2s;font-family:'DM Mono',monospace;white-space:nowrap;flex-shrink:0;}
        .exp-tab-h.active{color:${c.accent};border-bottom-color:${c.accent};}

        .grid-bg{background-image:linear-gradient(${c.gridLine} 1px,transparent 1px),linear-gradient(90deg,${c.gridLine} 1px,transparent 1px);background-size:40px 40px;}

        /* Avatar */
        .avatar-wrap{position:relative;flex-shrink:0;cursor:pointer;user-select:none;}
        .avatar-outer-ring{position:absolute;inset:-6px;border-radius:50%;border:2px solid ${c.photoRing2};transition:border-color 0.35s,box-shadow 0.35s;}
        .avatar-inner-ring{position:absolute;inset:-2px;border-radius:50%;border:2px solid ${c.photoRing};transition:border-color 0.35s,box-shadow 0.35s;}
        .avatar-wrap:hover .avatar-outer-ring{border-color:${c.photoRing};box-shadow:0 0 0 4px ${c.photoGlow};}
        .avatar-wrap:hover .avatar-inner-ring{border-color:${c.accent};box-shadow:0 0 18px ${c.photoGlow};}
        .avatar-img{border-radius:50%;object-fit:cover;display:block;transition:opacity 0.35s ease,transform 0.35s ease;position:absolute;inset:0;}
        .avatar-img.fading{opacity:0;transform:scale(0.94);}
        .avatar-hint{position:absolute;bottom:-2px;right:-2px;width:24px;height:24px;border-radius:50%;background:${c.photoBadgeBg};border:2px solid ${c.bg};display:flex;align-items:center;justify-content:center;font-size:11px;color:${c.photoBadgeTx};transition:transform 0.2s;}
        .avatar-wrap:hover .avatar-hint{transform:rotate(180deg);}
        .avatar-fallback{border-radius:50%;background:linear-gradient(135deg,#004CBB,#00AAFF);display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-family:'Syne',sans-serif;position:absolute;inset:0;}

        /* Mobile menu slide-in */
        .mobile-menu{position:fixed;top:54px;left:0;right:0;bottom:0;background:${c.mobileMenuBg};z-index:49;display:flex;flex-direction:column;padding:24px;gap:8px;animation:menuIn 0.2s ease;}
        @keyframes menuIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .mobile-nav-link{display:block;padding:14px 16px;border-radius:12px;font-size:15px;color:${c.text};text-decoration:none;font-family:'DM Mono',monospace;border:1px solid ${c.borderFaint};letter-spacing:0.06em;transition:all 0.15s;}
        .mobile-nav-link:hover{background:${c.pill};color:${c.accent};}

        .dot{display:inline-block;width:5px;height:5px;border-radius:50%;background:${c.dotBg};animation:bl 1.2s infinite;margin:0 2px;}
        .dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}

        @keyframes bl{0%,80%,100%{opacity:.15}40%{opacity:1}}
        @keyframes pls{0%,100%{box-shadow:0 0 0 0 rgba(0,229,122,0.5)}50%{box-shadow:0 0 0 6px rgba(0,229,122,0)}}
        @keyframes slideUp{from{opacity:0;transform:scale(0.88) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* Ambient glow */}
      <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0 }}>
        <div style={{ position:"absolute",width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,${c.glowA} 0%,transparent 70%)`,left:`${glowX}%`,top:`${glowY}%`,transform:"translate(-50%,-50%)",transition:"left 1s,top 1s" }} />
        <div style={{ position:"absolute",top:0,left:0,right:0,height:"50vh",background:`radial-gradient(ellipse at 15% 0%,${c.glowB} 0%,transparent 55%)` }} />
      </div>

      {/* ── NAV ── */}
      <header style={{ position:"sticky",top:0,zIndex:50,background:c.navBg,backdropFilter:"blur(20px)",borderBottom:`1px solid ${c.navBorder}`,padding:`0 ${px}`,height:54,display:"flex",alignItems:"center",justifyContent:"space-between",transition:"background 0.3s" }}>
        <span style={{ fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,color:c.accent }}>YN.</span>

        {/* Desktop nav links */}
        {isDesktop && (
          <div style={{ display:"flex",gap:2,alignItems:"center" }}>
            {NAV_LINKS.map(h => (
              <a key={h} href={h} style={{ fontSize:11,color:c.textMuted,textDecoration:"none",padding:"4px 10px",borderRadius:20,letterSpacing:"0.08em",textTransform:"uppercase",transition:"color 0.2s",fontFamily:"'DM Mono',monospace" }}
                onMouseOver={e=>e.target.style.color=c.accent} onMouseOut={e=>e.target.style.color=c.textMuted}>
                {h.replace("#","")}
              </a>
            ))}
          </div>
        )}

        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          {/* Theme toggle */}
          <button onClick={() => setDark(d=>!d)}
            style={{ background:c.toggleBg,border:`1px solid ${c.toggleBd}`,borderRadius:30,padding:isMobile?"6px 10px":"6px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontSize:12,color:c.toggleTx,fontFamily:"'DM Mono',monospace",transition:"all 0.25s" }}>
            <span style={{ fontSize:15,lineHeight:1 }}>{dark?"☀":"☾"}</span>
            {!isMobile && <span>{dark?"Light":"Dark"}</span>}
          </button>
          {/* Mobile hamburger */}
          {!isDesktop && (
            <button onClick={() => setMenuOpen(o=>!o)}
              style={{ background:c.toggleBg,border:`1px solid ${c.toggleBd}`,borderRadius:10,padding:"7px 10px",cursor:"pointer",color:c.toggleTx,fontSize:18,lineHeight:1,fontFamily:"monospace",display:"flex",alignItems:"center" }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </header>

      {/* Mobile menu drawer */}
      {menuOpen && !isDesktop && (
        <div className="mobile-menu">
          {NAV_LINKS.map(h => (
            <a key={h} href={h} className="mobile-nav-link" onClick={navClick}>
              {h.replace("#","").charAt(0).toUpperCase()+h.replace("#","").slice(1)}
            </a>
          ))}
          <button className="glow-btn" style={{ marginTop:8,width:"100%",padding:"13px",fontSize:14 }} onClick={() => { setChatOpen(true); setMenuOpen(false); }}>✦ Ask AI about me</button>
        </div>
      )}

      {/* ── MAIN ── */}
      <main style={{ position:"relative",zIndex:1,maxWidth:1280,margin:"0 auto",padding:`22px ${px} 64px` }}>

        {/* ROW 1 — Hero + Stats + Skills */}
        <div style={{ display:"grid", gridTemplateColumns: isDesktop ? "1fr auto auto" : "1fr", gap:14, marginBottom:14 }}>

          {/* Hero card */}
          <div style={{ ...card({ padding: isMobile?"20px":"26px 30px" }) }}>
            <div style={{ display:"flex", flexDirection: isMobile?"column":"row", alignItems: isMobile?"flex-start":"center", gap: isMobile?18:24 }}>

              {/* Avatar */}
              {(() => {
                const sz = isMobile ? 88 : 116;
                return (
                  <div className="avatar-wrap" style={{ width:sz, height:sz }}
                    role="button" tabIndex={0} aria-label="Profile photo"
                    onMouseEnter={() => setImgHovered(true)}
                    onMouseLeave={() => setImgHovered(false)}
                    onClick={() => setImgHovered(h=>!h)}
                    onKeyDown={e => e.key==="Enter" && setImgHovered(h=>!h)}>
                    <div className="avatar-outer-ring" />
                    <div className="avatar-inner-ring" />
                    <img className={`avatar-img${imgHovered?" fading":""}`} src={PHOTO_1} alt="Photo 1" style={{ width:sz,height:sz,zIndex:imgHovered?1:2 }} onError={e=>e.target.style.display="none"} />
                    <img className={`avatar-img${!imgHovered?" fading":""}`} src={PHOTO_2} alt="Photo 2" style={{ width:sz,height:sz,zIndex:imgHovered?2:1 }} onError={e=>e.target.style.display="none"} />
                    <div className="avatar-fallback" style={{ width:sz,height:sz,fontSize:sz*0.26,zIndex:0 }}>YN</div>
                    <div className="avatar-hint">↻</div>
                  </div>
                );
              })()}

              {/* Text */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={tag()}>// frontend developer · philippines</div>
                <h1 style={{ fontSize:isMobile?"28px":isTablet?"36px":"clamp(28px,3.2vw,40px)",fontWeight:800,fontFamily:"'Syne',sans-serif",lineHeight:1.06,letterSpacing:"-0.02em",color:c.text,marginBottom:10 }}>
                  Hi! I am<br />
                  <span style={{ color:c.accent }}>Gerarld</span>
                </h1>
                <p style={{ fontSize:13,color:c.textSub,lineHeight:1.75,marginBottom:16,maxWidth:460 }}>
                  3+ years crafting high-performance UIs. Specializing in design systems, CMS architecture, and pixel-perfect products shipped fast.
                </p>
                <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
                  <button className="glow-btn" onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}>Hire me →</button>
                  <button className="out-btn" onClick={() => setChatOpen(true)}>Ask AI about me</button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats — horizontal row on mobile/tablet, vertical column on desktop */}
          <div style={{ display:"grid", gridTemplateColumns: isDesktop ? "1fr" : "repeat(4,1fr)", gap:10, minWidth: isDesktop?110:undefined }}>
            {[["6+","Years"],["20+","Projects"],["3","Systems"],["99.9%","Uptime"]].map(([n,l]) => (
              <div key={l} style={{ ...card({ padding:"12px 10px",textAlign:"center",display:"flex",flexDirection:"column",justifyContent:"center" }) }}>
                <div style={{ fontSize:isMobile?20:24,fontWeight:800,color:c.statNum,fontFamily:"'Syne',sans-serif",lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:9,color:c.statLbl,marginTop:3,letterSpacing:"0.08em",textTransform:"uppercase" }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Skills — hidden on mobile (shown in summary), shown on tablet+ */}
          {!isMobile && (
            <div style={{ ...card({ padding:"18px 16px", minWidth: isDesktop?188:undefined, width: isTablet?"100%":undefined }) }}>
              <div style={tag()}>Core Skills</div>
              <div style={{ marginTop:6 }}>{SKILLS.map(s => <Pill key={s} label={s} />)}</div>
            </div>
          )}
        </div>

        {/* Skills on mobile — shown as its own row */}
        {isMobile && (
          <div style={{ ...card({ padding:"18px 16px",marginBottom:14 }) }}>
            <div style={tag()}>Core Skills</div>
            <div style={{ marginTop:6 }}>{SKILLS.map(s => <Pill key={s} label={s} />)}</div>
          </div>
        )}

        {/* ── ABOUT / SUMMARY ── */}
        <div id="summary" style={{ marginBottom:14 }}>
          <div style={{ ...card({ padding: isMobile?"20px":"26px 30px" }) }}>
            <div style={{ display:"grid", gridTemplateColumns: isDesktop?"1fr 1fr":"1fr", gap: isDesktop?30:20, alignItems:"start" }}>
              <div>
                <div style={tag()}>// about me</div>
                <h2 style={{ ...hd(isMobile?20:22),marginBottom:14 }}>Who I am &amp; <span style={{ color:c.accent }}>what drives me</span></h2>
                <p style={{ fontSize:13,color:c.textSub,lineHeight:1.8,marginBottom:12 }}>I'm a frontend developer based in the Philippines with a deep passion for crafting interfaces that feel as great as they look. My work sits at the intersection of design and engineering — I care equally about visual precision and clean, maintainable code.</p>
                <p style={{ fontSize:13,color:c.textSub,lineHeight:1.8,marginBottom:12 }}>Over 6 years, I've contributed to everything from scrappy startup products to enterprise-scale design systems. I thrive in collaborative environments, love mentoring junior developers, and am always pushing to understand the "why" behind every user interaction.</p>
                <p style={{ fontSize:13,color:c.textSub,lineHeight:1.8 }}>When I'm not coding, I'm exploring generative art, contributing to open-source projects, or experimenting with the latest frontend tooling.</p>
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
                <div style={{ borderLeft:`3px solid ${c.accent}`,paddingLeft:16 }}>
                  <p style={{ fontSize:isMobile?13:14,fontStyle:"italic",color:c.quoteColor,lineHeight:1.7,fontFamily:"'Syne',sans-serif" }}>"I don't just build UIs — I build experiences that make people feel something."</p>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
                  {[["Location","Philippines 🇵🇭"],["Focus","Frontend / UI"],["Experience","6+ Years"],["Education","BS Computer Sci."],["Languages","EN · Filipino"],["Status","Open to Work ✦"]].map(([lbl,val]) => (
                    <div key={lbl} style={{ background:c.bgAboutTag,border:`1px solid ${c.aboutTagBd}`,borderRadius:10,padding:"9px 12px" }}>
                      <div style={{ fontSize:10,color:c.textMuted,letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:"'DM Mono',monospace",marginBottom:3 }}>{lbl}</div>
                      <div style={{ fontSize:12,color:c.text,fontWeight:500 }}>{val}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize:10,color:c.textMuted,letterSpacing:"0.12em",textTransform:"uppercase",fontFamily:"'DM Mono',monospace",marginBottom:7 }}>Interests</div>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
                    {["Design Systems","Open Source","Accessibility","Performance","Generative Art","Mentoring","TypeScript","UX Research"].map(i=><Pill key={i} label={i}/>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2 — Experience + Projects */}
        <div id="experience" style={{ display:"grid", gridTemplateColumns: isDesktop?"1fr 1fr":"1fr", gap:14, marginBottom:14 }}>

          {/* Experience */}
          <div style={{ ...card({ overflow:"hidden",padding:0 }) }}>
            <div style={{ padding:"18px 22px 12px",borderBottom:`1px solid ${c.borderFaint}` }}>
              <div style={tag()}>Work History</div>
              <h2 style={hd(isMobile?18:20)}>Where I've <span style={{ color:c.accent }}>shipped</span></h2>
            </div>

            {/* Tabs — vertical on desktop/tablet, horizontal scroll on mobile */}
            {isMobile ? (
              <>
                <div style={{ display:"flex",overflowX:"auto",borderBottom:`1px solid ${c.borderFaint}`,gap:0,scrollbarWidth:"none" }}>
                  {EXPERIENCES.map((e,i) => (
                    <button key={i} className={`exp-tab-h${activeExp===i?" active":""}`} onClick={() => setActiveExp(i)}>
                      <div style={{ fontWeight:500,fontSize:11 }}>{e.company}</div>
                    </button>
                  ))}
                </div>
                <div style={{ padding:"16px 18px" }}>
                  <div style={{ fontSize:14,fontWeight:700,fontFamily:"'Syne',sans-serif",color:c.text,marginBottom:2 }}>{EXPERIENCES[activeExp].role}</div>
                  <div style={{ fontSize:11,color:c.accentDim,marginBottom:11,fontFamily:"'DM Mono',monospace" }}>@ {EXPERIENCES[activeExp].company} · {EXPERIENCES[activeExp].period}</div>
                  <ul style={{ listStyle:"none",marginBottom:11 }}>
                    {EXPERIENCES[activeExp].highlights.map((h,i)=>(
                      <li key={i} style={{ display:"flex",gap:8,marginBottom:8,fontSize:12,color:c.textSub,lineHeight:1.6 }}>
                        <span style={{ color:c.accent,flexShrink:0 }}>▹</span>{h}
                      </li>
                    ))}
                  </ul>
                  <div>{EXPERIENCES[activeExp].tech.map(t=><Pill key={t} label={t}/>)}</div>
                </div>
              </>
            ) : (
              <div style={{ display:"grid",gridTemplateColumns:"145px 1fr" }}>
                <div style={{ borderRight:`1px solid ${c.borderFaint}`,paddingTop:6 }}>
                  {EXPERIENCES.map((e,i) => (
                    <button key={i} className={`exp-tab${activeExp===i?" active":""}`} onClick={() => setActiveExp(i)}>
                      <div style={{ fontWeight:500 }}>{e.company}</div>
                      <div style={{ fontSize:10,opacity:0.55,marginTop:2 }}>{e.period}</div>
                    </button>
                  ))}
                </div>
                <div style={{ padding:"16px 18px" }}>
                  <div style={{ fontSize:14,fontWeight:700,fontFamily:"'Syne',sans-serif",color:c.text,marginBottom:2 }}>{EXPERIENCES[activeExp].role}</div>
                  <div style={{ fontSize:11,color:c.accentDim,marginBottom:11,fontFamily:"'DM Mono',monospace" }}>@ {EXPERIENCES[activeExp].company} · {EXPERIENCES[activeExp].period}</div>
                  <ul style={{ listStyle:"none",marginBottom:11 }}>
                    {EXPERIENCES[activeExp].highlights.map((h,i)=>(
                      <li key={i} style={{ display:"flex",gap:8,marginBottom:8,fontSize:12,color:c.textSub,lineHeight:1.6 }}>
                        <span style={{ color:c.accent,flexShrink:0 }}>▹</span>{h}
                      </li>
                    ))}
                  </ul>
                  <div>{EXPERIENCES[activeExp].tech.map(t=><Pill key={t} label={t}/>)}</div>
                </div>
              </div>
            )}
          </div>

          {/* Projects */}
          <div id="projects" style={{ ...card({ padding: isMobile?"18px 16px":"18px 22px" }) }}>
            <div style={tag()}>Selected Work</div>
            <h2 style={{ ...hd(isMobile?18:20),marginBottom:14 }}>Things I've <span style={{ color:c.accent }}>built</span></h2>
            <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:10 }}>
              {PROJECTS.map((p,i) => (
                <div key={i} className="proj-card">
                  <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
                    <div style={{ width:28,height:28,borderRadius:7,background:`${p.color}18`,border:`1px solid ${p.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:p.color }}>{p.icon}</div>
                    <div style={{ fontSize:13,fontWeight:700,fontFamily:"'Syne',sans-serif",color:c.text }}>{p.title}</div>
                  </div>
                  <p style={{ fontSize:11,color:c.textMuted,lineHeight:1.6,marginBottom:8 }}>{p.desc}</p>
                  <div>{p.tech.map(t=><Pill key={t} label={t}/>)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 3 — Availability + Contact */}
        <div id="contact" style={{ display:"grid", gridTemplateColumns: isDesktop?"260px 1fr": isTablet?"1fr 1fr":"1fr", gap:14 }}>

          {/* Availability + socials */}
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            <div style={{ background:c.availBg,border:`1px solid ${c.availBd}`,borderRadius:16,padding:"16px 18px" }}>
              <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:6 }}>
                <span style={{ width:8,height:8,borderRadius:"50%",background:c.availTx,display:"inline-block",boxShadow:`0 0 7px ${c.availTx}` }} />
                <span style={{ fontSize:12,color:c.availTx,fontFamily:"'DM Mono',monospace",fontWeight:500 }}>Available for work</span>
              </div>
              <p style={{ fontSize:11,color:c.availSubTx,lineHeight:1.65 }}>Open to frontend roles, freelance & design system collaborations.</p>
            </div>
            <div style={{ ...card({ padding:"16px 18px",flex:1 }) }}>
              <div style={{ ...tag(),marginBottom:11 }}>Find me online</div>
              {[["GitHub","github.com/yourname"],["LinkedIn","linkedin.com/in/yourname"],["Email","hello@yourname.dev"]].map(([l,v],i,arr) => (
                <div key={l} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:4,marginBottom:i<arr.length-1?9:0,paddingBottom:i<arr.length-1?9:0,borderBottom:i<arr.length-1?`1px solid ${c.socialBd}`:"none" }}>
                  <span style={{ fontSize:11,color:c.textFaint,fontFamily:"'DM Mono',monospace",textTransform:"uppercase",letterSpacing:"0.1em" }}>{l}</span>
                  <span style={{ fontSize:11,color:c.accent,fontFamily:"'DM Mono',monospace" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div style={{ ...card({ padding: isMobile?"18px 16px":"20px 24px" }) }}>
            <div style={tag()}>Contact</div>
            <h2 style={{ ...hd(isMobile?18:20),marginBottom:16 }}>Let's <span style={{ color:c.accent }}>work</span> together</h2>
            <div style={{ display:"grid",gridTemplateColumns: isMobile?"1fr":"1fr 1fr",gap:10,marginBottom:10 }}>
              <input placeholder="Your name"  style={inp()} onFocus={e=>e.target.style.borderColor=c.accent} onBlur={e=>e.target.style.borderColor=c.border}/>
              <input placeholder="Your email" style={inp()} onFocus={e=>e.target.style.borderColor=c.accent} onBlur={e=>e.target.style.borderColor=c.border}/>
            </div>
            <input placeholder="Subject" style={{ ...inp(),marginBottom:10,display:"block" }} onFocus={e=>e.target.style.borderColor=c.accent} onBlur={e=>e.target.style.borderColor=c.border}/>
            <textarea placeholder="Your message..." rows={4} style={{ ...inp(),resize:"vertical",marginBottom:11,display:"block" }} onFocus={e=>e.target.style.borderColor=c.accent} onBlur={e=>e.target.style.borderColor=c.border}/>
            <button className="glow-btn" style={{ width:"100%",padding:"12px",fontSize:14 }}>Send Message →</button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop:24,paddingTop:16,borderTop:`1px solid ${c.borderFaint}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8 }}>
          <span style={{ fontSize:11,color:c.footerTx,fontFamily:"'DM Mono',monospace" }}>Designed & built by Your Name · {new Date().getFullYear()}</span>
          <span style={{ fontSize:11,color:c.footerTx2,fontFamily:"'DM Mono',monospace" }}>Frontend Developer · Philippines</span>
        </div>
      </main>

      {/* ── CHAT PANEL ── */}
      {chatOpen && (
        <div style={{ position:"fixed",bottom:isMobile?0:88,right:isMobile?0:20,width:isMobile?"100%":382,zIndex:200,display:"flex",flexDirection:"column",background:c.bgChatPanel,border:`1px solid ${c.borderAccent}`,borderRadius:isMobile?"20px 20px 0 0":20,overflow:"hidden",boxShadow:dark?"0 24px 64px rgba(0,0,0,0.7)":"0 12px 40px rgba(0,60,160,0.14)",animation:"slideUp 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards",maxHeight:isMobile?"90vh":"auto" }}>
          {/* Header */}
          <div style={{ padding:"14px 18px",borderBottom:`1px solid ${c.borderChat}`,display:"flex",alignItems:"center",gap:11,background:c.bgChatHdr,flexShrink:0 }}>
            <div style={{ position:"relative",flexShrink:0 }}>
              <div style={{ width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#004CBB,#00AAFF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,color:"#fff" }}>✦</div>
              <span style={{ position:"absolute",bottom:0,right:0,width:10,height:10,borderRadius:"50%",background:"#00E57A",border:`2px solid ${c.bgChatHdr}` }}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14,fontWeight:700,color:c.text,fontFamily:"'Syne',sans-serif",lineHeight:1 }}>Portfolio AI</div>
              <div style={{ fontSize:10,color:c.accent,fontFamily:"'DM Mono',monospace",marginTop:3 }}>● online · ask me anything</div>
            </div>
            <button onClick={() => setChatOpen(false)} style={{ background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)",border:`1px solid ${dark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.07)"}`,borderRadius:"50%",width:30,height:30,color:c.textMuted,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",flexShrink:0 }}
              onMouseOver={e=>e.currentTarget.style.color=c.text} onMouseOut={e=>e.currentTarget.style.color=c.textMuted}>✕</button>
          </div>

          {/* Suggestion chips */}
          {messages.length === 1 && (
            <div style={{ padding:"10px 14px 5px",borderBottom:`1px solid ${c.borderFaint}`,flexShrink:0 }}>
              <div style={{ fontSize:10,color:c.textMuted,fontFamily:"'DM Mono',monospace",marginBottom:6,letterSpacing:"0.1em",textTransform:"uppercase" }}>Suggested</div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
                {["What's your experience?","Are you available?","Best projects?","Tech stack?"].map(q => (
                  <button key={q} onClick={() => setInput(q)} style={{ fontSize:11,padding:"4px 10px",borderRadius:20,background:c.pill,color:c.pillText,border:`1px solid ${c.pillBorder}`,cursor:"pointer",fontFamily:"'DM Mono',monospace",transition:"all 0.15s" }}
                    onMouseOver={e=>e.currentTarget.style.background=dark?"rgba(0,120,238,0.22)":"rgba(0,100,220,0.14)"}
                    onMouseOut={e=>e.currentTarget.style.background=c.pill}>{q}</button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div style={{ overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:10,flex:1,minHeight:0,maxHeight: isMobile?"55vh":306 }}>
            {messages.map((m,i) => (
              <div key={i} style={{ display:"flex",flexDirection:"column",alignItems:m.role==="user"?"flex-end":"flex-start",gap:3 }}>
                {m.role==="assistant" && (
                  <div style={{ display:"flex",alignItems:"center",gap:5,marginLeft:3 }}>
                    <div style={{ width:16,height:16,borderRadius:"50%",background:"linear-gradient(135deg,#004CBB,#00AAFF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#fff" }}>✦</div>
                    <span style={{ fontSize:10,color:c.textFaint,fontFamily:"'DM Mono',monospace" }}>Portfolio AI</span>
                  </div>
                )}
                <div style={{ background:m.role==="user"?c.chatU:c.chatA,border:`1px solid ${m.role==="user"?c.chatUBd:c.chatABd}`,borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",padding:"9px 14px",fontSize:13,color:m.role==="user"?c.chatUTx:c.chatATx,maxWidth:"84%",lineHeight:1.55 }}>{m.content}</div>
                {m.role==="user" && <span style={{ fontSize:10,color:c.textFaint,fontFamily:"'DM Mono',monospace",marginRight:3 }}>You</span>}
              </div>
            ))}
            {loading && (
              <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-start",gap:3 }}>
                <div style={{ display:"flex",alignItems:"center",gap:5,marginLeft:3 }}>
                  <div style={{ width:16,height:16,borderRadius:"50%",background:"linear-gradient(135deg,#004CBB,#00AAFF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:"#fff" }}>✦</div>
                  <span style={{ fontSize:10,color:c.textFaint,fontFamily:"'DM Mono',monospace" }}>Portfolio AI</span>
                </div>
                <div style={{ background:c.chatA,border:`1px solid ${c.chatABd}`,borderRadius:"14px 14px 14px 4px",padding:"9px 14px",display:"flex",alignItems:"center",gap:2 }}>
                  <span className="dot"/><span className="dot"/><span className="dot"/>
                </div>
              </div>
            )}
            <div ref={chatEndRef}/>
          </div>

          <div style={{ height:"1px",background:c.borderFaint,flexShrink:0 }}/>

          {/* Input */}
          <div style={{ padding:"11px 14px",background:c.bgChatInput,display:"flex",gap:9,alignItems:"flex-end",flexShrink:0 }}>
            <div style={{ flex:1,position:"relative" }}>
              <textarea value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
                placeholder="Ask about experience, skills, projects…" rows={2}
                style={{ ...inp(),resize:"none",lineHeight:1.5 }}
                onFocus={e=>e.target.style.borderColor=c.accent}
                onBlur={e=>e.target.style.borderColor=c.border}/>
              <div style={{ position:"absolute",bottom:8,right:9,fontSize:10,color:c.textFaint,fontFamily:"'DM Mono',monospace",pointerEvents:"none" }}>⏎</div>
            </div>
            <button onClick={send} disabled={loading||!input.trim()}
              style={{ background:loading||!input.trim()?c.sbDis:"#0077EE",border:"none",borderRadius:9,padding:0,width:42,height:42,color:loading||!input.trim()?c.sbDisTx:"#fff",cursor:loading||!input.trim()?"not-allowed":"pointer",fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s",flexShrink:0 }}
              onMouseOver={e=>{if(!loading&&input.trim())e.currentTarget.style.background="#009FFF"}}
              onMouseOut={e=>{if(!loading&&input.trim())e.currentTarget.style.background="#0077EE"}}>→</button>
          </div>
          <div style={{ padding:"7px 14px",background:c.bgChatPwrd,borderTop:`1px solid ${c.borderFaint}`,textAlign:"center",flexShrink:0 }}>
            <span style={{ fontSize:10,color:c.textFaint,fontFamily:"'DM Mono',monospace",letterSpacing:"0.06em" }}>powered by claude · anthropic</span>
          </div>
        </div>
      )}

      {/* ── FAB ── */}
      <div style={{ position:"fixed",bottom:isMobile?20:20,right:20,zIndex:201,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:9 }}>
        {!chatOpen && !isMobile && (
          <div style={{ background:c.fabTipBg,border:`1px solid ${c.fabTipBd}`,borderRadius:10,padding:"6px 13px",fontSize:12,color:c.pillText,fontFamily:"'DM Mono',monospace",whiteSpace:"nowrap",boxShadow:"0 4px 18px rgba(0,0,0,0.18)",animation:"fadeSlide 0.3s ease" }}>
            ✦ Ask me anything
          </div>
        )}
        {!chatOpen && (
          <button className="fab" onClick={() => setChatOpen(o=>!o)}>
            <span style={{ fontSize:20 }}>✦</span>
            <span className="fab-badge"/>
          </button>
        )}
      </div>
    </div>
  );
}