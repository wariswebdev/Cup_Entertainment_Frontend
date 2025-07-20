import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqData = [
    {
      question: "What is Cup Entertainment?",
      answer:
        "Cup Entertainment is a streaming service that allows you to watch movies and shows on demand.",
    },
    {
      question: "How much does Cup Entertainment cost?",
      answer:
        "Cup Entertainment offers various subscription plans starting from $9.99/month with different features and content access levels.",
    },
    {
      question: "What content is available on Cup Entertainment?",
      answer:
        "We offer a wide variety of content including movies, TV shows, documentaries, and original series across multiple genres.",
    },
    {
      question: "How can I watch Cup Entertainment?",
      answer:
        "You can watch Cup Entertainment on various devices including smartphones, tablets, smart TVs, laptops, gaming consoles, and VR headsets.",
    },
    {
      question: "How do I sign up for Cup Entertainment?",
      answer:
        "You can sign up by visiting our website, choosing a subscription plan, and creating your account with a valid email address.",
    },
    {
      question: "What is the Cup Entertainment free trial?",
      answer:
        "We offer a 30-day free trial for new subscribers to explore our content library and features before committing to a paid subscription.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact our customer support through live chat, email, or phone. Our support team is available 24/7 to assist you.",
    },
    {
      question: "What are the payment methods?",
      answer:
        "We accept various payment methods including credit cards, debit cards, PayPal, and digital wallets for your convenience.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#141414] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto px-4">
            Got questions? We've got answers! Check out our FAQ section to find
            answers to the most common questions about Cup Entertainment.
          </p>
          <button className="bg-[#c12790] hover:bg-[#a91f7a] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base font-medium touch-manipulation">
            Ask a Question
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-colors"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between bg-[#1a1a1a] hover:bg-[#202020] transition-colors touch-manipulation"
              >
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                  <span className="text-[#c12790] font-semibold text-xs sm:text-sm flex-shrink-0">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="font-medium text-sm sm:text-base lg:text-lg text-white pr-4">
                    {item.question}
                  </span>
                </div>
                <div className="flex-shrink-0">
                  {openItems[index] ? (
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-[#c12790]" />
                  ) : (
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-[#c12790]" />
                  )}
                </div>
              </button>

              {openItems[index] && (
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#161616] border-t border-gray-700 animate-fadeIn">
                  <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
