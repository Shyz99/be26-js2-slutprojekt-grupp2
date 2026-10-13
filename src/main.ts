import { renderIndex } from "./components/render/renderIndex.ts";
import {
  renderTaskCount,
  renderSubTaskCount,
} from "./components/render/renderTaskCountWithMemberAndProjectID.ts";
import {
  renderProjectTaskCount,
  renderProjectSubTaskCount,
} from "./components/render/renderTaskCountWithProjectID.ts";
import { getTasks } from "./firebase/getTasks.ts";

await renderIndex();

// const taskCount = await renderTaskCount("kjahdiuyd98ykhf", "iudshg98dy");
// console.log("TASK COUNT------------------", taskCount);
// const subTaskCount = await renderSubTaskCount("kjahdiuyd98ykhf", "iudshg98dy");
// console.log("SUB TASK COUNT------------------", subTaskCount);

// const taskProjectCount = await renderProjectTaskCount("iudshg98dy");
// console.log("TASK COUNT------------------", taskProjectCount);
// const subTaskProjectCount = await renderProjectSubTaskCount("iudshg98dy");
// console.log("SUB TASK COUNT------------------", subTaskProjectCount);
