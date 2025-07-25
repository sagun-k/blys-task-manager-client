import { useMemo } from "react";
import HorizontalTabLayout, {
  type TabItem,
} from "../../layouts/HorizontalTabLayout";
import TaskSummary from "../TaskSummary";
import AllTasks from "./AllTasks";
import { FeatureComingSoon } from "../../components/FeatureComingSoon";

export default function TaskPage() {
  const tabItems: TabItem[] = useMemo(
    () => [
      {
        id: "summary",
        name: "Summary",
        icon: (
          <svg
            className="w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17v-6m4 6V7m4 10V4M5 17v-2"
            />
          </svg>
        ),
        content: <TaskSummary />,
      },
      {
        id: "list",
        name: "List",
        icon: (
          <svg
            className="w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        ),
        content: <AllTasks />,
      },
      {
        id: "kanban",
        name: "Kanban",
        icon: (
          <svg
            className="w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 4h3v16H5zM10.5 4h3v16h-3zM16 4h3v16h-3z"
            />
          </svg>
        ),
        content: <FeatureComingSoon />,
      },
      {
        id: "backlog",
        name: "Backlog",
        icon: (
          <svg
            className="w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h10M4 18h6"
            />
          </svg>
        ),
        content: <FeatureComingSoon />,
      },
    ],
    []
  );

  return (
    <div className="p-6">
      <HorizontalTabLayout tabs={tabItems} />
    </div>
  );
}
