import React from "react";

const FeatureCard = ({ title, subtitle, image, bgColor = "bg-green-200" }) => {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105 ${bgColor}`}
    >
      {/* صورة */}
      <div className="flex-1 flex items-end justify-center overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full object-cover max-h-40"
        />
      </div>

      {/* النص */}
      <div className="p-4">
        <p className="text-sm text-gray-700">{subtitle}</p>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
    </div>
  );
};

export default FeatureCard;
