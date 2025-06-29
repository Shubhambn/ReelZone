// app/layout.tsx
import "./globals.css";
import Navbar from "@/component/navbar";
import Providers from "@/component/Provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}