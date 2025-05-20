import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";
import testimonialsData from "../data/testimonials.json";
import configData from "../data/config.json";
import { ConfigData, TestimonialData } from "../../types";

const typedConfigData = configData as ConfigData;
const typedTestimonialsData = testimonialsData as TestimonialData;

const TestimonialsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { primary, accent, white } = typedConfigData.colors;
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        style={i < rating ? { color: accent, fill: accent } : { color: "#d1d5db" }}
      />
    ));
  };

  useEffect(() => {
    if (inView) {
      cardRefs.current.forEach((card, index) => {
        if (card) {
          setTimeout(() => {
            card.classList.add("opacity-100", "translate-y-0");
            card.classList.remove("opacity-0", "translate-y-12");
          }, 150 * index);
        }
      });
    }
  }, [inView]);

  const hasTestimonials = Array.isArray(typedTestimonialsData.testimonials) && typedTestimonialsData.testimonials.length > 0;
  const hasTitleOrDescription = typedTestimonialsData.title || typedTestimonialsData.description;
  const hasGoogleMapsLink = !!typedTestimonialsData.googleMapsLink;

  if (!hasTestimonials && !hasTitleOrDescription && !hasGoogleMapsLink) return null;

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom right, ${white}, ${white}95, ${primary}05)` }}></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full blur-3xl" style={{ background: `${accent}05` }}></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-full blur-3xl" style={{ background: `${primary}05` }}></div>
      </div>

      <div className="absolute top-20 left-10 hidden lg:block" style={{ color: `${primary}05` }}>
        <Quote size={200} className="transform -scale-x-100" />
      </div>

      <div className="container-custom">
        {(typedTestimonialsData.title || typedTestimonialsData.description) && (
          <div className="text-center mb-16 relative">
            {typedTestimonialsData.title && (
              <h2 className="section-title mb-4">{typedTestimonialsData.title}</h2>
            )}
            {typedTestimonialsData.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{typedTestimonialsData.description}</p>
            )}
          </div>
        )}

        {hasTestimonials && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 relative z-10">
            {typedTestimonialsData.testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id || index}
                ref={el => cardRefs.current[index] = el}
                className="opacity-0 translate-y-12 transition-all duration-700 flex flex-col h-full"
              >
                <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 relative">
                  <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                    <div className="p-3 rounded-full shadow-lg" style={{ backgroundColor: accent, color: white }}>
                      <Quote size={20} />
                    </div>
                  </div>

                  {typedTestimonialsData.showRating && (
                    <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
                  )}

                  <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
                  <div className="mt-auto">
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {typedTestimonialsData.googleMapsLink && (
          <div className="mt-16 text-center">
            <a
              href={typedTestimonialsData.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 transition-colors group"
              style={{ color: primary }}
            >
              <span className="font-medium">Zobacz więcej opinii na Google Maps</span>
              <svg className="w-6 h-6 transform group-hover:scale-110 transition-transform" viewBox="0 0 326667 333333" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593z" fill="#4285f4"/>
                <path d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z" fill="#34a853"/>
                <path d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 75556l54074-42592z" fill="#fbbc04"/>
                <path d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41926c13520-40185 50927-69334 95001-69334z" fill="#ea4335"/>
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
