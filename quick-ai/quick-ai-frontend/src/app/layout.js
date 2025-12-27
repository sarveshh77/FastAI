import "./globals.css";
import { ThemeProvider } from "./theme-provider"; // <-- Import

export const metadata = {
  title: "Quick AI",
  description: "AI Content Generation Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Wrap your children with the provider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}