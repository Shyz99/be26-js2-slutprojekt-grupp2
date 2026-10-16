import type { Task } from "../models/models";


export function filterTasks(
    tasks: Task[],
    selectedStatus: "new" | "ongoing" | "done" | "all",
    selectedMember: string | "all",
    selectedCategory: "all" | "backend" | "frontend" | "ux",
    selectedSubtasks: "all" | "completed" | "remaining",
    SelectedPriority: "all" | "priority1" | "priority2" | "priority3"
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

        const hasCorrectPriority =
            SelectedPriority === "all" ||
            task.priority === Number(SelectedPriority.replace("priority", ""));

        if (!hasCorrectPriority){
            return false;
        }
        
        const hasCorrectSubtasks =
            selectedSubtasks === "all" ||
            (selectedSubtasks === "completed" &&
                Object.values(task.subtask ?? {}).length > 0 &&
                Object.values(task.subtask ?? {}).every((subtask) => subtask.done)) ||
            (selectedSubtasks === "remaining" &&
                Object.values(task.subtask ?? {}).some((subtask) => !subtask.done));

            
            console.log(task.title, {
                status: hasCorrectStatus,
                category: hasCorrectCategory,
                subtasks: hasCorrectSubtasks,
            });
        if (!hasCorrectSubtasks) {
            return false;
        } else {
            return true;
        }
    });
   
    return filteredTasks;
} 
