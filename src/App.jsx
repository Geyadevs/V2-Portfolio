import { useState, useRef, useEffect } from "react";
import PHOTO1 from "./assets/ID.png";
import PHOTO2 from "./assets/Id-2.png";

// ── Data ──────────────────────────────────────────────────────────────────────
const EXPERIENCES = [
  { role:"Senior Frontend Developer", company:"TechCorp Solutions", period:"2022 – Present", location:"Remote",
    highlights:["Architected a design system adopted across 12 product teams, reducing UI development time by 40%.","Led a full migration from jQuery to React + TypeScript, boosting performance scores by 65%.","Mentored 5 junior developers through code reviews and pair programming sessions.","Shipped 8 major product features with 99.9% uptime across all deployments."],
    tech:["React","TypeScript","GraphQL","Storybook"] },
  { role:"Frontend Developer", company:"Pixel & Code Agency", period:"2020 – 2021", location:"Manila, PH",
    highlights:["Delivered 20+ responsive client websites from wireframe to production deployment.","Improved average Lighthouse scores from 55 to 92 across all client projects.","Introduced CI/CD pipelines with GitHub Actions, reducing deploy time by 70%.","Integrated RESTful APIs and third-party services for e-commerce platforms."],
    tech:["Vue.js","Nuxt","SCSS","Vercel"] },
  { role:"UI Developer Intern", company:"StartupLab Inc.", period:"2019 – 2020", location:"Cagayan de Oro, PH",
    highlights:["Built a reusable React component library used across the company's main SaaS product.","Assisted in redesigning the onboarding flow, reducing user drop-off by 28%.","Achieved 80% test coverage with Jest and React Testing Library."],
    tech:["React","CSS Modules","Jest","Figma"] },
];

const PROJECTS = [
  { title:"KJK Jewelry",  desc:"A full-featured design system platform with live component preview, token management, and multi-theme export. Used by 3 enterprise clients.", tech:["React","Storybook"], color:"#00C2FF", icon:"◈" },
  { title:"MagkahiOSA",   desc:"High-performance e-commerce storefront with SSR, dynamic product filtering, cart logic, and Stripe checkout. Scores 97/100 on Lighthouse.",   tech:["Next.js","Stripe"],   color:"#7B61FF", icon:"◉" },
  { title:"Heartland Antlers", desc:"Real-time analytics dashboard with customizable widget grid, WebSocket data feeds, and CSV export. Built for a fintech startup.",              tech:["Vue.js","D3.js"],     color:"#00E5A0", icon:"◎" },
  { title:"Bootzie", desc:"Open-source drag-and-drop automation builder with conditional logic, webhook triggers, and a visual node editor using React Flow.",           tech:["React Flow","Node.js"],color:"#FF6B6B", icon:"◆" },
];

const SKILL_GROUPS = [
  { label:"Languages & Frameworks", items:["JavaScript","PHP","React","React-Native","Typescript", "Laravel"] },
  { label:"Styling & Design",       items:["Tailwind CSS","SCSS","Framer Motion","Figma", "Bootstrap"] },
  { label:"Tools & Workflow",       items:["Git","Vite","Vercel", "Nodejs", "MySQL", "Supabase"] },
  { label:"CMS & Automation",       items:["Wordpress","Shopify", "Wix", "Squarespace", "WebFlow", "Klaviyo", "GoHighLevel", "MailChimp"] },
];

const ALL_SKILLS = SKILL_GROUPS.flatMap(g => g.items);

