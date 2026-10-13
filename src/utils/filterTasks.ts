import type { Task } from "../models/models";


export function filterTasks(
    tasks: Task[],
    selectedStatus: "new" | "ongoing" | "done" | "all",
    selectedMember: string | "all",
    selectedCategory: "all" | "backend" | "frontend" | "ux",
    selectedSubtasks: "all" | "hasSubtasks" | "remaining"
) {
    
    const filteredTasks = tasks.filter((task) => {
        const hasCorrectStatus =
            selectedStatus === "all" || task.status[selectedStatus];
        
        if (!hasCorrectStatus) {
            return false;
        } 
        
        const hasCorrectMember =
            selectedMember === "all" || task.member === selectedMember

        if (!hasCorrectMember) {
            return false;
        }
        
        const hasCorrectCategory = 
            selectedCategory === "all" || task.category[selectedCategory]
        
        if (!hasCorrectCategory) {
            return false;
        }

        const hasCorrectSubtasks =
            selectedSubtasks === "all" || 
            (selectedSubtasks === "hasSubtasks" &&
                Object.keys(task.subtask).length > 0 ) ||
            (selectedSubtasks === "remaining" &&
                Object.values(task.subtask).some((subtask) => !subtask.done))

        
        if (!hasCorrectSubtasks) {
            return false;
        } else {
            return true;
        }
    });
   
    return filteredTasks;
} 
