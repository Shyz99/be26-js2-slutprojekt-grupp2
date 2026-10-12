import type { Task } from "../models/models";


export function filterTasks(
    tasks: Task[],
    selectedStatus: "new" | "ongoing" | "done",
    selectedMember: string | "all",
    selectedCategory: "all" | "backend" | "frontend" | "ux",
    selectedSubtasks: "all" | "hasSubtasks" | "remaining"
) {
    return tasks.filter(
        (task) => 
            task.status[selectedStatus] &&
            (selectedMember === "all" || task.member === selectedMember) &&
            (selectedCategory === "all" || task.category[selectedCategory]) &&
            (selectedSubtasks == "all" ||
                (selectedSubtasks == "hasSubtasks" && Object.keys (task.subtask).length >0) ||
                (selectedSubtasks == "remaining" &&
                    Object.values(task.subtask).some((subtask) => !subtask.done))
            )
    );

}
