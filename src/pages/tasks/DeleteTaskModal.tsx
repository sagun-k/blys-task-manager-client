import type { Task } from "../../api/models/Task";
import LoadingButton from "../../components/common/LoadingButton";

type DeleteTaskModalProps = {
  task: Task;
  onClose: () => void;
  isDeleteing: boolean;
  handleDelete: (taskId: string) => void;
};

const DeleteTaskModal = ({
  task,
  onClose,
  isDeleteing,
  handleDelete,
}: DeleteTaskModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          {`Delete Task ${task.title} ?`}
        </h2>
        <h4 className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-lg font-medium">
          ⚠️ Deleting will permanently remove the data from our database.
        </h4>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors duration-200 font-medium text-sm"
          >
            Cancel
          </button>
          <LoadingButton
            isLoading={isDeleteing}
            onClick={() => handleDelete(task.id!)}
            type="button"
          >
            Delete
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
