import type { Task } from "../../api/models/Task";
import { TaskStatus } from "../../enums/TaskStatus";
import { DateUtils } from "../../utils/DateUtils";

type TaskTableViewProps = {
  tasks: Task[];
  isLoading: boolean;
  handleEditTask: (task: Task) => void;
  openDeleteTaskModal: (task: Task) => void;
  openUpdateStatusModal: (task: Task) => void;
};

const TaskTableView = ({
  tasks,
  isLoading,
  handleEditTask,
  openDeleteTaskModal,
  openUpdateStatusModal,
}: TaskTableViewProps) => {
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
      <div className="text-center py-12 text-slate-600">No tasks found.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-xl overflow-hidden bg-white shadow-sm text-sm">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="px-4 py-3 font-medium text-slate-700">Title</th>
            <th className="px-4 py-3 font-medium text-slate-700">Status</th>
            <th className="px-4 py-3 font-medium text-slate-700">Priority</th>
            <th className="px-4 py-3 font-medium text-slate-700">Deadline</th>
            <th className="px-4 py-3 font-medium text-slate-700">Created At</th>
            <th className="px-4 py-3 font-medium text-slate-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t hover:bg-slate-50">
              <td className="px-4 py-3 text-slate-900">{task.title}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.status === TaskStatus.COMPLETED
                      ? "bg-green-100 text-green-700"
                      : task.status === TaskStatus.PENDING
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="px-4 py-3 capitalize">{task.priority}</td>
              <td className="px-4 py-3">
                {DateUtils.formatDateTime(task.endDate!)}
              </td>
              <td className="px-4 py-3">
                {DateUtils.formatDateTime(task.createdAt!, true)}
              </td>
              <td className="px-4 py-3 space-x-2">
                <button
                  title="Update status"
                  onClick={() => {
                    openUpdateStatusModal(task);
                  }} // Replace with your handler
                  className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 12l2 2 4-4M7 21h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleEditTask(task)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => openDeleteTaskModal(task)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTableView;
