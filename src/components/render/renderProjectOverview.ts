import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";

const projectTitle = document.getElementById(
  "project-title",
) as HTMLHeadingElement;
const projectDescription = document.getElementById(
  "project-description",
) as HTMLParagraphElement;
const projectMembersContainer = document.getElementById(
  "project-members-container",
) as HTMLDivElement;

//temp:
const tempBtn = document.getElementById("temp-button") as HTMLButtonElement;
const addProjectMemberBtn = document.getElementById(
  "add-project-member-button",
) as HTMLButtonElement;

tempBtn.addEventListener("click", async () => {
  const chosenProject = await getCategoryDataFirebase("project", "iudshg98dy");
  renderProjectOverview(chosenProject);
});

addProjectMemberBtn.addEventListener("click", async () => {});
// end temp

//RENDER

type Project = {
  id: string;
  name: string;
  deadline: string;
  description: string;
  members: string[];
  tasks: string[];
};

function renderProjectOverview(project: Project): void {
  projectTitle.innerHTML = "";
  projectDescription.innerHTML = "";
  projectMembersContainer.innerHTML = "";

  projectTitle.textContent = project.name;
  projectDescription.textContent = project.description;

  const ul = document.createElement("ul");
  for (const member in project.members) {
    const li = document.createElement("li");
    li.textContent = member;
    ul.append(li);
  }
  projectMembersContainer.append(ul);
}

//EVENTLISTENERS

// function renderProjects(project: Project): void {
//   projectTitle.innerHTML = "";
//   projectDescription.innerHTML = "";
//   projectMembersContainer.innerHTML = "";

//   projectTitle.textContent = project.name;
//   projectDescription.textContent = project.description;
// }

// getProjectFromFirebase().then(renderProjectAllTitles);

//GET

// type Project = {
//   id: string;
//   name: string;
//   deadline: string;
//   description: string;
//   members: string[];
//   tasks: string[];
// };

// async function getProjectFromFirebase(): Promise<Project[]> {
//   try {
//     const response = await fetch(baseURL + "/project" + ".json");
//     const data = await response.json();
//     const projectArray: Project[] = Object.keys(data).map((key) => {
//       return {
//         id: key,
//         name: data[key].name,
//         deadline: data[key].deadline,
//         description: data[key].description,
//         members: data[key].members,
//         tasks: data[key].tasks,
//       };
//     });
//     console.log(projectArray);
//     renderProjectAllTitles(projectArray);
//     return projectArray;
//   } catch (error) {
//     throw error;
//   }
// }

// //RENDER

// function renderProjectAllTitles(projects: Project[]): void {
//   tempAllprojects.innerHTML = "";
//   const ul = document.createElement("ul");

//   for (const project of projects) {
//     const li = document.createElement("li");
//     li.innerText = project.name;
//     li.addEventListener("click", () => {
//       console.log(project);
//       renderProjects(project);
//     });
//     ul.append(li);
//   }
//   tempAllprojects.append(ul);
// }

// //end temp.
