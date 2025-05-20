import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import cookiesData from "../data/cookies.json";
import configData from "../data/config.json";
import { ConfigData, CookieConsentData } from "../../types";

// Rzutowanie na odpowiednie typy
const typedConfigData = configData as ConfigData;
const typedCookiesData = cookiesData as CookieConsentData;

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  // Pobieranie kolorów z pliku konfiguracyjnego
  const { primary } = typedConfigData.colors;

  useEffect(() => {
    const consentAccepted = localStorage.getItem("cookieConsent");
    if (!consentAccepted) {
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 transform transition-transform duration-500 ease-in-out animate-slide-up">
      <div className="container mx-auto py-4 px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-700 text-sm">{typedCookiesData.message}</p>
        <div className="flex flex-shrink-0 gap-3">
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <a href={typedCookiesData.moreInfoUrl}>
              {typedCookiesData.moreInfoText}
            </a>
          </Button>
          <Button
            size="sm"
            onClick={acceptCookies}
            style={{ backgroundColor: primary }}
            className="hover:bg-opacity-90"
          >
            {typedCookiesData.acceptButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;