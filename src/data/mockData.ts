import type { Task, PaginatedResponse } from "../types"

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Write and submit the Q4 project proposal including budget analysis and timeline",
    status: "in-progress",
    priority: "high",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Review team performance",
    description: "Conduct quarterly performance reviews for all team members and prepare feedback reports",
    status: "pending",
    priority: "medium",
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
  },
  {
    id: "3",
    title: "Update API documentation",
    description: "Update comprehensive API documentation for new features and endpoints",
    status: "completed",
    priority: "low",
    createdAt: "2024-01-13",
    updatedAt: "2024-01-16",
  },
  {
    id: "4",
    title: "Implement user authentication",
    description: "Design and implement secure user authentication system with JWT tokens",
    status: "in-progress",
    priority: "high",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-15",
  },
  {
    id: "5",
    title: "Optimize database queries",
    description: "Review and optimize slow database queries for better application performance",
    status: "pending",
    priority: "medium",
    createdAt: "2024-01-11",
    updatedAt: "2024-01-11",
  },
  {
    id: "6",
    title: "Setup CI/CD pipeline",
    description: "Configure automated deployment pipeline for production environment",
    status: "completed",
    priority: "high",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
  },
  {
    id: "7",
    title: "Write unit tests",
    description: "Add comprehensive unit tests for core functionality and edge cases",
    status: "pending",
    priority: "medium",
    createdAt: "2024-01-09",
    updatedAt: "2024-01-09",
  },
  {
    id: "8",
    title: "Design user interface",
    description: "Create mockups and prototypes for new features and user flows",
    status: "in-progress",
    priority: "low",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-10",
  },
]

export const fetchTasks = async (
  page = 1,
  limit = 6,
  sortBy = "createdAt",
  sortOrder = "desc",
): Promise<PaginatedResponse<Task>> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const sortedTasks = [...mockTasks]
  sortedTasks.sort((a, b) => {
    let aValue: string | number = a[sortBy as keyof Task]
    let bValue: string | number = b[sortBy as keyof Task]

    if (sortBy === "priority") {
      const priorityOrder = { low: 1, medium: 2, high: 3 }
      aValue = priorityOrder[a.priority]
      bValue = priorityOrder[b.priority]
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedTasks = sortedTasks.slice(startIndex, endIndex)

  return {
    data: paginatedTasks,
    total: mockTasks.length,
    page,
    limit,
    totalPages: Math.ceil(mockTasks.length / limit),
  }
}
