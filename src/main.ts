import { getCategoryDataFirebase } from "./firebase/getProjekt.ts";
import { renderMembers } from "./components/render/render.ts";

// getCategoryDataFirebase("member");
// getCategoryDataFirebase("member", "kjahdiuyd98ykhf");

await getCategoryDataFirebase("member").then(renderMembers);
