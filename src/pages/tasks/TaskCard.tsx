import type { Task } from "../../api/models/Task";
import { Priority } from "../../enums/Priority";
import { TaskStatus } from "../../enums/TaskStatus";
import { DateUtils } from "../../utils/DateUtils";

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  openDeleteTaskModal: (task: Task) => void;
  openUpdateStatusModal: (task: Task) => void;
};

const TaskCard = ({
  task,
  onEdit,
  openDeleteTaskModal,
  openUpdateStatusModal,
}: TaskCardProps) => {
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return "bg-red-100 text-red-700 border-red-200";
      case Priority.MEDIUM:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case Priority.LOW:
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return "bg-green-100 text-green-700 border-green-200";
      case TaskStatus.IN_PROGRESS:
        return "bg-blue-100 text-blue-700 border-blue-200";
      case TaskStatus.PENDING:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const isOverdue = () => {
    if (!task.endDate) return false;
    const now = new Date();
    const end = new Date(task.endDate);
    // Compare dates only (ignore time)
    return end.setHours(0, 0, 0, 0) < now.setHours(0, 0, 0, 0);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-200 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors duration-200">
            {task.title}
          </h3>
          <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        </div>
        <div className="flex space-x-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
            title="Edit task"
            onClick={() => onEdit(task)}
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
            title="Delete task"
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
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
              task.status!
            )}`}
          >
            {task.status!.replace("-", " ")}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
              task.priority!
            )}`}
          >
            {task.priority}
          </span>
        </div>
        <div
          className={`text-xs ${
            isOverdue()
              ? "text-red-600 font-semibold flex items-center space-x-1"
              : "text-slate-500"
          }`}
        >
          <div className="flex">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Deadline:</span>
            <span>{DateUtils.formatDateTime(task.endDate!)}</span>
            {isOverdue() && (
              <span className="ml-2 font-bold uppercase text-sm">Overdue</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TaskCard;
