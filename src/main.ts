import { renderIndex } from "./components/render/renderIndex.ts";
import {
  renderMemberTaskCountInProject,
  renderMemberSubTaskCountInProject,
} from "./components/render/renderTaskCountWithMemberAndProjectID.ts";

import { updateAndCheckTaskCountMembers } from "./components/render/updateAndCheckTaskCountMembers.ts";

await renderIndex();

await updateAndCheckTaskCountMembers();


// const taskProjectCount = await renderProjectTaskCount("iudshg98dy");
// console.log("TASK COUNT------------------", taskProjectCount);
// const subTaskProjectCount = await renderProjectSubTaskCount("iudshg98dy");
// console.log("SUB TASK COUNT------------------", subTaskProjectCount);
