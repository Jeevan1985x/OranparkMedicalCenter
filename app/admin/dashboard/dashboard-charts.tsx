"use client";
 
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import type { AdminDashboardData } from "@/types";
 
// --- Props Interface for the Charts Component ---
type DashboardChartsProps = {
  revenueAnalyticsData: AdminDashboardData["revenueAnalyticsData"];
  departmentRevenueData: AdminDashboardData["departmentRevenueData"];
};
 
// --- Helper Functions
const formatCurrency = (value: number) => {
  if (typeof value !== "number") return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
 
const formatTooltipValue = (value: unknown) => {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const numericValue =
    typeof rawValue === "number" ? rawValue : Number(rawValue ?? 0);
  return formatCurrency(Number.isFinite(numericValue) ? numericValue : 0);
};

const renderSimpleLabel = ({
  name,
  percent,
}: {
  name?: string;
  percent?: number;
}) => {
  if (!name || percent === undefined || percent < 0.05) {
    return null;
  }
  return `${name}`;
};
 
export default function DashboardCharts({
  revenueAnalyticsData,
  departmentRevenueData,
}: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Analytics Card */}
      <Card className="p-6 rounded-lg border-border-2">
        <CardHeader className="p-0">
          <CardTitle className="body-semibold text-text-title">
            Revenue Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          {revenueAnalyticsData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={revenueAnalyticsData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e0e0e0"
                />
 
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                />
 
                {/* It's good practice to format the Y-axis for large numbers */}
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  tickFormatter={(value) => `$${Number(value) / 1000}k`}
                />
 
                {/* A formatted tooltip improves user experience */}
                <Tooltip formatter={formatTooltipValue} />
 
                <Line
                  type="monotone"
                  dataKey="Revenue"
                  stroke="#4A90E2"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No revenue data available for this period.
            </div>
          )}
        </CardContent>
      </Card>
      {/* Department Revenue Card */}
      <Card className="p-6 rounded-lg border-border-2">
        <CardHeader className="p-0">
          <CardTitle className="body-semibold text-text-title">
            Department Revenue Distribution
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          {departmentRevenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentRevenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={renderSimpleLabel}
                  innerRadius={65}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={0}
                  dataKey="value"
                >
                  {departmentRevenueData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip formatter={formatTooltipValue} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] w-full flex items-center justify-center text-gray-500">
              No department revenue data available.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}