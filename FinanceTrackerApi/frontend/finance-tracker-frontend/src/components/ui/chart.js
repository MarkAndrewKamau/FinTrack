import React from 'react';
import { Tooltip } from 'recharts';

export const ChartContainer = ({ className, children }) => (
  <div className={`relative ${className}`}>
    {children}
  </div>
);

export const ChartTooltip = ({ cursor, content }) => (
  <Tooltip cursor={cursor} content={content} />
);

export const ChartTooltipContent = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white shadow rounded">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
