import React from "react";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Movie Enthusiast",
      avatar: "SJ",
      content:
        "Cup Entertainment has completely changed how I watch movies. The streaming quality is amazing and the selection is incredible!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "TV Series Fan",
      avatar: "MC",
      content:
        "I love how easy it is to find new shows and movies. The recommendation system is spot on and I discover something new every week.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Family Viewer",
      avatar: "ER",
      content:
        "Perfect for family movie nights! Great selection of content for all ages and the streaming never buffers. Highly recommend!",
      rating: 5,
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            What Our Users Say
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4">
            Don't just take our word for it. Here's what our amazing community
            of movie and TV show lovers have to say about Cup Entertainment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#1a1a1a] rounded-lg p-4 sm:p-6 lg:p-8 border border-gray-800 hover:border-purple-600 transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 group-hover:text-purple-400 transition-colors" />
              </div>

              <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base group-hover:text-gray-200 transition-colors">
                "{testimonial.content}"
              </p>

              <div className="flex items-center mb-4 sm:mb-6">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star
                    key={index}
                    className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current mr-1"
                  />
                ))}
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-3 sm:mr-4 text-sm sm:text-base group-hover:bg-purple-500 transition-colors">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm sm:text-base group-hover:text-purple-400 transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
