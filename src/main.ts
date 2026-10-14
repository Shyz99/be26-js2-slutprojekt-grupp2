import { renderIndex } from "./components/render/renderIndex.ts";
import {
  renderMemberTaskCountInProject,
  renderMemberSubTaskCountInProject,
} from "./components/render/renderTaskCountWithMemberAndProjectID.ts";

import { updateAndCheckTaskCountMembers } from "./components/render/updateAndCheckTaskCountMembers.ts";

await renderIndex();

await updateAndCheckTaskCountMembers();

console.log("---------🙈🙈🙈Project: Cykelprojektet🙈🙈🙈---------");
console.log("---------Bruno---------");
await renderMemberTaskCountInProject("kjahdiuyd98ykhf", "iudshg98dy");

await renderMemberSubTaskCountInProject("kjahdiuyd98ykhf", "iudshg98dy");

console.log("---------Anita---------");
await renderMemberTaskCountInProject("isughfih03j", "iudshg98dy");

await renderMemberSubTaskCountInProject("isughfih03j", "iudshg98dy");

console.log("---------🙈🙈🙈Project: Ett projekt🙈🙈🙈---------");
console.log("---------Bruno---------");
await renderMemberTaskCountInProject("kjahdiuyd98ykhf", "iuhfsiuh984");

await renderMemberSubTaskCountInProject("kjahdiuyd98ykhf", "iuhfsiuh984");

console.log("---------Anita---------");
await renderMemberTaskCountInProject("isughfih03j", "iuhfsiuh984");

await renderMemberSubTaskCountInProject("isughfih03j", "iuhfsiuh984");
