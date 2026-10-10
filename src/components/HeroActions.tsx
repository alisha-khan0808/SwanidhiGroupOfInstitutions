"use client";
import { useEffect, useState } from "react";
import { Heart, Share2, Check } from "lucide-react";

// Save (heart) + share buttons shown on a college hero image.
// "Saved" is remembered on this device only (localStorage).
export default function HeroActions({ id, title, variant = "light" }: { id: string; title: string; variant?: "light" | "dark" }) {
  const key = `saved:${id}`;
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read device preference after mount
      setSaved(localStorage.getItem(key) === "1");
    } catch {}
  }, [key]);

  const toggle = () => {
    const next = !saved;
    setSaved(next);
    try {
      if (next) localStorage.setItem(key, "1");
      else localStorage.removeItem(key);
    } catch {}
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const btn =
    variant === "light"
      ? "w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
      : "w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 transition-colors";

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={toggle} className={btn} aria-label={saved ? "Remove from saved" : "Save college"} aria-pressed={saved}>
        <Heart className={`w-5 h-5 ${saved ? "fill-rose-500 text-rose-500" : ""}`} />
      </button>
      <button type="button" onClick={share} className={btn} aria-label="Share">
        {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
      </button>
    </div>
  );
}
