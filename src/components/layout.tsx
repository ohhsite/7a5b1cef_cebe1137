// components/Layout.tsx
import { useEffect } from "react";
import { setThemeColors } from "../utils/theme";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    // Ustawienie kolorów motywu przy ładowaniu strony
    setThemeColors();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;