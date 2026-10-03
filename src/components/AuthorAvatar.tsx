import Image from "next/image";

// Author photo with an initials fallback (blog posts may not have a photo).
export default function AuthorAvatar({ src, name, size, className = "" }: { src: string; name: string; size: number; className?: string }) {
  if (src) {
    return <Image src={src} alt={name} width={size} height={size} className={`rounded-full object-cover ${className}`} />;
  }
  return (
    <span
      style={{ width: size, height: size, fontSize: Math.max(10, size * 0.4) }}
      className={`rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 ${className}`}
      aria-label={name}
    >
      {name.charAt(0)}
    </span>
  );
}
