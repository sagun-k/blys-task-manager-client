import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { TaskStats } from "../../api/models/TaskStats";

const getDataFromStats = (taskStats: TaskStats) => [
  {
    name: "High",
    value: taskStats?.priority?.high ?? 0,
    color: "#ef4444",
  },
  {
    name: "Medium",
    value: taskStats?.priority?.medium ?? 0,
    color: "#f59e0b",
  },
  {
    name: "Low",
    value: taskStats?.priority?.low ?? 0,
    color: "#0ea5e9",
  },
];



type Props = {
  stats: TaskStats;
};

const TaskStatsBarChart = ({ stats }: Props) => {
  const data = getDataFromStats(stats);

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Task Status Overview
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <XAxis dataKey="name" stroke="#64748b" /> {/* slate-500 */}
            <YAxis allowDecimals={false} stroke="#64748b" />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} label={{ position: "top" }}>
              {data.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {stats.total !== undefined && (
        <div className="text-sm text-slate-500 mt-4 text-right">
          Total Tasks: <span className="font-medium text-slate-700">{stats.total}</span>
        </div>
      )}
    </div>
  );
};

export default TaskStatsBarChart;
