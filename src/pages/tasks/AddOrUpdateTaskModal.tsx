import { useFormik } from "formik";
import { taskSchema } from "../../utils/validation";
import type { Task } from "../../api/models/Task";
import type { CreateOrUpdateTaskModel } from "../../api/models/CreateOrUpdateTaskModel";
import { Priority } from "../../enums/Priority";
import { DateUtils } from "../../utils/DateUtils";

type AddOrUpdateTaskModalProps = {
  editingTask: Task;
  handleSubmitTask: (request: CreateOrUpdateTaskModel) => Promise<void>;
  onClose: () => void;
};

const AddOrUpdateTaskModal = ({
  editingTask,
  handleSubmitTask,
  onClose,
}: AddOrUpdateTaskModalProps) => {
  const formik = useFormik<CreateOrUpdateTaskModel>({
    initialValues: {
      id:editingTask?.id,
      title: editingTask?.title || "",
      description: editingTask?.description || "",
      priority: editingTask?.priority || Priority.LOW,
      endDate: editingTask?.endDate || "",
    },
    validationSchema: taskSchema,
    onSubmit: handleSubmitTask,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          {editingTask ? "Edit Task" : "Create New Task"}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Title*
            </label>
            <input
              type="text"
              id="title"
              {...formik.getFieldProps("title")}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 ${
                formik.touched.title && formik.errors.title
                  ? "border-red-300 bg-red-50"
                  : "border-slate-300"
              }`}
              placeholder="Enter task title"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.title}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Description*
            </label>
            <textarea
              id="description"
              rows={3}
              {...formik.getFieldProps("description")}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200 resize-none ${
                formik.touched.description && formik.errors.description
                  ? "border-red-300 bg-red-50"
                  : "border-slate-300"
              }`}
              placeholder="Enter task description"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="endDate"
                className="text-sm font-medium text-gray-700"
              >
                Select a date*
              </label>
              <input
                type="date"
                id="endDate"
                value={DateUtils.formatDate(formik.values.endDate)}
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
                onChange={(e) => {
                  formik.setFieldValue("endDate", e.target.value)
                }}
              />
              {formik.touched.endDate && formik.errors.endDate && (
                <div className="text-red-500 text-sm">
                  {formik.errors.endDate}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Priority*
              </label>
              <select
                id="priority"
                {...formik.getFieldProps("priority")}
                className="px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-200"
              >
                <option value={Priority.LOW}>Low</option>
                <option value={Priority.MEDIUM}>Medium</option>
                <option value={Priority.HIGH}>High</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors duration-200 font-medium text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-orange-600 text-white rounded-xl hover:bg-orange-700 focus:ring-4 focus:ring-orange-200 transition-all duration-200 font-medium text-sm"
            >
              {editingTask ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrUpdateTaskModal;