// ── Inline SVG icons ──────────────────────────────────────────────────────────
const TECH_ICONS = {
  "JavaScript":   <svg viewBox="0 0 32 32" width="14" height="14"><rect width="32" height="32" rx="4" fill="#F7DF1E"/><path d="M9.5 25.5l2.3-1.4c.4.8.8 1.4 1.7 1.4.9 0 1.4-.3 1.4-1.7V16h2.8v7.9c0 2.7-1.6 4-3.9 4-2.1 0-3.3-1.1-3.9-2.4zm8.2-.3l2.3-1.4c.6 1 1.4 1.8 2.8 1.8 1.2 0 1.9-.6 1.9-1.4 0-1-.7-1.3-2-1.9l-.7-.3c-2-.8-3.3-1.9-3.3-4.1 0-2 1.5-3.6 3.9-3.6 1.7 0 2.9.6 3.8 2.1l-2.2 1.4c-.5-.8-1.6-.8-1.6.3 0 .8.5 1.1 1.6 1.6l.7.3c2.3 1 3.6 2 3.6 4.3 0 2.4-1.9 3.8-4.5 3.8-2.5 0-4.1-1.2-4.9-2.9z" fill="#000"/></svg>,
  "TypeScript":   <svg viewBox="0 0 32 32" width="14" height="14"><rect width="32" height="32" rx="4" fill="#3178C6"/><path d="M18 18.9v2.3c.4.2.8.3 1.3.4.5.1 1 .1 1.5.1.5 0 1 0 1.4-.1.4-.1.8-.3 1.1-.5.3-.2.6-.5.8-.9.2-.4.3-.8.3-1.3 0-.4 0-.7-.1-1-.1-.3-.2-.5-.4-.7-.2-.2-.4-.4-.7-.5-.3-.1-.6-.3-1-.4l-.8-.3c-.2-.1-.4-.1-.5-.2-.1-.1-.2-.1-.3-.2-.1-.1-.1-.2-.1-.3 0-.1 0-.2.1-.3.1-.1.1-.2.2-.2.1-.1.2-.1.4-.1.1 0 .3 0 .4.1.4.1.8.4 1.1.8l1.5-1.5c-.4-.5-.9-.8-1.5-1-.5-.2-1.1-.3-1.8-.3-.5 0-.9.1-1.3.2-.4.1-.7.3-1 .6-.3.2-.5.5-.6.9-.1.4-.2.7-.2 1.1 0 .6.2 1.1.5 1.5.3.4.8.7 1.5.9l.9.3c.3.1.5.2.7.3.2.1.3.2.3.3.1.1.1.2.1.4 0 .1 0 .3-.1.4-.1.1-.2.2-.3.3-.1.1-.3.1-.4.1-.2 0-.3 0-.5-.1-.4-.1-.7-.3-1.1-.6-.2-.2-.4-.4-.5-.6zm-4.5-5.5H9v2h3.2V25h2.3V15.4H17.5v-2H13.5z" fill="#fff"/></svg>,
  "React":        <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#222"/><circle cx="16" cy="16" r="3.1" fill="#61DAFB"/><ellipse cx="16" cy="16" rx="12" ry="4.5" fill="none" stroke="#61DAFB" strokeWidth="1.3"/><ellipse cx="16" cy="16" rx="12" ry="4.5" fill="none" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="12" ry="4.5" fill="none" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(120 16 16)"/></svg>,
  "Vue.js":       <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#1a1a2e"/><polygon points="16,6 25,6 16,22 7,6" fill="#42B883"/><polygon points="16,6 21.5,6 16,15.5 10.5,6" fill="#35495E"/></svg>,
  "Next.js":      <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#000"/><path d="M19.5 21.5l-7.5-11v11h-2V10h3l7 10.2V10h2v11.5z" fill="#fff"/></svg>,
  "Tailwind CSS": <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#0F172A"/><path d="M16 10c-2.2 0-3.6 1.1-4.2 3.3.8-1.1 1.8-1.5 2.8-1.2.6.2 1 .6 1.5 1.1.8.8 1.7 1.8 3.6 1.8 2.2 0 3.6-1.1 4.2-3.3-.8 1.1-1.8 1.5-2.8 1.2-.6-.2-1-.6-1.5-1.1C18.8 11 17.9 10 16 10zm-4.2 6.7c-2.2 0-3.6 1.1-4.2 3.3.8-1.1 1.8-1.5 2.8-1.2.6.2 1 .6 1.5 1.1.8.8 1.7 1.8 3.6 1.8 2.2 0 3.6-1.1 4.2-3.3-.8 1.1-1.8 1.5-2.8 1.2-.6-.2-1-.6-1.5-1.1-.8-.8-1.7-1.8-3.6-1.8z" fill="#38BDF8"/></svg>,
  "Figma":        <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#1E1E1E"/><rect x="11" y="7" width="5" height="5" rx="2.5" fill="#FF7262"/><rect x="16" y="7" width="5" height="5" rx="2.5" fill="#F24E1E"/><rect x="11" y="12" width="5" height="5" rx="2.5" fill="#A259FF"/><circle cx="18.5" cy="14.5" r="2.5" fill="#1ABCFE"/><rect x="11" y="17" width="5" height="5" rx="2.5" fill="#0ACF83"/></svg>,
  "Storybook":    <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#FF4785"/><path d="M20 8h-8l-.5 5 2-.5c.3-.8 1-1.3 1.8-1.3.9 0 1.6.7 1.7 1.6L19 13h1V8zm-2 12c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" fill="#fff"/><rect x="12" y="12" width="8" height="8" rx="1" fill="none" stroke="#fff" strokeWidth="1.5"/></svg>,
  "SCSS":         <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#CC6699"/><path d="M10 19.5c.3.2.6.3 1 .3.7 0 1.3-.5 1.3-1.2 0-.6-.3-1-.9-1.3-.5-.3-.7-.4-.7-.7 0-.2.2-.4.5-.4.3 0 .5.1.7.3l.4-.7c-.3-.2-.7-.4-1.1-.4-.8 0-1.3.5-1.3 1.2 0 .7.4 1 .9 1.3.4.2.7.4.7.7 0 .3-.2.5-.6.5-.3 0-.6-.2-.8-.4l-.4.8zm4-5.5h-1l-.8 4.3c-.1.3-.2.5-.5.5l-.3-.1-.2.8c.2.1.4.1.6.1.8 0 1.2-.4 1.4-1.3L14 14zm5.5-1.5c-.2-.1-.5-.2-.8-.2-1.2 0-2 1.1-2 2.5 0 1 .5 1.8 1.5 1.8.3 0 .6-.1.8-.3l-.1.2h1l.9-4.7h-1l-.3.7zm-.4 2.7c-.2.5-.6.8-1 .8-.4 0-.6-.3-.6-.8 0-.9.4-1.7 1-1.7.2 0 .4.1.5.2l-.3 1.5z" fill="#fff"/></svg>,
  "Framer Motion":<svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#0055FF"/><path d="M9 8h14v7H16l7 7H9v-7h7L9 8z" fill="#fff"/></svg>,
  "Wordpress":    <svg width="14" height="14" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="#028CB0"/><path d="M6.45538 16C6.45538 19.7823 8.65538 23.04 11.8369 24.5885L7.28462 12.1162C6.73798 13.338 6.45541 14.6615 6.45538 16ZM16 25.5446C17.1085 25.5446 18.1746 25.35 19.1731 25.0031L19.1054 24.8762L16.1692 16.8377L13.3092 25.1554C14.1554 25.4092 15.0608 25.5446 16 25.5446ZM17.3115 11.5238L20.7638 21.7877L21.72 18.6062C22.1262 17.2862 22.4392 16.3385 22.4392 15.5177C22.4392 14.3331 22.0162 13.5208 21.6608 12.8946C21.17 12.0992 20.7215 11.4308 20.7215 10.6523C20.7215 9.77231 21.3815 8.96 22.3292 8.96H22.4477C20.689 7.34546 18.3874 6.45141 16 6.45538C14.4192 6.45509 12.8632 6.84777 11.4718 7.59809C10.0805 8.34842 8.89746 9.43285 8.02923 10.7538L8.63846 10.7708C9.63692 10.7708 11.1769 10.6438 11.1769 10.6438C11.7015 10.6185 11.7608 11.3715 11.2446 11.4308C11.2446 11.4308 10.7285 11.4985 10.1446 11.5238L13.6308 21.8638L15.7208 15.6023L14.2315 11.5238C13.898 11.5054 13.565 11.4772 13.2331 11.4392C12.7169 11.4054 12.7762 10.6185 13.2923 10.6438C13.2923 10.6438 14.8662 10.7708 15.8054 10.7708C16.8038 10.7708 18.3438 10.6438 18.3438 10.6438C18.86 10.6185 18.9277 11.3715 18.4115 11.4308C18.4115 11.4308 17.8954 11.49 17.3115 11.5238ZM20.7977 24.25C22.2416 23.4104 23.4399 22.2066 24.2729 20.7589C25.1059 19.3112 25.5444 17.6703 25.5446 16C25.5446 14.3415 25.1215 12.7846 24.3769 11.4223C24.5281 12.9211 24.3012 14.4339 23.7169 15.8223L20.7977 24.25ZM16 27C13.0826 27 10.2847 25.8411 8.22183 23.7782C6.15893 21.7153 5 18.9174 5 16C5 13.0826 6.15893 10.2847 8.22183 8.22183C10.2847 6.15893 13.0826 5 16 5C18.9174 5 21.7153 6.15893 23.7782 8.22183C25.8411 10.2847 27 13.0826 27 16C27 18.9174 25.8411 21.7153 23.7782 23.7782C21.7153 25.8411 18.9174 27 16 27Z" fill="white"/></svg>,
  "Cypress":      <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#1B1E2E"/><circle cx="16" cy="16" r="7" fill="none" stroke="#69D3A7" strokeWidth="2"/><circle cx="16" cy="16" r="2.5" fill="#69D3A7"/><line x1="16" y1="7" x2="16" y2="9" stroke="#69D3A7" strokeWidth="2" strokeLinecap="round"/><line x1="16" y1="23" x2="16" y2="25" stroke="#69D3A7" strokeWidth="2" strokeLinecap="round"/><line x1="7" y1="16" x2="9" y2="16" stroke="#69D3A7" strokeWidth="2" strokeLinecap="round"/><line x1="23" y1="16" x2="25" y2="16" stroke="#69D3A7" strokeWidth="2" strokeLinecap="round"/></svg>,
  "Git":          <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#F05033"/><path d="M27 15l-10-10-1.4 1.4 3.8 3.8-6.7 6.7-3.8-3.8L7.5 14.5l10 10 1.4-1.4-4.1-4.1 6.7-6.7 4.1 4.1L27 15z" fill="#fff"/></svg>,
  "Vite":         <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#1a1a2e"/><polygon points="16,6 27,25 5,25" fill="none" stroke="#646CFF" strokeWidth="2"/><polygon points="16,10 23,23 9,23" fill="#FFA500" opacity="0.9"/></svg>,
  "Vercel":       <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#000"/><polygon points="16,9 27,23 5,23" fill="#fff"/></svg>,
  "WCAG / a11y":  <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#005A9C"/><circle cx="16" cy="10" r="2.5" fill="#fff"/><path d="M10 13h12M16 15v9M12 24l4-9 4 9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none"/></svg>,
  "Nuxt":         <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#00DC82"/><path d="M8 22h4.5l-4-7 6.5-11 6.5 11H25l-8-13.5z" fill="#fff"/></svg>,
  "CSS Modules":  <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#1572B6"/><path d="M8 8l1.5 14 6.5 2 6.5-2L24 8H8zm13 3H11l.2 2.5h9.4l-.7 7-4 1.1-4-1.1-.3-3h2.4l.1 1.5 1.8.5 1.8-.5.2-2.5H10.6l-.5-5.5h11.8z" fill="#fff"/></svg>,
  "GraphQL":      <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#E10098"/><circle cx="16" cy="8" r="2" fill="#fff"/><circle cx="16" cy="24" r="2" fill="#fff"/><circle cx="8" cy="12" r="2" fill="#fff"/><circle cx="24" cy="12" r="2" fill="#fff"/><circle cx="8" cy="20" r="2" fill="#fff"/><circle cx="24" cy="20" r="2" fill="#fff"/><polygon points="16,8 24,12 24,20 16,24 8,20 8,12" fill="none" stroke="#fff" strokeWidth="1.2"/></svg>,
  "D3.js":        <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#F9A03C"/><path d="M10 22c0-4 2-7 6-8-2-1-3-3-3-5h2c0 2 1.5 3.5 3.5 3.5S22 11 22 9h2c0 2-1 4-3 5 4 1 6 4 6 8H10z" fill="#fff"/></svg>,
  "React Flow":   <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#1a1a2e"/><circle cx="9" cy="16" r="3" fill="none" stroke="#61DAFB" strokeWidth="1.5"/><circle cx="23" cy="10" r="3" fill="none" stroke="#61DAFB" strokeWidth="1.5"/><circle cx="23" cy="22" r="3" fill="none" stroke="#61DAFB" strokeWidth="1.5"/><line x1="12" y1="15" x2="20" y2="11" stroke="#61DAFB" strokeWidth="1.2"/><line x1="12" y1="17" x2="20" y2="21" stroke="#61DAFB" strokeWidth="1.2"/></svg>,
  "Node.js":      <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#339933"/><path d="M16 7l9 5v8l-9 5-9-5v-8l9-5z" fill="none" stroke="#fff" strokeWidth="1.5"/></svg>,
  "Stripe":       <svg viewBox="0 0 32 32" width="14" height="14"><circle cx="16" cy="16" r="16" fill="#635BFF"/><path d="M14.5 13.3c0-.7.6-1 1.5-1 1.4 0 2.8.4 4 1.1v-3.7c-1.3-.5-2.6-.8-4-.8-3.3 0-5.5 1.7-5.5 4.6 0 4.5 6.2 3.8 6.2 5.7 0 .8-.7 1.1-1.7 1.1-1.5 0-3.4-.6-4.8-1.5v3.8c1.6.7 3.3 1 4.8 1 3.4 0 5.7-1.7 5.7-4.6-.1-4.8-6.2-4-6.2-5.7z" fill="#fff"/></svg>,
  "default":      <svg viewBox="0 0 14 14" width="14" height="14"><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="7" cy="7" r="2.2" fill="currentColor"/></svg>,
};

