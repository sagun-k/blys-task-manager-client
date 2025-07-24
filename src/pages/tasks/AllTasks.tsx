import type { Dispatch, SetStateAction } from "react";
import type { Task } from "../../api/models/Task";
import PaginationControl from "./PaginationControl";
import TaskLists from "./TaskLists";
import TaskListTopControl from "./TaskListTopControl";

export enum Sort {
  CreatedAt = "createdAt",
  Priority = "priority",
  Status = "status",
}

export enum Order {
  Asc = "asc",
  Desc = "desc",
}

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type AllTasksProps = {
  isLoading: boolean;
  tasks: Task[];
  sortBy: Sort;
  setSortBy: Dispatch<SetStateAction<Sort>>;
  sortOrder: Order;
  setSortOrder: Dispatch<SetStateAction<Order>>;
  handleAddTask: () => void;
  handleEditTask: (task: Task) => void;
  handleDeleteTask: (taskId: string) => void;
  pagination: Pagination;
  handlePageChange: (page: number) => void;
  loading: boolean;
  openDeleteTaskModal: (task: Task) => void
};

const AllTasks = ({
  isLoading,
  tasks,
  sortBy,
  setSortBy,
  setSortOrder,
  sortOrder,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
  pagination,
  handlePageChange,
  loading,
  openDeleteTaskModal
}: AllTasksProps) => {
  return (
    <>
      <TaskListTopControl
        setSortBy={setSortBy}
        sortBy={sortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        handleAddTask={handleAddTask}
      />
      <TaskLists
        isLoading={isLoading}
        tasks={tasks}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        handleAddTask={handleAddTask}
        openDeleteTaskModal={openDeleteTaskModal}
      />
      <PaginationControl
        pagination={pagination}
        handlePageChange={handlePageChange}
        loading={loading}
      />
    </>
  );
};

export default AllTasks;
