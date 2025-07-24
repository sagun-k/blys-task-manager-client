import type { Dispatch, SetStateAction } from "react";
import type { Order, Sort } from "./AllTasks";

type TaskListTopControlProps = {
  sortBy: Sort;
  setSortBy: Dispatch<SetStateAction<Sort>>;
  sortOrder: Order;
  setSortOrder: Dispatch<SetStateAction<Order>>;
  handleAddTask: () => void;
};

const TaskListTopControl = ({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  handleAddTask,
}: TaskListTopControlProps) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-sm"
          >
            <option value="createdAt">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="status">Sort by Status</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
            className="px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-sm"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
        <button
          onClick={handleAddTask}
          className="bg-orange-600 text-white px-6 py-2.5 rounded-xl hover:bg-orange-700 focus:ring-4 focus:ring-orange-200 transition-all duration-200 font-medium text-sm flex items-center space-x-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add Task</span>
        </button>
      </div>
    </>
  );
};

export default TaskListTopControl;
