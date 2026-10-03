import type { Course } from "@/data/courses";
import type { Scholarship } from "@/data/scholarships";
import { departments, formatINR, getDepartment, yearLabel } from "@/data/courses";
import { BRAND } from "@/lib/brand";

// Rule-based WhatsApp replies (no AI). Every answer comes from the same data the
// website uses: courses (programs table) and scholarships.

const SITE = BRAND.siteUrl;
const PHONE = BRAND.phone;

export interface SiteData {
  courses: Course[];
  scholarships: Scholarship[];
}

export interface BotReply {
  text: string;
  /** Also send the main menu after the text. */
  menu?: boolean;
  /** Pause the bot and alert a counsellor. */
  handoff?: boolean;
}

const MENU: { id: string; label: string }[] = [
  { id: "courses", label: "All Courses (department-wise)" },
  { id: "after10", label: "Courses after 10th" },
  { id: "after12", label: "Courses after 12th" },
  { id: "aftergrad", label: "Courses after Graduation / Diploma" },
  { id: "fees", label: "Fee Structure" },
  { id: "scholarship", label: "Scholarships" },
  { id: "contact", label: "Campus & Contact" },
  { id: "counsellor", label: "Talk to Admission Counsellor" },
];

export const MENU_TEXT =
  "Neeche se number reply kariye 👇\n" +
  MENU.map((m, i) => `*${i + 1}.* ${m.label}`).join("\n") +
  "\n\nYa seedha course ka naam likhiye (jaise *B.Sc Nursing*, *DMLT*, *LLB*).";

const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
const compact = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const hasWord = (text: string, words: string[]) => words.some((w) => new RegExp(`\\b${w}\\b`).test(text));

const line = (c: Course) => `- *${c.name}* (${c.duration}) — ${formatINR(c.totalFee)}`;

// ── Intents ────────────────────────────────────────────────────────────────

function welcome(name?: string): BotReply {
  return {
    text:
      `Namaste${name ? ` ${name}` : ""}! 👋 *${BRAND.name}* mein aapka swagat hai.\n` +
      `Hamare yahan 11 departments mein 49 courses hain — Medical, Nursing, Paramedical, Pharmacy, Law, Education, Management aur ITI.\n` +
      `Admissions open: *${BRAND.session}*`,
    menu: true,
  };
}

function counsellor(): BotReply {
  return {
    text:
      "Zaroor! 🙌 Hamare admission counsellor aapko jaldi call karenge.\n" +
      `Urgent ho toh abhi call karein: *${PHONE}*\n` +
      "Apna *naam, qualification (10th/12th/graduation) aur jo course chahiye* bhej dijiye.",
    handoff: true,
  };
}

function contact(): BotReply {
  return {
    text:
      `*${BRAND.name}*\n` +
      `📍 ${BRAND.address}\n` +
      `📞 ${PHONE} (Call / WhatsApp)\n` +
      `✉️ ${BRAND.email}\n` +
      `🕘 ${BRAND.hours.join(", ")}\n` +
      `🌐 ${SITE}`,
  };
}

function allCourses(data: SiteData): BotReply {
  const body = departments
    .map((d) => {
      const list = data.courses.filter((c) => c.department === d.slug);
      return list.length ? `${d.icon} *${d.name}*: ${list.map((c) => c.name).join(", ")}` : "";
    })
    .filter(Boolean)
    .join("\n");
  return {
    text: `*Hamare Courses* 🎓\n${body}\n\nKisi course ka naam likhiye — fees, duration aur eligibility bhej denge.\nSab courses: ${SITE}/courses`,
  };
}

function byEligibility(data: SiteData, title: string, test: (e: string) => boolean): BotReply {
  const list = data.courses.filter((c) => test(c.eligibility));
  return {
    text:
      `*${title}* 🎓\n` +
      (list.length ? list.slice(0, 20).map(line).join("\n") : "Abhi koi course listed nahi hai.") +
      `\n\nApply online: ${SITE}/apply`,
  };
}

function feesInfo(): BotReply {
  return {
    text:
      "*Fee Structure* 💰\nHar course ki year-wise fees yahan dekhein:\n" +
      `${SITE}/fee-structure\n\nKisi course ka naam likhiye (jaise *GNM* ya *BPT*) — uski exact fee bhej denge.`,
  };
}

function scholarshipInfo(data: SiteData): BotReply {
  const list = data.scholarships.slice(0, 5);
  return {
    text:
      "*Scholarships* 🎓\n" +
      (list.length ? list.map((s) => `- *${s.shortName || s.name}* — ${s.amountDisplay}`).join("\n") + "\n" : "") +
      `Eligibility & documents: ${SITE}/scholarship\nForm bharne mein hamara office madad karta hai.`,
  };
}

