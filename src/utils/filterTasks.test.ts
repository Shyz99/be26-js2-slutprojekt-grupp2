import { filterTasks } from "./filterTasks";

const testTask = {
    title: "Testar",
    created: "2026-10-10",
    description: "Testar filter funktionen",
    deadline: "2026-10-11",
    member: "member1",
    priority: 1,
    category: {
        backend: false,
        frontend: true,
        ux: false,
    },
    status: {
        new: true,
        ongoing: false,
        done: false,
    },
    subtask: {
        subtask1: {
            description: "Testa subtask",
            member: "member1",
            done: true,
        }
    },
};

const filteredTasks = filterTasks(
    [testTask],
    "all", // status
    "all", // member
    "all", // category
    "all", // subtasks
);

console.log("Antal uppgifter:", filteredTasks.length);