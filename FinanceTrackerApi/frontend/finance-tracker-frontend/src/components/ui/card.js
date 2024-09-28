import React from 'react';

export const Card = ({ className, children }) => (
  <div className={`p-4 bg-white shadow rounded ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ className, children }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ className, children }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ className, children }) => (
  <div className={`mt-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-xl font-bold">{children}</h2>
);

export const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-600">{children}</p>
);
