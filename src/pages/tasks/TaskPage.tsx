import { useEffect, useState } from "react";
import type { CreateOrUpdateTaskModel } from "../../api/models/CreateOrUpdateTaskModel";
import type { Task } from "../../api/models/Task";
import type { TaskStats as ApiTaskStats } from "../../api/models/TaskStats";
import { TaskService } from "../../api/services/TaskService";
import { ToasUtils } from "../../utils/ToastUtils";
import AddOrUpdateTaskModal from "./AddOrUpdateTaskModal";
import AllTasks, { Order, Sort } from "./AllTasks";
import DeleteTaskModal from "./DeleteTaskModal";
import TaskStatsCards from "./TaskStatsCards";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 0,
  });
  const [sortBy, setSortBy] = useState<Sort>(Sort.CreatedAt);
  const [sortOrder, setSortOrder] = useState<Order>(Order.Asc);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [isDeleting, setIsDeleting] = useState(false);
  const defaultStats: ApiTaskStats = {
    total: 0,
    pending: 0,
    completed: 0,
    inProgress: 0,
  };
  const [taskStatsData, setTaskStatsData] =
    useState<ApiTaskStats>(defaultStats);

  const loadTasks = async (page = 1) => {
    setLoading(true);
    try {
      const response = await TaskService.getTasks(
        page,
        pagination.limit,
        sortBy,
        sortOrder
      );
      setTasks(response?.data ?? []);
      setPagination({
        page: response?.page as number,
        limit: response?.limit as number,
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
    loadTasks(1);
  }, [sortBy, sortOrder]);

  const handleAddTask = () => {
    setEditingTask(undefined);
    setShowModal(true);
  };

  const openDeleteTaskModal = (task: Task) => {
    setEditingTask(task);
    setShowDeleteModal(true);
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
      getTaskStats()
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
      getTaskStats()
      setShowModal(() => false);
    } catch (err) {
      ToasUtils.showErrorToast("Error", err);
    }
  };

  const getTaskStats = async () => {
    setLoading(true);
    try {
      const task = await TaskService.getTaskStats();
      setTaskStatsData(task!);
    } catch (err) {
      setTaskStatsData(defaultStats);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    loadTasks(page);
  };

  useEffect(() => {
    getTaskStats();
  }, []);

  return (
    <div className="p-6">
      <TaskStatsCards loading={loading} stats={taskStatsData} />
      <AllTasks
        tasks={tasks}
        loading={loading}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        handleAddTask={handleAddTask}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        pagination={pagination}
        handlePageChange={handlePageChange}
        isLoading={false}
        openDeleteTaskModal={openDeleteTaskModal}
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
    </div>
  );
}
