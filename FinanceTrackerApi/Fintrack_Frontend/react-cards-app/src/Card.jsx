import React from 'react';

function Card({ title, description, image, icon, children }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center mb-4">
          {icon && <div className="mr-4">{icon}</div>}
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
}

export default Card;
