import { useInView } from "react-intersection-observer";
import pricingData from "../data/pricing.json";
import configData from "../data/config.json";
import { ConfigData, PricingData } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const typedConfigData = configData as ConfigData;
const typedPricingData = pricingData as PricingData;

const PricingSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { primary, backgroundLight } = typedConfigData.colors;

  const hasServices = Array.isArray(typedPricingData.services) && typedPricingData.services.length > 0;
  const hasPaymentMethods = Array.isArray(typedPricingData.paymentMethods) && typedPricingData.paymentMethods.length > 0;
  const hasNotes = Array.isArray(typedPricingData.notes) && typedPricingData.notes.length > 0;
  const hasTitleOrSubtitle = typedPricingData.title || typedPricingData.subtitle;

  // jeśli nie ma niczego do wyświetlenia, nie renderuj sekcji
  if (!hasServices && !hasPaymentMethods && !hasNotes && !hasTitleOrSubtitle) {
    return null;
  }

  return (
    <section id="pricing" className="section-padding" ref={ref} style={{ background: backgroundLight }}>
      <div className="container-custom">
        {hasTitleOrSubtitle && (
          <div className="text-center mb-16">
            {typedPricingData.title && (
              <h2 className="section-title mb-4">{typedPricingData.title}</h2>
            )}
            {typedPricingData.subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{typedPricingData.subtitle}</p>
            )}
          </div>
        )}

        {hasServices && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {typedPricingData.services.map((service, index) => (
              <Card
                key={service.id || index}
                className={`transition-all duration-700 delay-${index * 100} ${
                  inView ? "opacity-100" : "opacity-0 translate-y-8"
                } hover:shadow-lg`}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-2xl font-bold" style={{ color: primary }}>
                      {service.price} {service.currency}
                    </p>
                    <p className="text-sm text-gray-500">
                      {service.duration} {service.durationUnit}
                    </p>
                  </div>
                  {service.description && (
                    <p className="text-gray-600 text-sm mt-2">{service.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {(hasPaymentMethods || hasNotes) && (
          <div
            className={`bg-white p-8 rounded-lg shadow-md transition-all duration-700 delay-300 ${
              inView ? "opacity-100" : "opacity-0"
            }`}
          >
            {hasPaymentMethods && (
              <>
                <h3 className="text-xl font-bold mb-4">Metody płatności:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                  {typedPricingData.paymentMethods.map((method, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2" style={{ color: primary }}>✓</span>
                      {method}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {hasNotes && (
              <div className="mt-4 p-4 bg-gray-50 rounded" style={{ borderLeft: `4px solid ${primary}` }}>
                {typedPricingData.notes.map((note, index) => (
                  <p key={index} className="text-gray-600 mb-2 last:mb-0">{note}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingSection;
