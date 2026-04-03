import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "EventHire — Post Your Requirement",
  description: "Find planners, performers, and crew for your events",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0D0D0D",
              color: "#F5F0E8",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              borderRadius: "4px",
              border: "1px solid #C9A84C",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