// ── Course lookup ──────────────────────────────────────────────────────────

export function findCourses(text: string, courses: Course[]): Course[] {
  const t = compact(text);
  if (t.length < 2) return [];
  // Exact abbreviation match first (e.g. "dmlt", "bsc nursing", "llb")
  const exact = courses.filter((c) => {
    const n = compact(c.name);
    return n.length >= 2 && (t === n || new RegExp(`\\b${norm(c.name).replace(/\s+/g, "\\s*")}\\b`).test(text));
  });
  if (exact.length) return exact.slice(0, 3);
  const words = text.split(" ").filter((w) => w.length >= 4);
  return courses.filter((c) => words.some((w) => norm(c.fullName).includes(w))).slice(0, 3);
}

function courseDetails(list: Course[]): BotReply {
  return {
    text:
      list
        .map((c) => {
          const fees = c.yearlyFees.map((f, i) => `${yearLabel(i)}: ${formatINR(f)}`).join(", ");
          return (
            `🎓 *${c.name}* — ${c.fullName}\n` +
            `🏛️ ${getDepartment(c.department)?.name ?? c.department}\n` +
            `⏱️ ${c.duration}\n✅ Eligibility: ${c.eligibility}\n` +
            `💰 ${fees}\n💰 Total: *${formatINR(c.totalFee)}*\n` +
            `🔗 ${SITE}/courses/${c.slug}`
          );
        })
        .join("\n\n") + "\n\nAdmission ke liye *counsellor* likhiye ya apply karein: " + `${SITE}/apply`,
  };
}

// ── Router ─────────────────────────────────────────────────────────────────

const after10 = (e: string) => /10th/i.test(e);
const after12 = (e: string) => /10\+2|I\.Sc/i.test(e) && !/with (GNM|D)/.test(e);
const afterGrad = (e: string) => !/10th/i.test(e) && (!/10\+2|I\.Sc/i.test(e) || /with (GNM|D)/.test(e));

export function buildReply(rawText: string | null, data: SiteData, profileName?: string): BotReply {
  const choice = rawText?.trim().match(/^([1-8])\.?$/);
  const menuId = choice ? MENU[Number(choice[1]) - 1].id : null;
  switch (menuId) {
    case "courses": return allCourses(data);
    case "after10": return byEligibility(data, "Courses after 10th", after10);
    case "after12": return byEligibility(data, "Courses after 12th / I.Sc.", after12);
    case "aftergrad": return byEligibility(data, "Courses after Graduation / Diploma", afterGrad);
    case "fees": return feesInfo();
    case "scholarship": return scholarshipInfo(data);
    case "contact": return contact();
    case "counsellor": return counsellor();
  }

  if (!rawText) {
    return { text: "Abhi hum sirf text messages samajh sakte hain — please apna sawaal type karke bhejiye 🙏", menu: true };
  }
  const text = norm(rawText);

  if (hasWord(text, ["counsellor", "counselor", "counselling", "call", "callback", "human", "agent", "baat", "talk", "sir", "madam", "mam"])) {
    return counsellor();
  }
  if (hasWord(text, ["hi", "hii", "hello", "hey", "helo", "namaste", "namaskar", "menu", "start", "hlo"])) return welcome(profileName);

  const found = findCourses(text, data.courses);
  if (found.length) return courseDetails(found);

  if (hasWord(text, ["10th", "matric"])) return byEligibility(data, "Courses after 10th", after10);
  if (hasWord(text, ["12th", "inter", "intermediate", "isc"])) return byEligibility(data, "Courses after 12th / I.Sc.", after12);
  if (hasWord(text, ["graduation", "graduate", "pg", "master", "masters"])) return byEligibility(data, "Courses after Graduation / Diploma", afterGrad);
  if (hasWord(text, ["scholarship", "scholarships"])) return scholarshipInfo(data);
  if (hasWord(text, ["fee", "fees", "cost", "kitna", "kitni", "budget", "paisa", "kharcha"])) return feesInfo();
  if (hasWord(text, ["address", "office", "campus", "location", "kahan", "contact", "number", "phone", "email", "timing"])) return contact();
  if (hasWord(text, ["course", "courses", "list", "department", "departments"])) return allCourses(data);
  if (hasWord(text, ["thanks", "thank", "thx", "ok", "okay", "dhanyavad", "shukriya"])) {
    return { text: "Aapka swagat hai! 😊 Kuch aur jaanna ho toh *menu* likhiye." };
  }

  return { text: "Maaf kijiye, ye sawaal hum samajh nahi paaye 🙏", menu: true };
}
