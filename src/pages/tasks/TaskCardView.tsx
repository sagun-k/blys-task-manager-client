import type { Task } from "../../api/models/Task";
import TaskCard from "./TaskCard";

type TaskCardViewProps = {
  tasks: Task[];
  isLoading: boolean;
  handleEditTask: (task: Task) => void;
  openDeleteTaskModal: (task: Task) => void;
  openUpdateStatusModal: (task: Task) => void;
};

const TaskCardView = ({
  tasks,
  isLoading,
  handleEditTask,
  openDeleteTaskModal,
  openUpdateStatusModal,
}: TaskCardViewProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        <span className="ml-3 text-slate-600">Loading tasks...</span>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={handleEditTask}
            openDeleteTaskModal={openDeleteTaskModal}
            openUpdateStatusModal={openUpdateStatusModal}
          />
        ))}
      </div>
    </>
  );
};

export default TaskCardView;
