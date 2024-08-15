import "~/styles/globals.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Flow",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="pageHeader">
          <img src="/logo.png" />
        </header>
        {children}
      </body>
    </html>
  );
}
