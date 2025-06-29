// app/welcome/page.tsx
"use client";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const router = useRouter();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white text-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to ReelZone 🚀</h1>
      <p className="text-gray-600 mb-6">Create, share, and explore amazing content.</p>

      <div className="space-x-4">
        <button onClick={() => router.push("/login")} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Login
        </button>
        <button onClick={() => router.push("/register")} className="px-6 py-2 bg-gray-100 text-gray-800 border hover:bg-gray-200">
          Register
        </button>
      </div>
    </main>
  );
}
