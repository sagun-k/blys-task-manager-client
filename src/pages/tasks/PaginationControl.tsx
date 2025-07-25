import type { Dispatch, SetStateAction } from "react";
import type { Pagination } from "./AllTasks";

type PaginationControlProps = {
  pagination: Pagination;
  handlePageChange: (page: number) => void;
  loading: boolean;
  setPagination:Dispatch<SetStateAction<Pagination>>
  
};

const PaginationControl = ({
  pagination,
  handlePageChange,
  loading,
  setPagination
}: PaginationControlProps) => {
  function getVisiblePages(current: number, total: number): (number | "...")[] {
    const delta = 2;
    const range: (number | "...")[] = [];

    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);
    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < total - 1) range.push("...");
    if (total > 1) range.push(total);

    return range;
  }

  return (
    <>
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <div>
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} tasks
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="limitSelect" className="text-slate-500">
              Tasks per page:
            </label>
            <select
              id="limitSelect"
              className="px-2 py-1 border rounded-md text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={pagination.limit}
              onChange={(e) => {
                const newLimit = parseInt(e.target.value);
                setPagination((prev) => ({
                  ...prev,
                  limit: newLimit,
                  page: 1, // Reset to first page
                }));
              }}
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1 || loading}
            className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors duration-200 text-sm font-medium"
          >
            Previous
          </button>
          {getVisiblePages(pagination.page, pagination.totalPages).map(
            (page, i) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${i}`}
                  className="px-2 py-2 text-slate-500"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  disabled={loading}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors duration-200 ${
                    pagination.page === page
                      ? "bg-orange-600 text-white border-orange-600"
                      : "border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              )
          )}

          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages || loading}
            className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors duration-200 text-sm font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default PaginationControl;
