"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { Cell } from "recharts";

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
} from "./ui/chart"; // Adjusted path

// Replace this with your actual user data
const userData = {
  expenses: 1500,
  income: 3000,
  budget: 2000,
};

const chartData = [
  { category: "Expenses", amount: userData.expenses, fill: "#ff6384" }, // Light Red
  { category: "Income", amount: userData.income, fill: "#36a2eb" },   // Light Blue
  { category: "Budget", amount: userData.budget, fill: "#ffce56" },   // Light Yellow
];

const PieChartComponent = () => {
  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Financial Overview</CardTitle>
        <CardDescription>Expenses, Income, and Budget</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <Label
              content={({ viewBox }) => {
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
              }}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              strokeWidth={5}
              isAnimationActive={false} // Disable animation for better performance
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
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
