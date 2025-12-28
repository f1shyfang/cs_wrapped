"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface LanguageChartProps {
  languages: { name: string; percentage: number; color: string }[];
}

export default function LanguageChart({ languages }: LanguageChartProps) {
  const data = languages.map((lang) => ({
    name: lang.name,
    value: lang.percentage,
    color: lang.color,
  }));

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full h-64"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            animationBegin={0}
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              border: "none",
              borderRadius: "8px",
              color: "white",
            }}
            formatter={(value) => [`${value}%`, "Usage"]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {languages.slice(0, 5).map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
            className="flex items-center gap-2"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-sm text-white/80">{lang.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
