import { useEffect, useState } from "react";
import { ArrowDown, Star, Calendar } from "lucide-react";
import { Link } from "react-scroll";
import { useInView } from "react-intersection-observer";
import heroData from "../data/hero.json";
import configData from "../data/config.json";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 pt-32"
      ref={ref}
    >
      {/* Tło z obrazem */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 brightness-125 contrast-105"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${heroData.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: `blur(${scrolled ? 2 : 0}px)`,
            transform: `scale(${scrolled ? 1.05 : 1})`,
            transition: "all 0.5s ease-out",
          }}
        ></div>

        {/* Dynamiczne plamy */}
        <div 
          className="absolute w-96 h-96 rounded-full top-1/4 left-1/4 blur-3xl"
          style={{
            backgroundColor: "var(--color-accent)",
            opacity: 0.15,
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            transition: "transform 0.2s ease-out",
          }}
        ></div>
        <div 
          className="absolute w-64 h-64 rounded-full bottom-1/4 right-1/3 blur-3xl"
          style={{
            backgroundColor: "var(--color-primary)",
            opacity: 0.25,
            transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>
      </div>

      <div className="container-custom relative z-10 flex flex-col items-center md:items-start">
        <div className="md:max-w-4xl lg:max-w-5xl">
          {/* Tagline */}
          <div
            className={`text-white font-medium text-lg md:text-xl mb-3 px-4 py-2 rounded-full inline-block transition-all duration-1000 ${
              inView ? "opacity-100" : "opacity-0 translate-y-8"
            }`}
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            Twoja droga do lepszego samopoczucia
          </div>

          {/* Główna karta */}
          <div 
            className={`bg-black/30 backdrop-blur-sm p-8 rounded-xl transition-all duration-1000 w-full ${
              inView ? "opacity-100" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              <span className="block md:inline font-montserrat">{configData.therapist.name}</span>
              <span
  className="text-3xl md:text-4xl lg:text-5xl mt-2 block"
  style={{ color: "var(--color-text-primary)" }}
>
  {configData.therapist.title}
</span>

            </h1>

            {/* Subheadline */}
            <p
              className={`text-xl md:text-2xl font-medium text-white mb-8 transition-all duration-1000 delay-300 ${
                inView ? "opacity-100" : "opacity-0 translate-y-8"
              }`}
            >
              {heroData.subheadline}
            </p>

            {/* Info-boxy */}
            <div className={`flex flex-wrap justify-center md:justify-start gap-4 mb-8 transition-all duration-1000 delay-400 ${
              inView ? "opacity-100" : "opacity-0 translate-y-8"
            }`}>
              <div className="flex items-center px-4 py-2 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                <Star style={{ color: "#facc15" }} className="mr-2" size={18} />
                <span className="text-white">Ponad 500 zadowolonych pacjentów</span>
              </div>

              <div className="flex items-center px-4 py-2 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                <Calendar style={{ color: "white" }} className="mr-2" size={18} />
                <span className="text-white">Pierwsze spotkanie w ciągu 7 dni</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="contact"
              smooth={true}
              duration={800}
              className={`text-lg px-8 py-4 font-medium inline-block cursor-pointer transition-all duration-1000 delay-500 
                relative overflow-hidden group hover:shadow-xl rounded-full text-white`}
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <span className="relative z-10">{heroData.ctaText}</span>
              <span className="absolute inset-0 bg-white/40 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Link>

            {/* Dostępność */}
            <p className={`text-white mt-4 transition-all duration-1000 delay-600 ${
              inView ? "opacity-100" : "opacity-0"
            }`}>
              Konsultacje stacjonarne w Warszawie i online
            </p>
          </div>
        </div>
      </div>

      {/* Strzałka */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <Link 
          to="about" 
          smooth={true} 
          duration={800} 
          aria-label="Przewiń w dół"
        >
          <div className="p-3 rounded-full transition-all" style={{ backgroundColor: "rgba(255,255,255,0.3)" }}>
            <ArrowDown size={24} />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
