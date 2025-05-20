import { useInView } from "react-intersection-observer";
import { Brain, Shield, Users, Heart, Flame } from "lucide-react";
import specializationsData from "../data/specializations.json";
import configData from "../data/config.json";
import { ConfigData, SpecializationData } from "../../types";

// Rzutowanie danych
const typedConfigData = configData as ConfigData;
const typedSpecializationsData = specializationsData as SpecializationData[];

const SpecializationsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { primary } = typedConfigData.colors;

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      Brain: <Brain size={36} style={{ color: primary }} />,
      Shield: <Shield size={36} style={{ color: primary }} />,
      Users: <Users size={36} style={{ color: primary }} />,
      Heart: <Heart size={36} style={{ color: primary }} />,
      Flame: <Flame size={36} style={{ color: primary }} />
    };
    return icons[iconName] || <Brain size={36} style={{ color: primary }} />;
  };

  const specializations = Array.isArray(typedSpecializationsData)
    ? [...typedSpecializationsData].sort((a, b) => a.order - b.order)
    : [];

  if (specializations.length === 0) return null;

  return (
    <section id="specializations" className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">Specjalizacje</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferuję profesjonalną pomoc w następujących obszarach:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specializations.map((specialization, index) => (
            <div
              key={specialization.id || index}
              className={`card-shadow p-8 rounded-lg card-hover transition-all duration-700 delay-${index * 100} ${
                inView ? "opacity-100" : "opacity-0 translate-y-8"
              }`}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto"
                style={{ background: `${primary}10` }}
              >
                {getIcon(specialization.icon)}
              </div>

              <h3 className="text-xl font-bold mb-4 text-center">{specialization.title}</h3>
              <p className="text-gray-600 text-center">{specialization.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecializationsSection;
