"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";



export default function Navbar() {
  const pathname = usePathname();
  

  const isActive = (href: string) =>
    pathname === href ? "text-blue-600 font-semibold" : "text-gray-700";

  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">ReelZone</h1>
      <div className="space-x-6">
        <Link href="/" className={isActive("/")}>Home</Link>
        <Link href="/upload" className={isActive("/upload")}>Upload</Link>
        <Link href="/profile" className={isActive("/profile")}>Profile</Link>
        <button
        onClick={() => signOut({ callbackUrl: "/welcome" })}
        className="text-red-500 hover:underline"
        >
          Logout
          </button>

      </div>
    </nav>
  );
}