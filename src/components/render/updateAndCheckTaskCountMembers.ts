import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase";

export async function updateAndCheckTaskCountMembers() {
  const dataMembers = await getCategoryDataFirebase("member");
  const newTaskInput: number = 2;
  const newSubTaskInput: number = 1;

  for (const id in dataMembers) {
    if (dataMembers[id].tasks !== newTaskInput) {
      console.log(
        "member: ",
        dataMembers[id].name,
        "change TASK with patch here, from: ",
        dataMembers[id].tasks,
        " To -> ",
        newTaskInput,
      );
    } else {
      console.log("member: ", dataMembers[id].name, ": No TASK changs needed");
    }

    if (dataMembers[id].subtasks !== newSubTaskInput) {
      console.log(
        "member: ",
        dataMembers[id].name,
        "change SUB with patch here, from: ",
        dataMembers[id].tasks,
        " To -> ",
        newSubTaskInput,
      );
    } else {
      console.log("member: ", dataMembers[id].name, ": No SUB changs needed");
    }
  }
}
