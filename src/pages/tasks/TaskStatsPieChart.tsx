import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";
import type { TaskStats } from "../../api/models/TaskStats";

const getDataFromStats = (taskStats: TaskStats) => [
  {
    name: "Pending",
    value: taskStats.status?.pending ?? 0,
    color: "#fbbf24", // yellow-400
  },
  {
    name: "In Progress",
    value:  taskStats.status?.inProgress ?? 0,
    color: "#3b82f6", // blue-500
  },
  {
    name: "Completed",
    value:  taskStats.status?.completed ?? 0,
    color: "#10b981", // green-500
  },
];

type Props = {
  stats: TaskStats;
};

const TaskStatsPieChart = ({ stats }: Props) => {
  const data = getDataFromStats(stats);
  const total = stats.total ?? data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Task Status Distribution
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              labelLine={false}
              label={({ percent }) =>
                `${(percent! * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Label
                value={total > 0 ? `${total} Tasks` : "No Tasks"}
                position="center"
                className="text-slate-600 text-sm"
              />
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" iconType="circle" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskStatsPieChart;
