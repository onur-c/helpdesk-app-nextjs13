import "./globals.css";
import { Quicksand } from "next/font/google";
// components

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard | O-dev Helpdesk",
  description:
    "Ticket viewing application which lets you sign-up, sign-in. Create, read, delete tickets. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}
