import type { Task } from "../models/models";

export function sortTasks(
  tasks: Task[],
  sortBy: "deadline" | "title",
  direction: "ascending" | "descending",
): Task[] {
  const sortedTasks = [...tasks];

  sortedTasks.sort((taskA, taskB) => {
    if (sortBy === "deadline") {
      if (direction === "ascending") {
        return taskA.deadline.localeCompare(taskB.deadline);
      } else {
        return taskB.deadline.localeCompare(taskA.deadline);
      }
    } else {
      if (direction === "ascending") {
        return new Date(taskA.deadline).getTime() - new Date(taskB.deadline).getTime();
      } else {
        return new Date(taskB.deadline).getTime() - new Date(taskA.deadline).getTime();
      }
    }
  });

  return sortedTasks;
}
