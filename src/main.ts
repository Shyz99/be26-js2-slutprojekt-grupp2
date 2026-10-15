import { renderIndex } from "./components/render/renderIndex.ts";
import { deleteTask } from "./firebase/deleteRequests/deleteMember.ts";

await renderIndex();

await deleteTask("-P3zq3s7GGbO0SMq9wI6");
