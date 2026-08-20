import Link from "next/link";
import { Vote } from "lucide-react";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-5">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-extrabold tracking-tight"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-on-primary">
          <Vote size={16} strokeWidth={2.5} />
        </span>
        {SITE.name}
      </Link>
      <nav className="hidden gap-7 text-sm font-semibold text-muted sm:flex">
        <Link href="/?wing=원내#explorer" className="hover:text-foreground">
          원내정당
        </Link>
        <Link href="/?wing=원외#explorer" className="hover:text-foreground">
          원외정당
        </Link>
        <Link href="/guide" className="hover:text-foreground">
          가이드
        </Link>
      </nav>
    </header>
  );
}
