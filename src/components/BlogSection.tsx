
import { useInView } from "react-intersection-observer";
import { Calendar } from "lucide-react";
import websiteContent from "../data/BlogSecion.json";

const BlogSection = () => {
  const { blogSection } = websiteContent;
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="blog" className="section-padding bg-backgroundLight" ref={ref}>
      <div className="container-custom">
        <div className="text-center mb-16">
        <h2 className="section-title mb-4">
  {blogSection.title}
</h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {blogSection.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogSection.articles.map((article, index) => (
            <a 
              key={index}
              href={article.url}
              className={`group card-shadow overflow-hidden rounded-lg transition-all duration-700 delay-${index * 100} ${
                inView ? "opacity-100" : "opacity-0 translate-y-8"
              } hover:shadow-xl`}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={article.imageUrl} 
                  alt={article.imageAlt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar size={16} className="mr-2" />
                  <span>{formatDate(article.date)}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <p className="text-primary font-medium group-hover:underline">
                  {blogSection.readMoreText}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
