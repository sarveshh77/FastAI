"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Image, CreditCard, PenSquare, MicVocal, FileText } from "lucide-react";
const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
 { name: "Article Generator", href: "/tools/article-generator", icon: PenSquare },
  { name: "Blog Title Generator", href: "/tools/blog-title-generator", icon: MicVocal },
  { name: "Image Generator", href: "/tools/image-generator", icon: Image },
  { name: "Resume Analyzer", href: "/tools/resume-analyzer", icon: FileText },
  { name: "Gallery", href: "/gallery", icon: Image },
  { name: "Billing", href: "/billing", icon: CreditCard },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <Link href="/dashboard" className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
          Quick AI
        </Link>
        <ul className="mt-6">
          {navLinks.map((link) => (
            <li className="relative px-6 py-3" key={link.name}>
              <Link href={link.href}>
                <span
                  className={`absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg ${
                    pathname.startsWith(link.href) ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                ></span>
                <span
                  className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
                    pathname.startsWith(link.href) ? "text-gray-800 dark:text-gray-100" : ""
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="ml-4">{link.name}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}