import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "eventshub | Discover and host events",
  description:
    "Discover events, reserve seats, and host your next event with eventshub.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
