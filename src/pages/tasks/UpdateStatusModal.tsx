import { useState } from "react";
import type { Task } from "../../api/models/Task";
import { TaskStatus } from "../../enums/TaskStatus";

type UpdateStatusModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, status: TaskStatus) => void;
  task: Task;
};

const statusColors = {
  [TaskStatus.PENDING]: "bg-slate-200 text-slate-800",
  [TaskStatus.IN_PROGRESS]: "bg-blue-200 text-blue-800",
  [TaskStatus.COMPLETED]: "bg-green-200 text-green-800",
};

const statusIcons = {
  [TaskStatus.PENDING]: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  [TaskStatus.IN_PROGRESS]: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M12 4h9" />
      <circle cx="4" cy="12" r="2" />
    </svg>
  ),
  [TaskStatus.COMPLETED]: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
};

export default function UpdateStatusModal({
  isOpen,
  onClose,
  task,
  onUpdate,
}: UpdateStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState(task.status);

  if (!isOpen) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-10" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 transform transition-all scale-100">
          <h2 className="text-xl font-semibold text-center mb-6">
            Update Task Status for {task.title}
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {Object.values(TaskStatus).map((status) => {
              const isSelected = selectedStatus === status;
              return (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`flex flex-col items-center justify-center space-y-2 rounded-lg p-4 cursor-pointer transition-transform
                    ${
                      isSelected
                        ? `scale-110 ring-4 ring-orange-400 shadow-lg ${statusColors[status]}`
                        : `bg-gray-50 hover:bg-gray-200`
                    }`}
                >
                  {statusIcons[status]}
                  <span className="text-sm font-semibold text-center capitalize">
                    {status.replace("_", " ").toLowerCase()}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex justify-end mt-6 space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onUpdate(task.id!, selectedStatus!);
              }}
              className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
