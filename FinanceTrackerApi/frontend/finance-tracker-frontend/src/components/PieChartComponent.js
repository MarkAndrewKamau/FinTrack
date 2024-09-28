"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Tooltip } from "recharts"; // Ensure all necessary imports from recharts

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"; // Adjusted path
import {
  ChartContainer,
  ChartTooltipContent,
} from "./ui/chart"; // Adjusted path

const chartData = [
  { category: "Expenses", amount: 1500, fill: "var(--color-expenses)" },
  { category: "Income", amount: 3000, fill: "var(--color-income)" },
  { category: "Budget", amount: 2000, fill: "var(--color-budget)" },
];

const PieChartComponent = () => {
  // Calculate total amount using useMemo for performance optimization
  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  // Render function for the label
  const renderLabel = ({ viewBox }) => {
    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
      return (
        <text
          x={viewBox.cx}
          y={viewBox.cy}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          <tspan
            x={viewBox.cx}
            y={viewBox.cy}
            className="fill-foreground text-3xl font-bold"
          >
            {totalAmount.toLocaleString()}
          </tspan>
          <tspan
            x={viewBox.cx}
            y={(viewBox.cy || 0) + 24}
            className="fill-muted-foreground"
          >
            Total
          </tspan>
        </text>
      );
    }
    return null; // Return null if viewBox is not valid
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Financial Overview</CardTitle>
        <CardDescription>Expenses, Income, and Budget</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              strokeWidth={5}
            >
              <Label content={renderLabel} />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Financial data summary <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Displaying the financial distribution between Expenses, Income, and Budget
        </div>
      </CardFooter>
    </Card>
  );
};

export default PieChartComponent;
