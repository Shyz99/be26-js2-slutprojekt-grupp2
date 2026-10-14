import { renderIndex } from "./components/render/renderIndex.ts";
import { renderTaskCount, renderSubTaskCount, } from "./components/render/renderTaskCountWithMemberAndProjectID.ts";
import { renderProjectTaskCount, renderProjectSubTaskCount, } from "./components/render/renderTaskCountWithProjectID.ts";
import { getTasks } from "./firebase/getTasks.ts";


await renderIndex();

