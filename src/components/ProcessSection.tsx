import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Phone, CalendarPlus, ClipboardList, Clock, BarChart } from "lucide-react";
import processData from "../data/process.json";
import configData from "../data/config.json";
import { ConfigData, ProcessData } from "../../types";

const typedConfigData = configData as ConfigData;
const typedProcessData = processData as ProcessData;

const ProcessSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const { primary, accent, secondary, backgroundLight, white } = typedConfigData.colors;
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      Phone: <Phone size={36} style={{ color: primary }} />,
      CalendarPlus: <CalendarPlus size={36} style={{ color: primary }} />,
      ClipboardList: <ClipboardList size={36} style={{ color: primary }} />,
      Clock: <Clock size={36} style={{ color: primary }} />,
      BarChart: <BarChart size={36} style={{ color: primary }} />,
    };
    return icons[iconName] || <ClipboardList size={36} style={{ color: primary }} />;
  };

  useEffect(() => {
    if (inView) {
      stepsRef.current.forEach((step, index) => {
        if (step) {
          setTimeout(() => {
            step.classList.add("opacity-100", "translate-y-0");
            step.classList.remove("opacity-0", "translate-y-8");
          }, 200 * index);
        }
      });
    }
  }, [inView]);

  const steps = Array.isArray(typedProcessData.steps) ? [...typedProcessData.steps] : [];
  const sortedSteps = steps.sort((a, b) => a.order - b.order);

  const hasContent = sortedSteps.length > 0 || typedProcessData.title || typedProcessData.description;
  if (!hasContent) return null;

  return (
    <section id="process" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 -z-10" style={{ background: backgroundLight }}>
        <div className="absolute top-0 left-0 w-full h-20" style={{ background: `linear-gradient(to bottom, ${white}, transparent)` }}></div>
        <div className="absolute bottom-0 left-0 w-full h-20" style={{ background: `linear-gradient(to top, ${white}, transparent)` }}></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl" style={{ background: `${primary}05` }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: `${accent}05` }}></div>
      </div>

      <div className="container-custom">
        {(typedProcessData.title || typedProcessData.description) && (
          <div className="text-center mb-16 relative">
            {typedProcessData.title && (
              <h2 className="section-title">{typedProcessData.title}</h2>
            )}
            {typedProcessData.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{typedProcessData.description}</p>
            )}
            <div className="absolute -z-10 left-1/2 transform -translate-x-1/2 top-0 w-32 h-8 blur-xl" style={{ background: `${primary}10` }}></div>
          </div>
        )}

        {sortedSteps.length > 0 && (
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-1/2 top-10 bottom-10 w-1 hidden lg:block" style={{ background: `linear-gradient(to bottom, ${primary}30, ${accent}30, ${secondary}30)` }}></div>

            {sortedSteps.map((step, index) => (
              <div
                key={step.id || index}
                ref={el => stepsRef.current[index] = el}
                className={`flex flex-col lg:flex-row items-center mb-16 lg:mb-32 opacity-0 translate-y-8 transition-all duration-700 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse text-right'
                }`}
              >
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'}`}>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">
                    <span style={{ color: primary }} className="font-light mr-2">0{index + 1}.</span> {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                <div className="my-6 lg:my-0 z-10">
                  <div className="relative">
                    <div
                      className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300 hover:border-primary"
                      style={{
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: `${primary}20`
                      }}
                    >
                      {getIcon(step.icon)}
                    </div>
                    <div className="absolute -inset-2 rounded-full -z-10 blur-lg" style={{ background: `${primary}10` }}></div>
                  </div>
                </div>

                <div className="w-full lg:w-5/12"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProcessSection;
