
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
        return taskA.title.localeCompare(taskB.title, "sv");
      } else {
        return taskB.title.localeCompare(taskA.title, "sv");
      }
    }
  });

  return sortedTasks;
}
