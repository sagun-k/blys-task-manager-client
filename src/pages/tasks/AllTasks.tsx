import { useEffect, useState } from "react";
import type { CreateOrUpdateTaskModel } from "../../api/models/CreateOrUpdateTaskModel";
import type { Task } from "../../api/models/Task";
import { TaskService } from "../../api/services/TaskService";
import type { TaskStatus } from "../../enums/TaskStatus";
import { ViewMode } from "../../enums/ViewMode";
import { ToasUtils } from "../../utils/ToastUtils";
import AddOrUpdateTaskModal from "./AddOrUpdateTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import PaginationControl from "./PaginationControl";
import TaskLists from "./TaskLists";
import TaskListTopControl from "./TaskListTopControl";
import UpdateStatusModal from "./UpdateStatusModal";

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

const AllTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 0,
  });
  const [sortBy, setSortBy] = useState<Sort>(Sort.CreatedAt);
  const [sortOrder, setSortOrder] = useState<Order>(Order.Asc);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);

  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Card);

  const loadTasks = async (page = 1, limit = 5) => {
    setLoading(true);
    try {
      const response = await TaskService.getTasks(
        page,
        limit,
        sortBy,
        sortOrder
      );
      setTasks(response?.data ?? []);
      setPagination({
        page: page as number,
        limit: limit as number,
        total: response?.total as number,
        totalPages: response?.totalPages as number,
      });
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(1, pagination.limit);
  }, [sortBy, sortOrder, pagination.limit]);

  const handleAddTask = () => {
    setEditingTask(undefined);
    setShowModal(true);
  };

  const openDeleteTaskModal = (task: Task) => {
    setEditingTask(task);
    setShowDeleteModal(true);
  };

  const openUpdateStatusModal = (task: Task) => {
    setEditingTask(task);
    setShowUpdateStatusModal(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      setIsDeleting(true);
      await TaskService.deleteTask(taskId);
      ToasUtils.showSuccessToast(`Successfully deleted`);
      loadTasks(pagination.page);
      setShowDeleteModal(() => false);
    } catch (err) {
      ToasUtils.showErrorToast("Error", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmitTask = async (values: CreateOrUpdateTaskModel) => {
    try {
      await TaskService.createOrUpdateTask(values);
      ToasUtils.showSuccessToast(
        `Successfully ${values.id ? "updated" : "created"} task`
      );
      loadTasks(pagination.page);
      setShowModal(() => false);
    } catch (err) {
      ToasUtils.showErrorToast("Error", err);
    }
  };

  const updateStatus = async (id: string, status: TaskStatus) => {
    try {
      await TaskService.updateStatus(id, status);
      ToasUtils.showSuccessToast("Successfully updated the task");
      setShowUpdateStatusModal((p) => !p);
      loadTasks(pagination.page);
    } catch (err) {
      ToasUtils.showErrorToast("Error while updating status", err);
    }
  };

  const handlePageChange = (page: number) => {
    loadTasks(page, pagination.limit);
  };


  return (
    <>
      <TaskListTopControl
        setSortBy={setSortBy}
        sortBy={sortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        handleAddTask={handleAddTask}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <TaskLists
        isLoading={loading}
        tasks={tasks}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        handleAddTask={handleAddTask}
        openDeleteTaskModal={openDeleteTaskModal}
        viewMode={viewMode}
        openUpdateStatusModal={openUpdateStatusModal}
      />
      <PaginationControl
        pagination={pagination}
        handlePageChange={handlePageChange}
        loading={loading}
        setPagination={setPagination}
      />

      {showModal && (
        <AddOrUpdateTaskModal
          editingTask={editingTask!}
          onClose={() => setShowModal(false)}
          handleSubmitTask={handleSubmitTask}
        />
      )}

      {showDeleteModal && (
        <DeleteTaskModal
          isDeleteing={isDeleting}
          task={editingTask!}
          onClose={() => setShowDeleteModal(false)}
          handleDelete={handleDeleteTask}
        />
      )}
      {showUpdateStatusModal && (
        <UpdateStatusModal
          isOpen={showUpdateStatusModal}
          onClose={() => setShowUpdateStatusModal(false)}
          task={editingTask!}
          onUpdate={updateStatus}
        />
      )}
    </>
  );
};

export default AllTasks;
