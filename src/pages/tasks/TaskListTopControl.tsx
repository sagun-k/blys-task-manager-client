import type { Dispatch, SetStateAction } from "react";
import type { Order, Sort } from "./AllTasks";
import { ViewMode } from "../../enums/ViewMode";

type TaskListTopControlProps = {
  sortBy: Sort;
  setSortBy: Dispatch<SetStateAction<Sort>>;
  sortOrder: Order;
  setSortOrder: Dispatch<SetStateAction<Order>>;
  handleAddTask: () => void;
  setViewMode: Dispatch<SetStateAction<ViewMode>>;
  viewMode: ViewMode;
};

const TaskListTopControl = ({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  handleAddTask,
  setViewMode,
  viewMode,
}: TaskListTopControlProps) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as Sort)}
          className="px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-sm"
        >
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="status">Sort by Status</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as Order)}
          className="px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-sm"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        {/* View Toggle Buttons */}
        <div className="flex border border-slate-300 rounded-xl overflow-hidden">
          {viewMode === ViewMode.Card ? (
            <button
              onClick={() => setViewMode(ViewMode.Table)}
              className="p-2 flex items-center justify-center bg-white text-slate-700 hover:bg-slate-100"
              title="Switch to Table View"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 10h18M3 6h18M3 14h18M3 18h18" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setViewMode(ViewMode.Card)}
              className="p-2 flex items-center justify-center bg-white text-slate-700 hover:bg-slate-100"
              title="Switch to Card View"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h4v4H4zM10 6h4v4h-4zM16 6h4v4h-4zM4 12h4v4H4zM10 12h4v4h-4zM16 12h4v4h-4z" />
              </svg>
            </button>
          )}
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
    </div>
  );
};

export default TaskListTopControl;