// ── Photos ────────────────────────────────────────────────────────────────────
const PHOTO_1 = PHOTO1;
const PHOTO_2 = PHOTO2;

// ── AI ────────────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an AI assistant embedded in a frontend developer portfolio. Answer concisely and naturally.
DEVELOPER: [Your Name] — Senior Frontend Developer, 6+ years, Philippines.
ABOUT: Bridges design & engineering. Known for design systems, performance, mentoring, open-source.
EXPERIENCE: TechCorp Solutions (2022–Present) · Pixel & Code Agency (2020–2021) · StartupLab Inc. (2019–2020)
SKILLS: JavaScript, TypeScript, React, Vue.js, Next.js, Tailwind CSS, Figma, Storybook, SCSS, Framer Motion, Jest, Cypress, Git, Vite, Vercel, WCAG
PROJECTS: DesignOS, Kartify, DataPulse, FlowForge
CONTACT: hello@yourname.dev | github.com/yourname | linkedin.com/in/yourname
Keep answers short, friendly, helpful. Max 3 sentences.`;

const INIT_MSGS = [{ role:"assistant", content:"Hi! I'm an AI trained on this portfolio. Ask me anything — experience, skills, availability, or projects." }];

// ── Themes ────────────────────────────────────────────────────────────────────
const DARK = {
  bg:"#030D1A", bgSection:"transparent", bgCard:"rgba(5,18,38,0.75)",
  bgInput:"rgba(3,14,30,0.95)", bgChatPanel:"rgba(3,12,26,0.98)",
  bgChatHdr:"rgba(3,18,42,0.97)", bgChatInput:"rgba(3,14,32,0.7)",
  bgChatPwrd:"rgba(2,10,22,0.8)", bgAboutTag:"rgba(0,120,238,0.09)",
  bgSkillGroup:"rgba(5,18,38,0.6)",
  border:"rgba(0,100,200,0.2)", borderAccent:"rgba(0,120,238,0.35)",
  borderFaint:"rgba(0,100,200,0.1)", borderChat:"rgba(0,100,200,0.15)",
  navBg:"rgba(3,13,26,0.92)", navBorder:"rgba(0,100,200,0.12)",
  text:"#D4EAFF", textSub:"#7AAAC0", textMuted:"#4A7090", textFaint:"#2A4A68",
  accent:"#00C2FF", accentDim:"#0077EE",
  glowA:"rgba(0,100,220,0.09)", glowB:"rgba(0,80,200,0.1)", gridLine:"rgba(0,100,200,0.035)",
  pill:"rgba(0,120,238,0.12)", pillText:"#4AB4FF", pillBorder:"rgba(0,180,255,0.2)",
  projBorder:"rgba(0,100,200,0.2)", projHov:"rgba(0,194,255,0.4)",
  expActBg:"rgba(0,194,255,0.07)", expHovBg:"rgba(0,120,238,0.04)", expTabBd:"rgba(0,100,200,0.2)",
  chatU:"rgba(0,100,200,0.22)", chatUBd:"rgba(0,180,255,0.25)", chatUTx:"#B8DCFF",
  chatA:"rgba(3,18,38,0.9)",    chatABd:"rgba(0,100,200,0.22)", chatATx:"#90B8D8",
  scrollThumb:"#0077EE", scrollTrack:"#030D1A",
  sbDis:"#0A1E35", sbDisTx:"#2A4A68",
  availBg:"rgba(0,194,80,0.07)", availBd:"rgba(0,220,100,0.2)", availTx:"#00E57A", availSubTx:"#3A6050",
  socialBd:"rgba(0,100,200,0.08)", divider:"rgba(0,100,200,0.1)",
  fabTipBg:"rgba(3,14,32,0.96)", fabTipBd:"rgba(0,120,238,0.3)",
  sectionTag:"#0077EE", statNum:"#00C2FF", statLbl:"#3A6280",
  footerTx:"#2A4A68", footerTx2:"#1A3050",
  quoteColor:"#5A88A8", aboutTagBd:"rgba(0,180,255,0.18)",
  toggleBg:"rgba(3,14,32,0.9)", toggleBd:"rgba(0,120,238,0.3)", toggleTx:"#4AB4FF",
  dotBg:"#0077EE",
  photoRing:"rgba(0,194,255,0.5)", photoRing2:"rgba(0,194,255,0.14)",
  photoGlow:"rgba(0,194,255,0.28)", photoBadgeBg:"#00C2FF", photoBadgeTx:"#030D1A",
  mobileMenuBg:"rgba(3,10,22,0.99)",
  heroAccentLine:"rgba(0,194,255,0.15)",
};

const LIGHT = {
  bg:"#EEF4FF", bgSection:"transparent", bgCard:"rgba(255,255,255,0.92)",
  bgInput:"rgba(240,246,255,0.98)", bgChatPanel:"rgba(255,255,255,0.99)",
  bgChatHdr:"rgba(235,244,255,0.99)", bgChatInput:"rgba(238,246,255,0.85)",
  bgChatPwrd:"rgba(220,233,255,0.6)", bgAboutTag:"rgba(0,100,220,0.06)",
  bgSkillGroup:"rgba(255,255,255,0.7)",
  border:"rgba(0,80,180,0.13)", borderAccent:"rgba(0,100,220,0.28)",
  borderFaint:"rgba(0,80,180,0.09)", borderChat:"rgba(0,80,180,0.12)",
  navBg:"rgba(238,244,255,0.95)", navBorder:"rgba(0,80,180,0.1)",
  text:"#0A1E36", textSub:"#2A5080", textMuted:"#4A6A90", textFaint:"#7A9ABE",
  accent:"#0055CC", accentDim:"#0044AA",
  glowA:"rgba(0,100,220,0.07)", glowB:"rgba(0,80,200,0.07)", gridLine:"rgba(0,80,200,0.025)",
  pill:"rgba(0,100,220,0.08)", pillText:"#0044BB", pillBorder:"rgba(0,100,220,0.2)",
  projBorder:"rgba(0,80,180,0.12)", projHov:"rgba(0,120,240,0.35)",
  expActBg:"rgba(0,100,220,0.08)", expHovBg:"rgba(0,100,220,0.04)", expTabBd:"rgba(0,80,180,0.15)",
  chatU:"rgba(0,90,200,0.11)", chatUBd:"rgba(0,120,240,0.2)", chatUTx:"#002A6A",
  chatA:"rgba(240,246,255,0.97)", chatABd:"rgba(0,80,180,0.14)", chatATx:"#1E4A78",
  scrollThumb:"#0077EE", scrollTrack:"#E4EEF8",
  sbDis:"#C8D8F0", sbDisTx:"#8AAAC8",
  availBg:"rgba(0,180,80,0.06)", availBd:"rgba(0,180,80,0.18)", availTx:"#007040", availSubTx:"#3A6A50",
  socialBd:"rgba(0,80,180,0.07)", divider:"rgba(0,80,180,0.08)",
  fabTipBg:"rgba(255,255,255,0.99)", fabTipBd:"rgba(0,100,220,0.22)",
  sectionTag:"#0044AA", statNum:"#0055CC", statLbl:"#5A7A9A",
  footerTx:"#8AAAC0", footerTx2:"#A0BAD0",
  quoteColor:"#4A6A8A", aboutTagBd:"rgba(0,100,220,0.15)",
  toggleBg:"rgba(255,255,255,0.95)", toggleBd:"rgba(0,100,220,0.2)", toggleTx:"#0044BB",
  dotBg:"#0077EE",
  photoRing:"rgba(0,100,220,0.4)", photoRing2:"rgba(0,100,220,0.1)",
  photoGlow:"rgba(0,100,220,0.18)", photoBadgeBg:"#0055CC", photoBadgeTx:"#ffffff",
  mobileMenuBg:"rgba(240,246,255,0.99)",
  heroAccentLine:"rgba(0,100,220,0.12)",
};

// ── EmailJS config — fill these in after creating your EmailJS account ────────
// Step-by-step setup instructions are in the comments below.
const EMAILJS_SERVICE_ID  = "service_tpsnjnk";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_96k1d6u";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "x_nfdoeiDYkAGrRU1";   // e.g. "AbCdEfGhIjKlMnOp"
/*
  HOW TO SET UP EMAILJS (free, takes ~5 minutes):
  1. Go to https://www.emailjs.com and create a free account
  2. Dashboard → Email Services → Add New Service → choose Gmail → connect geyadevs@gmail.com
     Copy the Service ID → paste into EMAILJS_SERVICE_ID above
  3. Dashboard → Email Templates → Create New Template
     In the template body use these variables:
       From: {{from_name}} <{{from_email}}>
       Subject: {{subject}}
       Message: {{message}}
     Set "To email" to: geyadevs@gmail.com
     Copy the Template ID → paste into EMAILJS_TEMPLATE_ID above
  4. Dashboard → Account → Public Key
     Copy it → paste into EMAILJS_PUBLIC_KEY above
  5. Done — every form submission will land in geyadevs@gmail.com
*/

// ── Contact Form Component ────────────────────────────────────────────────────
function ContactForm({ c, isMobile, inp, card }) {
  const [form, setForm]       = useState({ name:"", email:"", subject:"", message:"" });
  const [status, setStatus]   = useState("idle"); // idle | sending | success | error
  const [touched, setTouched] = useState({});

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));
  const touch  = (field)      => setTouched(t => ({ ...t, [field]: true }));

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const errors = {
    name:    !form.name.trim()           ? "Name is required"           : null,
    email:   !form.email.trim()          ? "Email is required"
           : !isValidEmail(form.email)   ? "Enter a valid email"        : null,
    subject: !form.subject.trim()        ? "Subject is required"        : null,
    message: !form.message.trim()        ? "Message is required"        : null,
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = async () => {
    // Touch all fields to reveal any hidden errors
    setTouched({ name:true, email:true, subject:true, message:true });
    if (hasErrors) return;
    setStatus("sending");

    try {
      // Load EmailJS SDK from CDN if not already loaded
      if (!window.emailjs) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  form.name.trim(),
        from_email: form.email.trim(),
        subject:    form.subject.trim(),
        message:    form.message.trim(),
        to_email:   "geyadevs@gmail.com",
      });

      setStatus("success");
      setForm({ name:"", email:"", subject:"", message:"" });
      setTouched({});
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const fieldStyle = (field) => ({
    ...inp(),
    borderColor: touched[field] && errors[field]
      ? "#FF6B6B"
      : c.border,
  });

  return (
    <div style={{ ...card({ padding:isMobile?"28px 24px":"40px 44px" }) }}>

      {/* Success state */}
      {status === "success" ? (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:280, gap:20, textAlign:"center" }}>
          <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(0,229,122,0.12)", border:"2px solid rgba(0,229,122,0.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>✓</div>
          <div>
            <div style={{ fontSize:20, fontWeight:700, fontFamily:"'Syne',sans-serif", color:c.text, marginBottom:8 }}>Message sent!</div>
            <div style={{ fontSize:14, color:c.textSub, lineHeight:1.7 }}>Thanks for reaching out. I'll get back to you at <span style={{ color:c.accent }}>{form.email||"your email"}</span> soon.</div>
          </div>
          <button className="glow-btn" style={{ marginTop:8 }} onClick={() => setStatus("idle")}>Send another →</button>
        </div>
      ) : (
        <>
          {/* Name + Email */}
          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:14, marginBottom:14 }}>
            <div>
              <input
                placeholder="Your name"
                value={form.name}
                onChange={e => update("name", e.target.value)}
                onFocus={e => e.target.style.borderColor=c.accent}
                onBlur={e => { touch("name"); e.target.style.borderColor = touched.name && errors.name ? "#FF6B6B" : c.border; }}
                style={fieldStyle("name")}
              />
              {touched.name && errors.name && <div style={{ fontSize:11, color:"#FF6B6B", marginTop:5, fontFamily:"'DM Mono',monospace" }}>{errors.name}</div>}
            </div>
            <div>
              <input
                placeholder="Your email"
                type="email"
                value={form.email}
                onChange={e => update("email", e.target.value)}
                onFocus={e => e.target.style.borderColor=c.accent}
                onBlur={e => { touch("email"); e.target.style.borderColor = touched.email && errors.email ? "#FF6B6B" : c.border; }}
                style={fieldStyle("email")}
              />
              {touched.email && errors.email && <div style={{ fontSize:11, color:"#FF6B6B", marginTop:5, fontFamily:"'DM Mono',monospace" }}>{errors.email}</div>}
            </div>
          </div>

          {/* Subject */}
          <div style={{ marginBottom:14 }}>
            <input
              placeholder="Subject"
              value={form.subject}
              onChange={e => update("subject", e.target.value)}
              onFocus={e => e.target.style.borderColor=c.accent}
              onBlur={e => { touch("subject"); e.target.style.borderColor = touched.subject && errors.subject ? "#FF6B6B" : c.border; }}
              style={{ ...fieldStyle("subject"), display:"block" }}
            />
            {touched.subject && errors.subject && <div style={{ fontSize:11, color:"#FF6B6B", marginTop:5, fontFamily:"'DM Mono',monospace" }}>{errors.subject}</div>}
          </div>

          {/* Message */}
          <div style={{ marginBottom:20 }}>
            <textarea
              placeholder="Tell me about your project…"
              rows={5}
              value={form.message}
              onChange={e => update("message", e.target.value)}
              onFocus={e => e.target.style.borderColor=c.accent}
              onBlur={e => { touch("message"); e.target.style.borderColor = touched.message && errors.message ? "#FF6B6B" : c.border; }}
              style={{ ...fieldStyle("message"), resize:"vertical", display:"block", lineHeight:1.7 }}
            />
            {touched.message && errors.message && <div style={{ fontSize:11, color:"#FF6B6B", marginTop:5, fontFamily:"'DM Mono',monospace" }}>{errors.message}</div>}
          </div>

          {/* Error banner */}
          {status === "error" && (
            <div style={{ marginBottom:14, padding:"12px 16px", borderRadius:10, background:"rgba(255,107,107,0.1)", border:"1px solid rgba(255,107,107,0.3)", fontSize:13, color:"#FF8A8A", fontFamily:"'DM Mono',monospace", lineHeight:1.6 }}>
              Something went wrong. Please check your EmailJS credentials or try again.
            </div>
          )}

          {/* Submit button */}
          <button
            className="glow-btn"
            style={{ width:"100%", padding:"15px", fontSize:15, opacity: status==="sending" ? 0.7 : 1, cursor: status==="sending" ? "not-allowed" : "pointer" }}
            onClick={handleSubmit}
            disabled={status === "sending"}
          >
            {status === "sending"
              ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                  <span style={{ display:"inline-block", width:14, height:14, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>
                  Sending…
                </span>
              : "Send Message →"
            }
          </button>

          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024 };
}

// ── Component ─────────────────────────────────────────────────────────────────
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
  const [showTop, setShowTop]       = useState(false);
  const chatEndRef = useRef(null);
  const c = dark ? DARK : LIGHT;
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);
  useEffect(() => {
    const fn = (e) => { setGlowX((e.clientX/window.innerWidth)*100); setGlowY((e.clientY/window.innerHeight)*100); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

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

  const px     = isMobile ? "20px" : isTablet ? "40px" : "72px";
  const maxW   = "1100px";
  const sec    = (extra={}) => ({ padding:`96px ${px}`, maxWidth:maxW, margin:"0 auto", ...extra });
  const card   = (ex={}) => ({ background:c.bgCard, border:`1px solid ${c.border}`, borderRadius:20, ...ex });
  const tag    = (mb=10)  => ({ fontSize:11, color:c.sectionTag, letterSpacing:"0.2em", textTransform:"uppercase", fontFamily:"'DM Mono',monospace", marginBottom:mb, display:"block" });
  const hd     = (sz=42)  => ({ fontSize:isMobile?Math.round(sz*0.72):isTablet?Math.round(sz*0.88):sz, fontWeight:800, fontFamily:"'Syne',sans-serif", lineHeight:1.08, color:c.text, letterSpacing:"-0.02em" });
  const Pill   = ({ label }) => (
    <span style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"5px 13px 5px 8px", borderRadius:20, fontSize:12, background:c.pill, color:c.pillText, border:`1px solid ${c.pillBorder}`, margin:"4px 3px", fontFamily:"'DM Mono',monospace", verticalAlign:"middle", lineHeight:1 }}>
      <span style={{ display:"flex", alignItems:"center", flexShrink:0 }}>{TECH_ICONS[label]||TECH_ICONS["default"]}</span>
      {label}
    </span>
  );
  const inp = () => ({ background:c.bgInput, border:`1px solid ${c.border}`, borderRadius:10, padding:"13px 16px", fontSize:14, color:c.text, outline:"none", fontFamily:"'DM Mono',monospace", width:"100%", transition:"border-color 0.2s" });

  // Sync html + body bg with theme so browser chrome matches seamlessly
  useEffect(() => {
    document.documentElement.style.background = c.bg;
    document.documentElement.style.transition = "background 0.3s";
    document.body.style.background = c.bg;
    document.body.style.transition = "background 0.3s";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    return () => {
      document.documentElement.style.background = "";
      document.body.style.background = "";
    };
  }, [c.bg]);

  return (
    <div style={{ fontFamily:"'DM Mono','Fira Code',monospace", background:c.bg, color:c.text, overflowX:"hidden", transition:"background 0.3s,color 0.3s", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html,body{margin:0;padding:0;background:${c.bg};transition:background 0.3s;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:${c.scrollTrack};}
        ::-webkit-scrollbar-thumb{background:${c.scrollThumb};border-radius:2px;}

        .glow-btn{background:linear-gradient(135deg,#004CBB,#0088FF);color:#fff;border:none;border-radius:10px;padding:13px 28px;font-size:14px;font-weight:500;cursor:pointer;font-family:'DM Mono',monospace;letter-spacing:0.04em;transition:all 0.2s;white-space:nowrap;}
        .glow-btn:hover{box-shadow:0 0 28px rgba(0,120,255,0.5);transform:translateY(-2px);}
        .out-btn{background:transparent;color:${c.accent};border:1px solid ${c.borderAccent};border-radius:10px;padding:13px 28px;font-size:14px;font-weight:500;cursor:pointer;font-family:'DM Mono',monospace;transition:all 0.2s;white-space:nowrap;}
        .out-btn:hover{background:${dark?"rgba(0,194,255,0.07)":"rgba(0,100,220,0.06)"};}

        .fab{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#004CBB,#00AAFF);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:22px;color:#fff;box-shadow:0 4px 28px rgba(0,120,255,0.45);transition:transform 0.2s,box-shadow 0.2s;position:relative;}
        .fab:hover{transform:scale(1.08);box-shadow:0 8px 36px rgba(0,150,255,0.6);}
        .fab-badge{position:absolute;top:-3px;right:-3px;width:14px;height:14px;border-radius:50%;background:#00E57A;border:2px solid ${c.bg};animation:pls 2s infinite;}

        .proj-card{background:${c.bgCard};border:1px solid ${c.projBorder};border-radius:18px;padding:32px;transition:all 0.3s;cursor:default;}
        .proj-card:hover{border-color:${c.projHov};transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,120,255,0.1);}

        .exp-tab{width:100%;text-align:left;background:none;border:none;border-left:2px solid ${c.expTabBd};padding:14px 20px;color:${c.textMuted};font-size:13px;cursor:pointer;transition:all 0.2s;font-family:'DM Mono',monospace;line-height:1.5;}
        .exp-tab:hover{color:${c.pillText};background:${c.expHovBg};border-left-color:rgba(0,180,255,0.4);}
        .exp-tab.active{color:${c.accent};border-left-color:${c.accent};background:${c.expActBg};}
        .exp-tab-h{background:none;border:none;border-bottom:2px solid ${c.expTabBd};padding:10px 16px;color:${c.textMuted};font-size:12px;cursor:pointer;transition:all 0.2s;font-family:'DM Mono',monospace;white-space:nowrap;flex-shrink:0;}
        .exp-tab-h.active{color:${c.accent};border-bottom-color:${c.accent};}

        .grid-bg{background-image:linear-gradient(${c.gridLine} 1px,transparent 1px),linear-gradient(90deg,${c.gridLine} 1px,transparent 1px);background-size:44px 44px;}

        .avatar-wrap{position:relative;flex-shrink:0;cursor:pointer;user-select:none;}
        .avatar-outer-ring{position:absolute;inset:-8px;border-radius:50%;border:2px solid ${c.photoRing2};transition:all 0.35s;}
        .avatar-inner-ring{position:absolute;inset:-3px;border-radius:50%;border:2px solid ${c.photoRing};transition:all 0.35s;}
        .avatar-wrap:hover .avatar-outer-ring{border-color:${c.photoRing};box-shadow:0 0 0 5px ${c.photoGlow};}
        .avatar-wrap:hover .avatar-inner-ring{border-color:${c.accent};box-shadow:0 0 22px ${c.photoGlow};}
        .avatar-img{border-radius:50%;object-fit:cover;display:block;transition:opacity 0.35s ease,transform 0.35s ease;position:absolute;inset:0;width:100%;height:100%;}
        .avatar-img.fading{opacity:0;transform:scale(0.93);}
        .avatar-hint{position:absolute;bottom:-2px;right:-2px;width:28px;height:28px;border-radius:50%;background:${c.photoBadgeBg};border:2.5px solid ${c.bg};display:flex;align-items:center;justify-content:center;font-size:13px;color:${c.photoBadgeTx};transition:transform 0.25s;}
        .avatar-wrap:hover .avatar-hint{transform:rotate(180deg);}
        .avatar-fallback{border-radius:50%;background:linear-gradient(135deg,#004CBB,#00AAFF);display:flex;align-items:center;justify-content:center;font-weight:800;color:#fff;font-family:'Syne',sans-serif;position:absolute;inset:0;width:100%;height:100%;}

        .section-divider{width:100%;height:1px;background:${c.divider};}

        .mobile-menu{position:fixed;top:58px;left:0;right:0;bottom:0;background:${c.mobileMenuBg};z-index:49;display:flex;flex-direction:column;padding:28px 20px;gap:10px;animation:menuIn 0.2s ease;overflow-y:auto;}
        .mobile-nav-link{display:block;padding:16px 20px;border-radius:14px;font-size:16px;color:${c.text};text-decoration:none;font-family:'DM Mono',monospace;border:1px solid ${c.borderFaint};letter-spacing:0.05em;}
        .mobile-nav-link:hover,.mobile-nav-link:active{background:${c.pill};color:${c.accent};}

        .dot{display:inline-block;width:5px;height:5px;border-radius:50%;background:${c.dotBg};animation:bl 1.2s infinite;margin:0 2px;}
        .dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}

        @keyframes bl{0%,80%,100%{opacity:.15}40%{opacity:1}}
        @keyframes pls{0%,100%{box-shadow:0 0 0 0 rgba(0,229,122,0.5)}50%{box-shadow:0 0 0 7px rgba(0,229,122,0)}}
        @keyframes slideUp{from{opacity:0;transform:scale(0.9) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes menuIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      `}</style>

      {/* Ambient glow */}
      <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0 }}>
        <div style={{ position:"absolute",width:600,height:600,borderRadius:"50%",background:`radial-gradient(circle,${c.glowA} 0%,transparent 68%)`,left:`${glowX}%`,top:`${glowY}%`,transform:"translate(-50%,-50%)",transition:"left 1.2s,top 1.2s" }} />
        <div style={{ position:"absolute",top:0,left:0,right:0,height:"60vh",background:`radial-gradient(ellipse at 20% 0%,${c.glowB} 0%,transparent 55%)` }} />
      </div>

      {/* ── STICKY NAV ── */}
      <header style={{ position:"sticky",top:0,zIndex:50,background:c.navBg,backdropFilter:"blur(20px)",borderBottom:`1px solid ${c.navBorder}`,padding:`0 ${px}`,height:58,display:"flex",alignItems:"center",justifyContent:"space-between",transition:"background 0.3s" }}>
        <span style={{ fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,color:c.accent,letterSpacing:"0.02em" }}>YN.</span>
        {isDesktop && (
          <nav style={{ display:"flex",gap:4,alignItems:"center" }}>
            {["#hero","#about","#skills","#experience","#projects","#contact"].map(h => (
              <a key={h} href={h} style={{ fontSize:11,color:c.textMuted,textDecoration:"none",padding:"5px 12px",borderRadius:20,letterSpacing:"0.08em",textTransform:"uppercase",transition:"color 0.2s",fontFamily:"'DM Mono',monospace" }}
                onMouseOver={e=>e.target.style.color=c.accent} onMouseOut={e=>e.target.style.color=c.textMuted}>
                {h.replace("#","")}
              </a>
            ))}
          </nav>
        )}
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <button onClick={() => setDark(d=>!d)}
            style={{ background:c.toggleBg,border:`1px solid ${c.toggleBd}`,borderRadius:30,padding:isMobile?"6px 10px":"7px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:7,fontSize:12,color:c.toggleTx,fontFamily:"'DM Mono',monospace",transition:"all 0.25s" }}>
            <span style={{ fontSize:15,lineHeight:1 }}>{dark?"☀":"☾"}</span>
            {!isMobile && <span>{dark?"Light":"Dark"}</span>}
          </button>
          {!isDesktop && (
            <button onClick={() => setMenuOpen(o=>!o)}
              style={{ background:c.toggleBg,border:`1px solid ${c.toggleBd}`,borderRadius:10,padding:"8px 12px",cursor:"pointer",color:c.toggleTx,fontSize:18,lineHeight:1,display:"flex",alignItems:"center" }}>
              {menuOpen?"✕":"☰"}
            </button>
          )}
        </div>
      </header>

      {menuOpen && !isDesktop && (
        <div className="mobile-menu">
          {["#hero","#about","#skills","#experience","#projects","#contact"].map(h => (
            <a key={h} href={h} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
              {h.replace("#","").charAt(0).toUpperCase()+h.replace("#","").slice(1)}
            </a>
          ))}
          <button className="glow-btn" style={{ marginTop:12,width:"100%",padding:"15px",fontSize:15 }} onClick={() => { setChatOpen(true); setMenuOpen(false); }}>✦ Ask AI about me</button>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section id="hero" className="grid-bg" style={{ position:"relative", zIndex:1 }}>
        <div style={{ ...sec({ padding:`120px ${px} 110px` }), display:"flex", flexDirection:isMobile?"column":"row", alignItems:"center", gap:isMobile?48:80, justifyContent:"space-between" }}>

          {/* Text block */}
          <div style={{ flex:1, minWidth:0 }}>
            <span style={tag(18)}>// frontend developer · philippines</span>
            <h1 style={{ ...hd(isMobile?40:isTablet?52:64), marginBottom:24, lineHeight:1.05 }}>
              Hi I'm<br />
              <span style={{ color:c.accent }}>Gerarld</span>
            </h1>
            <p style={{ fontSize:isMobile?15:17, color:c.textSub, lineHeight:1.8, marginBottom:36, maxWidth:520 }}>
              6+ years crafting high-performance UIs. I specialize in design systems, React architecture, and pixel-perfect products that ship fast and scale gracefully.
            </p>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:48 }}>
              <button className="glow-btn" onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}>Hire me →</button>
              <button className="out-btn" onClick={() => setChatOpen(true)}>✦ Ask AI about me</button>
            </div>
            {/* Stats row */}
            <div style={{ display:"flex", gap:isMobile?24:40, flexWrap:"wrap" }}>
              {[["6+","Years of experience"],["20+","Projects delivered"],["3","Design systems built"],["99.9%","Average uptime"]].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontSize:isMobile?28:36, fontWeight:800, color:c.statNum, fontFamily:"'Syne',sans-serif", lineHeight:1 }}>{n}</div>
                  <div style={{ fontSize:12, color:c.textMuted, marginTop:5, fontFamily:"'DM Mono',monospace" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Avatar */}
          {!isMobile && (() => {
            const sz = isTablet ? 200 : 240;
            return (
              <div className="avatar-wrap" style={{ width:sz, height:sz, flexShrink:0 }}
                role="button" tabIndex={0} aria-label="Profile photo — hover to switch"
                onMouseEnter={() => setImgHovered(true)} onMouseLeave={() => setImgHovered(false)}
                onClick={() => setImgHovered(h=>!h)} onKeyDown={e=>e.key==="Enter"&&setImgHovered(h=>!h)}>
                <div className="avatar-outer-ring"/>
                <div className="avatar-inner-ring"/>
                <img className={`avatar-img${imgHovered?" fading":""}`} src={PHOTO_1} alt="Your Name" style={{ zIndex:imgHovered?1:2 }} onError={e=>e.target.style.display="none"}/>
                <img className={`avatar-img${!imgHovered?" fading":""}`} src={PHOTO_2} alt="Your Name" style={{ zIndex:imgHovered?2:1 }} onError={e=>e.target.style.display="none"}/>
                <div className="avatar-fallback" style={{ fontSize:sz*0.25 }}>YN</div>
                <div className="avatar-hint">↻</div>
              </div>
            );
          })()}

          {/* Mobile avatar — smaller, inline above stats */}
          {isMobile && (() => {
            const sz = 110;
            return (
              <div className="avatar-wrap" style={{ width:sz, height:sz }}
                role="button" tabIndex={0}
                onMouseEnter={() => setImgHovered(true)} onMouseLeave={() => setImgHovered(false)}
                onClick={() => setImgHovered(h=>!h)}>
                <div className="avatar-outer-ring"/>
                <div className="avatar-inner-ring"/>
                <img className={`avatar-img${imgHovered?" fading":""}`} src={PHOTO_1} alt="Photo" style={{ zIndex:imgHovered?1:2 }} onError={e=>e.target.style.display="none"}/>
                <img className={`avatar-img${!imgHovered?" fading":""}`} src={PHOTO_2} alt="Photo" style={{ zIndex:imgHovered?2:1 }} onError={e=>e.target.style.display="none"}/>
                <div className="avatar-fallback" style={{ fontSize:28 }}>YN</div>
                <div className="avatar-hint">↻</div>
              </div>
            );
          })()}
        </div>
      </section>

      <div className="section-divider" style={{ margin:"0 auto", maxWidth:"calc("+maxW+" + "+px+" + "+px+")" }}/>

      {/* ════════════════════════════════════════════════════════
          ABOUT / SUMMARY
      ════════════════════════════════════════════════════════ */}
      <section id="about" style={{ position:"relative", zIndex:1 }}>
        <div style={sec()}>
          <div style={{ display:"grid", gridTemplateColumns:isDesktop?"1fr 1fr":"1fr", gap:isDesktop?80:48, alignItems:"start" }}>

            {/* Left — narrative */}
            <div>
              <span style={tag()}>// about me</span>
              <h2 style={{ ...hd(isMobile?32:42), marginBottom:28 }}>
                Who I am &amp;<br /><span style={{ color:c.accent }}>what drives me</span>
              </h2>
              <p style={{ fontSize:15, color:c.textSub, lineHeight:1.9, marginBottom:20 }}>
                I'm a frontend developer based in the Philippines with a deep passion for crafting interfaces that feel as great as they look. My work sits at the intersection of design and engineering — I care equally about visual precision and clean, maintainable code.
              </p>
              <p style={{ fontSize:15, color:c.textSub, lineHeight:1.9, marginBottom:20 }}>
                Over 6 years, I've contributed to everything from scrappy startup products to enterprise-scale design systems. I thrive in collaborative environments, love mentoring junior developers, and am always pushing to understand the "why" behind every user interaction.
              </p>
              <p style={{ fontSize:15, color:c.textSub, lineHeight:1.9 }}>
                When I'm not coding, I'm exploring generative art, contributing to open-source projects, or experimenting with the latest frontend tooling. I believe great software is built by curious, empathetic people — and that's exactly who I aim to be.
              </p>
            </div>

            {/* Right — quote + facts + interests */}
            <div style={{ display:"flex", flexDirection:"column", gap:32 }}>
              {/* Pull quote */}
              <div style={{ borderLeft:`4px solid ${c.accent}`, paddingLeft:24, paddingTop:4, paddingBottom:4 }}>
                <p style={{ fontSize:isMobile?16:19, fontStyle:"italic", color:c.quoteColor, lineHeight:1.75, fontFamily:"'Syne',sans-serif" }}>
                  "I don't just build UIs — I build experiences that make people feel something."
                </p>
              </div>

              {/* Quick facts */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                {[["Location","Philippines 🇵🇭"],["Focus","Frontend / UI"],["Experience","6+ Years"],["Education","BS Computer Sci."],["Languages","EN · Filipino"],["Status","Open to Work ✦"]].map(([lbl,val]) => (
                  <div key={lbl} style={{ background:c.bgAboutTag, border:`1px solid ${c.aboutTagBd}`, borderRadius:12, padding:"13px 16px" }}>
                    <div style={{ fontSize:10, color:c.textMuted, letterSpacing:"0.12em", textTransform:"uppercase", fontFamily:"'DM Mono',monospace", marginBottom:5 }}>{lbl}</div>
                    <div style={{ fontSize:13, color:c.text, fontWeight:500 }}>{val}</div>
                  </div>
                ))}
              </div>

              {/* Interests */}
              <div>
                <div style={{ fontSize:10, color:c.textMuted, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"'DM Mono',monospace", marginBottom:12 }}>Interests</div>
                <div>
                  {["Design Systems","Open Source","Accessibility","Performance","Generative Art","Mentoring","TypeScript","UX Research"].map(i => (
                    <span key={i} style={{ display:"inline-block", padding:"5px 14px", borderRadius:20, fontSize:12, background:c.pill, color:c.pillText, border:`1px solid ${c.pillBorder}`, margin:"4px 3px", fontFamily:"'DM Mono',monospace" }}>{i}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ════════════════════════════════════════════════════════
          SKILLS
      ════════════════════════════════════════════════════════ */}
      <section id="skills" style={{ position:"relative", zIndex:1 }}>
        <div style={sec()}>
          <span style={tag()}>// technical skills</span>
          <h2 style={{ ...hd(isMobile?32:42), marginBottom:16 }}>My <span style={{ color:c.accent }}>toolkit</span></h2>
          <p style={{ fontSize:15, color:c.textMuted, marginBottom:52, lineHeight:1.7, maxWidth:560 }}>
            A curated set of tools and technologies I use to design, build, and ship production-ready software.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":isTablet?"1fr 1fr":"repeat(4,1fr)", gap:20 }}>
            {SKILL_GROUPS.map(group => (
              <div key={group.label} style={{ background:c.bgSkillGroup, border:`1px solid ${c.border}`, borderRadius:18, padding:"28px 24px" }}>
                <div style={{ fontSize:10, color:c.sectionTag, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"'DM Mono',monospace", marginBottom:18 }}>{group.label}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {group.items.map(skill => (
                    <div key={skill} style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ display:"flex", alignItems:"center", flexShrink:0 }}>{TECH_ICONS[skill]||TECH_ICONS["default"]}</span>
                      <span style={{ fontSize:13, color:c.text, fontFamily:"'DM Mono',monospace" }}>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ════════════════════════════════════════════════════════
          EXPERIENCE
      ════════════════════════════════════════════════════════ */}
      <section id="experience" style={{ position:"relative", zIndex:1 }}>
        <div style={sec()}>
          <span style={tag()}>// work history</span>
          <h2 style={{ ...hd(isMobile?32:42), marginBottom:16 }}>Where I've <span style={{ color:c.accent }}>shipped</span></h2>
          <p style={{ fontSize:15, color:c.textMuted, marginBottom:52, lineHeight:1.7, maxWidth:560 }}>
            A track record of delivering impactful frontend work across agencies, startups, and enterprise teams.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":isTablet?"1fr":"200px 1fr", gap:0, border:`1px solid ${c.border}`, borderRadius:20, overflow:"hidden" }}>
            {/* Tab sidebar — vertical on desktop/tablet, horizontal on mobile */}
            {isMobile ? (
              <div style={{ display:"flex", overflowX:"auto", borderBottom:`1px solid ${c.borderFaint}`, scrollbarWidth:"none" }}>
                {EXPERIENCES.map((e,i) => (
                  <button key={i} className={`exp-tab-h${activeExp===i?" active":""}`} onClick={() => setActiveExp(i)}>
                    <div style={{ fontWeight:500 }}>{e.company}</div>
                    <div style={{ fontSize:10, opacity:0.6, marginTop:2 }}>{e.period}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ borderRight:`1px solid ${c.borderFaint}` }}>
                {EXPERIENCES.map((e,i) => (
                  <button key={i} className={`exp-tab${activeExp===i?" active":""}`} onClick={() => setActiveExp(i)}
                    style={{ borderBottom: i<EXPERIENCES.length-1 ? `1px solid ${c.borderFaint}` : "none" }}>
                    <div style={{ fontWeight:600, fontSize:13 }}>{e.company}</div>
                    <div style={{ fontSize:11, opacity:0.55, marginTop:3 }}>{e.period}</div>
                  </button>
                ))}
              </div>
            )}

            {/* Content panel */}
            <div style={{ padding: isMobile?"28px 24px":"40px 44px" }}>
              <div style={{ marginBottom:6 }}>
                <span style={{ fontSize:isMobile?17:20, fontWeight:700, fontFamily:"'Syne',sans-serif", color:c.text }}>{EXPERIENCES[activeExp].role}</span>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:16, alignItems:"center", marginBottom:28 }}>
                <span style={{ fontSize:13, color:c.accent, fontFamily:"'DM Mono',monospace", fontWeight:500 }}>@ {EXPERIENCES[activeExp].company}</span>
                <span style={{ fontSize:12, color:c.textMuted, fontFamily:"'DM Mono',monospace" }}>{EXPERIENCES[activeExp].period}</span>
                <span style={{ fontSize:12, color:c.textMuted, fontFamily:"'DM Mono',monospace" }}>{EXPERIENCES[activeExp].location}</span>
              </div>
              <ul style={{ listStyle:"none", marginBottom:28 }}>
                {EXPERIENCES[activeExp].highlights.map((h,i) => (
                  <li key={i} style={{ display:"flex", gap:12, marginBottom:14, fontSize:isMobile?13:14, color:c.textSub, lineHeight:1.75 }}>
                    <span style={{ color:c.accent, flexShrink:0, marginTop:2, fontSize:16 }}>▹</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div style={{ display:"flex", flexWrap:"wrap", gap:0 }}>
                {EXPERIENCES[activeExp].tech.map(t => <Pill key={t} label={t}/>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ════════════════════════════════════════════════════════
          PROJECTS
      ════════════════════════════════════════════════════════ */}
      <section id="projects" style={{ position:"relative", zIndex:1 }}>
        <div style={sec()}>
          <span style={tag()}>// selected work</span>
          <h2 style={{ ...hd(isMobile?32:42), marginBottom:16 }}>Things I've <span style={{ color:c.accent }}>built</span></h2>
          <p style={{ fontSize:15, color:c.textMuted, marginBottom:52, lineHeight:1.7, maxWidth:560 }}>
            A collection of products and tools that I've designed, engineered, and shipped from scratch.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":isTablet?"1fr 1fr":"1fr 1fr", gap:24 }}>
            {PROJECTS.map((p,i) => (
              <div key={i} className="proj-card">
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:`${p.color}18`, border:`1px solid ${p.color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:p.color }}>{p.icon}</div>
                  <div style={{ display:"flex", gap:8 }}>
                    {p.tech.map(t => <Pill key={t} label={t}/>)}
                  </div>
                </div>
                <h3 style={{ fontSize:isMobile?18:22, fontWeight:700, fontFamily:"'Syne',sans-serif", color:c.text, marginBottom:12 }}>{p.title}</h3>
                <p style={{ fontSize:14, color:c.textSub, lineHeight:1.8 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"/>

      {/* ════════════════════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════════════════════ */}
      <section id="contact" style={{ position:"relative", zIndex:1 }}>
        <div style={sec()}>
          <span style={tag()}>// get in touch</span>
          <h2 style={{ ...hd(isMobile?32:42), marginBottom:16 }}>Let's <span style={{ color:c.accent }}>work</span> together</h2>
          <p style={{ fontSize:15, color:c.textMuted, marginBottom:52, lineHeight:1.7, maxWidth:560 }}>
            Open to frontend roles, freelance projects, and design system collaborations. I'd love to hear what you're building.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:isDesktop?"1fr 420px":isTablet?"1fr 1fr":"1fr", gap:32 }}>
            {/* Form */}
            <ContactForm c={c} dark={dark} isMobile={isMobile} inp={inp} card={card} />

            {/* Sidebar info */}
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
              {/* Availability badge */}
              <div style={{ background:c.availBg, border:`1px solid ${c.availBd}`, borderRadius:18, padding:"22px 26px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <span style={{ width:10, height:10, borderRadius:"50%", background:c.availTx, display:"inline-block", boxShadow:`0 0 10px ${c.availTx}` }}/>
                  <span style={{ fontSize:14, color:c.availTx, fontFamily:"'DM Mono',monospace", fontWeight:500 }}>Available for work</span>
                </div>
                <p style={{ fontSize:13, color:c.availSubTx, lineHeight:1.7 }}>Open to frontend roles, freelance projects, and design system collaborations.</p>
              </div>

              {/* Social links */}
              <div style={{ ...card({ padding:"24px 26px", flex:1 }) }}>
                <div style={{ fontSize:10, color:c.sectionTag, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"'DM Mono',monospace", marginBottom:20 }}>Find me online</div>
                <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                  {[["GitHub","github.com/yourname"],["LinkedIn","linkedin.com/in/yourname"],["Email","hello@yourname.dev"]].map(([l,v],i,arr) => (
                    <div key={l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:i<arr.length-1?`1px solid ${c.borderFaint}`:"none" }}>
                      <span style={{ fontSize:11, color:c.textFaint, fontFamily:"'DM Mono',monospace", textTransform:"uppercase", letterSpacing:"0.1em" }}>{l}</span>
                      <span style={{ fontSize:12, color:c.accent, fontFamily:"'DM Mono',monospace" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position:"relative", zIndex:1, borderTop:`1px solid ${c.borderFaint}`, padding:`32px ${px}` }}>
        <div style={{ maxWidth:maxW, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <span style={{ fontSize:12, color:c.footerTx, fontFamily:"'DM Mono',monospace" }}>Designed & built by Your Name · {new Date().getFullYear()}</span>
          <span style={{ fontSize:12, color:c.footerTx2, fontFamily:"'DM Mono',monospace" }}>Frontend Developer · Philippines</span>
        </div>
      </footer>

      {/* ── CHAT PANEL ── */}
      {chatOpen && (
        <div style={{ position:"fixed", bottom:isMobile?0:96, right:isMobile?0:24, width:isMobile?"100%":400, zIndex:200, display:"flex", flexDirection:"column", background:c.bgChatPanel, border:`1px solid ${c.borderAccent}`, borderRadius:isMobile?"22px 22px 0 0":22, overflow:"hidden", boxShadow:dark?"0 28px 72px rgba(0,0,0,0.75),0 0 50px rgba(0,100,220,0.12)":"0 16px 48px rgba(0,60,160,0.15)", animation:"slideUp 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards", maxHeight:isMobile?"88vh":"auto" }}>
          <div style={{ padding:"16px 20px", borderBottom:`1px solid ${c.borderChat}`, display:"flex", alignItems:"center", gap:12, background:c.bgChatHdr, flexShrink:0 }}>
            <div style={{ position:"relative", flexShrink:0 }}>
              <div style={{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,#004CBB,#00AAFF)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, color:"#fff" }}>✦</div>
              <span style={{ position:"absolute", bottom:0, right:0, width:11, height:11, borderRadius:"50%", background:"#00E57A", border:`2.5px solid ${c.bgChatHdr}` }}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:700, color:c.text, fontFamily:"'Syne',sans-serif", lineHeight:1 }}>Portfolio AI</div>
              <div style={{ fontSize:11, color:c.accent, fontFamily:"'DM Mono',monospace", marginTop:3 }}>● online · ask me anything</div>
            </div>
            <button onClick={() => setChatOpen(false)} style={{ background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)", border:`1px solid ${dark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.07)"}`, borderRadius:"50%", width:32, height:32, color:c.textMuted, cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s", flexShrink:0 }}
              onMouseOver={e=>e.currentTarget.style.color=c.text} onMouseOut={e=>e.currentTarget.style.color=c.textMuted}>✕</button>
          </div>

          {messages.length === 1 && (
            <div style={{ padding:"12px 16px 6px", borderBottom:`1px solid ${c.borderFaint}`, flexShrink:0 }}>
              <div style={{ fontSize:10, color:c.textMuted, fontFamily:"'DM Mono',monospace", marginBottom:8, letterSpacing:"0.1em", textTransform:"uppercase" }}>Suggested</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {["What's your experience?","Are you available?","Best projects?","Tech stack?"].map(q => (
                  <button key={q} onClick={() => setInput(q)} style={{ fontSize:11, padding:"5px 12px", borderRadius:20, background:c.pill, color:c.pillText, border:`1px solid ${c.pillBorder}`, cursor:"pointer", fontFamily:"'DM Mono',monospace" }}>{q}</button>
                ))}
              </div>
            </div>
          )}

          <div style={{ overflowY:"auto", padding:"16px", display:"flex", flexDirection:"column", gap:12, flex:1, minHeight:0, maxHeight:isMobile?"55vh":340 }}>
            {messages.map((m,i) => (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:m.role==="user"?"flex-end":"flex-start", gap:4 }}>
                {m.role==="assistant" && (
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginLeft:4 }}>
                    <div style={{ width:17, height:17, borderRadius:"50%", background:"linear-gradient(135deg,#004CBB,#00AAFF)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, color:"#fff" }}>✦</div>
                    <span style={{ fontSize:10, color:c.textFaint, fontFamily:"'DM Mono',monospace" }}>Portfolio AI</span>
                  </div>
                )}
                <div style={{ background:m.role==="user"?c.chatU:c.chatA, border:`1px solid ${m.role==="user"?c.chatUBd:c.chatABd}`, borderRadius:m.role==="user"?"15px 15px 4px 15px":"15px 15px 15px 4px", padding:"10px 15px", fontSize:13, color:m.role==="user"?c.chatUTx:c.chatATx, maxWidth:"84%", lineHeight:1.6 }}>{m.content}</div>
                {m.role==="user" && <span style={{ fontSize:10, color:c.textFaint, fontFamily:"'DM Mono',monospace", marginRight:4 }}>You</span>}
              </div>
            ))}
            {loading && (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-start", gap:4 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginLeft:4 }}>
                  <div style={{ width:17, height:17, borderRadius:"50%", background:"linear-gradient(135deg,#004CBB,#00AAFF)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, color:"#fff" }}>✦</div>
                  <span style={{ fontSize:10, color:c.textFaint, fontFamily:"'DM Mono',monospace" }}>Portfolio AI</span>
                </div>
                <div style={{ background:c.chatA, border:`1px solid ${c.chatABd}`, borderRadius:"15px 15px 15px 4px", padding:"10px 15px", display:"flex", alignItems:"center", gap:2 }}>
                  <span className="dot"/><span className="dot"/><span className="dot"/>
                </div>
              </div>
            )}
            <div ref={chatEndRef}/>
          </div>

          <div style={{ height:"1px", background:c.borderFaint, flexShrink:0 }}/>
          <div style={{ padding:"12px 16px", background:c.bgChatInput, display:"flex", gap:10, alignItems:"flex-end", flexShrink:0 }}>
            <div style={{ flex:1, position:"relative" }}>
              <textarea value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
                placeholder="Ask about experience, skills, projects…" rows={2}
                style={{ background:c.bgInput, border:`1px solid ${c.border}`, borderRadius:10, padding:"10px 14px", fontSize:13, color:c.text, outline:"none", resize:"none", fontFamily:"'DM Mono',monospace", width:"100%", lineHeight:1.55, transition:"border-color 0.2s" }}
                onFocus={e=>e.target.style.borderColor=c.accent} onBlur={e=>e.target.style.borderColor=c.border}/>
              <div style={{ position:"absolute", bottom:9, right:10, fontSize:10, color:c.textFaint, fontFamily:"'DM Mono',monospace", pointerEvents:"none" }}>⏎</div>
            </div>
            <button onClick={send} disabled={loading||!input.trim()}
              style={{ background:loading||!input.trim()?c.sbDis:"#0077EE", border:"none", borderRadius:10, padding:0, width:44, height:44, color:loading||!input.trim()?c.sbDisTx:"#fff", cursor:loading||!input.trim()?"not-allowed":"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.2s", flexShrink:0 }}
              onMouseOver={e=>{if(!loading&&input.trim())e.currentTarget.style.background="#009FFF"}}
              onMouseOut={e=>{if(!loading&&input.trim())e.currentTarget.style.background="#0077EE"}}>→</button>
          </div>
          <div style={{ padding:"8px 16px", background:c.bgChatPwrd, borderTop:`1px solid ${c.borderFaint}`, textAlign:"center", flexShrink:0 }}>
            <span style={{ fontSize:10, color:c.textFaint, fontFamily:"'DM Mono',monospace", letterSpacing:"0.06em" }}>powered by claude · anthropic</span>
          </div>
        </div>
      )}

      {/* ── FAB + BACK TO TOP ── */}
      <div style={{ position:"fixed", bottom:24, right:24, zIndex:201, display:"flex", flexDirection:"column", alignItems:"flex-end", gap:12 }}>

        {/* Back to top — appears after scrolling 400px */}
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
            title="Back to top"
            style={{
              width:44, height:44, borderRadius:"50%",
              background:c.bgCard,
              border:`1px solid ${c.borderAccent}`,
              color:c.accent,
              cursor:"pointer",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:18, lineHeight:1,
              boxShadow: dark ? "0 4px 18px rgba(0,0,0,0.4)" : "0 4px 18px rgba(0,80,180,0.15)",
              transition:"all 0.2s",
              animation:"fadeSlide 0.25s ease",
              fontFamily:"monospace",
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = c.accent;
              e.currentTarget.style.color = dark ? "#030D1A" : "#fff";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,120,255,0.35)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = c.bgCard;
              e.currentTarget.style.color = c.accent;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = dark ? "0 4px 18px rgba(0,0,0,0.4)" : "0 4px 18px rgba(0,80,180,0.15)";
            }}
          >
            ↑
          </button>
        )}

        {/* AI Chat tooltip */}
        {!chatOpen && !isMobile && (
          <div style={{ background:c.fabTipBg, border:`1px solid ${c.fabTipBd}`, borderRadius:12, padding:"7px 15px", fontSize:12, color:c.pillText, fontFamily:"'DM Mono',monospace", whiteSpace:"nowrap", boxShadow:"0 4px 20px rgba(0,0,0,0.2)", animation:"fadeSlide 0.3s ease" }}>
            ✦ Ask me anything
          </div>
        )}

        {/* AI Chat FAB */}
        {!chatOpen && (
          <button className="fab" onClick={() => setChatOpen(true)}>
            <span>✦</span>
            <span className="fab-badge"/>
          </button>
        )}
      </div>
    </div>
  );
}