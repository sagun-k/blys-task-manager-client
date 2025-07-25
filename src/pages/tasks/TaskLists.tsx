import type { Task } from "../../api/models/Task";
import { ViewMode } from "../../enums/ViewMode";
import TaskCardView from "./TaskCardView";
import TaskTableView from "./TaskTableView";

type TaskListsProps = {
  isLoading: boolean;
  tasks: Task[];
  handleEditTask: (task: Task) => void;
  handleDeleteTask: (taskId: string) => void;
  handleAddTask: () => void;
  openDeleteTaskModal: (task: Task) => void;
  openUpdateStatusModal: (task: Task) => void;
  viewMode: ViewMode;
};

const TaskLists = ({
  isLoading,
  tasks,
  handleEditTask,
  handleAddTask,
  openDeleteTaskModal,
  viewMode,
  openUpdateStatusModal,
}: TaskListsProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        <span className="ml-3 text-slate-600">Loading tasks...</span>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">
          No tasks found
        </h3>
        <p className="text-slate-500 mb-6">
          Create your first task to get started!
        </p>
        <button
          onClick={handleAddTask}
          className="bg-orange-600 text-white px-6 py-2.5 rounded-xl hover:bg-orange-700 transition-colors duration-200 font-medium"
        >
          Create Task
        </button>
      </div>
    );
  }

  if (viewMode === ViewMode.Card) {
    return (
      <TaskCardView
        tasks={tasks}
        isLoading={isLoading}
        handleEditTask={handleEditTask}
        openDeleteTaskModal={openDeleteTaskModal}
        openUpdateStatusModal={openUpdateStatusModal}
      />
    );
  } else {
    return (
      <TaskTableView
        tasks={tasks}
        isLoading={isLoading}
        handleEditTask={handleEditTask}
        openDeleteTaskModal={openDeleteTaskModal}
        openUpdateStatusModal={openUpdateStatusModal}
      />
    );
  }
};

export default TaskLists;
