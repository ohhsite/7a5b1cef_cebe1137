import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Brain, Shield, Users, Heart, Flame } from "lucide-react";
import specializationsData from "../data/specializations.json";
import servicesData from "../data/services.json";
import configData from "../data/config.json";
import { ConfigData, SpecializationData, ServicesData } from "../../types";

const typedConfigData = configData as ConfigData;
const typedSpecializationsData = specializationsData as SpecializationData[];
const typedServicesData = servicesData as ServicesData;

const ServicesSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { primary, accent, backgroundLight, white } = typedConfigData.colors;

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      Brain: <Brain size={32} style={{ color: primary }} />,
      Shield: <Shield size={32} style={{ color: primary }} />,
      Users: <Users size={32} style={{ color: primary }} />,
      Heart: <Heart size={32} style={{ color: primary }} />,
      Flame: <Flame size={32} style={{ color: primary }} />
    };
    return icons[iconName] || <Brain size={32} style={{ color: primary }} />;
  };

  useEffect(() => {
    if (inView) {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          setTimeout(() => {
            card.classList.add("opacity-100", "translate-y-0");
            card.classList.remove("opacity-0", "translate-y-8");
          }, 150 * index);
        }
      });
    }
  }, [inView]);

  const specializations = Array.isArray(typedSpecializationsData)
    ? [...typedSpecializationsData].sort((a, b) => a.order - b.order)
    : [];

  const hasAnyContent =
    (typedServicesData.title || typedServicesData.description) || specializations.length > 0;

  if (!hasAnyContent) return null;

  return (
    <section id="services" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ background: `linear-gradient(to bottom right, ${white}, ${backgroundLight}, ${white})` }}
        ></div>
        <div className="absolute top-20 left-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: `${primary}05` }}></div>
        <div className="absolute bottom-40 right-10 w-60 h-60 rounded-full blur-3xl" style={{ background: `${accent}05` }}></div>
      </div>

      <div className="container-custom">
        {(typedServicesData.title || typedServicesData.description) && (
          <div className="text-center mb-16 relative">
            {typedServicesData.title && (
              <h2 className="section-title">{typedServicesData.title}</h2>
            )}
            {typedServicesData.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{typedServicesData.description}</p>
            )}
            <div className="absolute -z-10 left-1/2 transform -translate-x-1/2 -top-4 w-40 h-10 blur-xl" style={{ background: `${primary}10` }}></div>
          </div>
        )}

        {specializations.length > 0 && (
          <div
            className={`grid grid-cols-1 ${
              typedServicesData.layout === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-1"
            } gap-8 relative z-10`}
          >
            {specializations.map((specialization, index) => (
              <div
                key={specialization.id || index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="opacity-0 translate-y-8 transition-all duration-700 group"
              >
                <div className="h-full bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                  <div
                    className="absolute -top-10 -right-10 w-20 h-20 rounded-full"
                    style={{
                      background: `linear-gradient(to bottom right, ${primary}10, transparent)`
                    }}
                  ></div>

                  <div className="relative z-10">
                    {typedServicesData.showIcons && (
                      <div className="mb-6 relative">
                        <div className="p-4 inline-block rounded-2xl" style={{ background: `${primary}10` }}>
                          {getIcon(specialization.icon)}
                        </div>
                        {typedServicesData.showHoverEffects && (
                          <div
                            className="absolute -inset-1 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity -z-10"
                            style={{ background: `linear-gradient(to right, ${primary}20, ${accent}20)` }}
                          ></div>
                        )}
                      </div>
                    )}

                    <h3
                      className={`text-xl font-bold mb-3 text-gray-800 ${
                        typedServicesData.showHoverEffects ? "group-hover:text-primary transition-colors" : ""
                      }`}
                    >
                      {specialization.title}
                    </h3>

                    <p className="text-gray-600">{specialization.description}</p>
                  </div>

                  {typedServicesData.showHoverEffects && (
                    <div
                      className="absolute bottom-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                      style={{ background: `linear-gradient(to right, ${primary}, ${accent})` }}
                    ></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
