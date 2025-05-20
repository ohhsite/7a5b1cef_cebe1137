import { useInView } from "react-intersection-observer";
import faqData from "../data/faq.json";
import configData from "../data/config.json";
import { ConfigData, FaqData } from "../../types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Rzutowanie na odpowiednie typy
const typedConfigData = configData as ConfigData;
const typedFaqData = faqData as FaqData;

const FAQSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { primary, white } = typedConfigData.colors;

  // Jeśli nie ma pytań, tytułu ani podtytułu – nie pokazuj sekcji wcale
  const noContent =
    !Array.isArray(typedFaqData.questions) ||
    typedFaqData.questions.length === 0;

  return noContent ? null : (
    <section id="faq" className="section-padding" ref={ref} style={{ background: white }}>
      <div className="container-custom">
        {(typedFaqData.title || typedFaqData.subtitle) && (
          <div className="text-center mb-16">
            {typedFaqData.title && (
              <h2 className="section-title mb-4">{typedFaqData.title}</h2>
            )}
            {typedFaqData.subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {typedFaqData.subtitle}
              </p>
            )}
          </div>
        )}

        <div
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            inView ? "opacity-100" : "opacity-0 translate-y-8"
          }`}
        >
          <Accordion type="single" collapsible className="w-full">
            {typedFaqData.questions.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
