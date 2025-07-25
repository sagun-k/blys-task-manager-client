import { useEffect, useState } from "react";
import type { TaskStats } from "../api/models/TaskStats";
import { TaskService } from "../api/services/TaskService";
import LoadingScreen from "../components/LoadingScreen";
import TaskStatsBarChart from "./tasks/TaskBarChart";
import TaskStatsCards from "./tasks/TaskStatsCards";
import TaskStatsPieChart from "./tasks/TaskStatsPieChart";

const TaskSummary = () => {
  const [loading, setLoading] = useState(false);
  const defaultStats: TaskStats = {
    total: 0,
    status: {
      pending: 0,
      completed: 0,
      inProgress: 0,
    },
    priority: {
      high: 0,
      medium: 0,
      low: 0,
    },
  };
  const [taskStatsData, setTaskStatsData] = useState<TaskStats>(defaultStats);

  const getTaskStats = async () => {
    setLoading(true);
    try {
      const task = await TaskService.getTaskStats();
      setTaskStatsData(task!);
    } catch (err) {
      setTaskStatsData(defaultStats);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTaskStats();
  }, []);

  if (loading) return <LoadingScreen />;
  return (
    <>
      <TaskStatsCards stats={taskStatsData} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <TaskStatsBarChart stats={taskStatsData!} />
        <TaskStatsPieChart stats={taskStatsData!} />
      </div>
    </>
  );
};

export default TaskSummary;
