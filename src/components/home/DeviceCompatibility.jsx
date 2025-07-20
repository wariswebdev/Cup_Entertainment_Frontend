import React from "react";
import {
  Smartphone,
  Tablet,
  Tv,
  Laptop,
  Gamepad2,
  RectangleGoggles,
} from "lucide-react";

const DeviceCompatibility = () => {
  const devices = [
    {
      icon: Smartphone,
      name: "Smartphones",
      description:
        "Cup Entertainment is optimized for both Android and iOS smartphones. Download our app from the Play Store or the App Store.",
      color: "bg-purple-600",
    },
    {
      icon: Tablet,
      name: "Tablet",
      description:
        "Cup Entertainment is optimized for both Android and iOS smartphones. Download our app from the Play Store or the App Store.",
      color: "bg-pink-600",
    },
    {
      icon: Tv,
      name: "Smart TV",
      description:
        "Cup Entertainment is optimized for both Android and iOS smartphones. Download our app from the Play Store or the App Store.",
      color: "bg-purple-600",
    },
    {
      icon: Laptop,
      name: "Laptops",
      description:
        "Cup Entertainment is optimized for both Android and iOS smartphones. Download our app from the Play Store or the App Store.",
      color: "bg-pink-600",
    },
    {
      icon: Gamepad2,
      name: "Gaming Consoles",
      description:
        "Cup Entertainment is optimized for both Android and iOS smartphones. Download our app from the Play Store or the App Store.",
      color: "bg-pink-600",
    },
    {
      icon: RectangleGoggles,
      name: "VR Headsets",
      description:
        "Cup Entertainment is optimized for both Android and iOS smartphones. Download our app from the Play Store or the App Store.",
      color: "bg-pink-600",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#141414] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            We Provide you streaming experience across various devices.
          </h2>
          <p className="text-gray-400 max-w-4xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4">
            With Cup Entertainment, you can enjoy your favorite movies and TV
            shows anytime, anywhere. Our platform is designed to be compatible
            with a wide range of devices, ensuring that you never miss a moment
            of entertainment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {devices.map((device, index) => {
            const IconComponent = device.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-r from-[#0f0f0f] to-[#230d0d] rounded-lg p-4 sm:p-6 lg:p-8 hover:bg-[#202020] transition-all duration-300 border border-gray-800 hover:border-[#af3494] group transform hover:scale-105"
              >
                <div
                  className={`bg-[#141414] w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 border border-gray-700 group-hover:border-[#af3494] transition-all duration-300`}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[#af3494]" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 text-white group-hover:text-[#af3494] transition-colors">
                  {device.name}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors">
                  {device.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DeviceCompatibility;
