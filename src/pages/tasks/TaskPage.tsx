import { useMemo } from "react";
import HorizontalTabLayout, {
  type TabItem,
} from "../../layouts/HorizontalTabLayout";
import TaskSummary from "../TaskSummary";
import AllTasks from "./AllTasks";

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
    ],
    []
  );

  return (
    <div className="p-6">
      <HorizontalTabLayout tabs={tabItems} />
    </div>
  );
}
