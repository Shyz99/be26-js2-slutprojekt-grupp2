import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";

const projectTitle = document.getElementById(
  "project-title",
) as HTMLHeadingElement;
const projectDescription = document.getElementById(
  "project-description",
) as HTMLParagraphElement;
const projectMembersUl = document.getElementById(
  "project-members-ul",
) as HTMLUListElement;

//temp:
const tempBtn = document.getElementById("temp-button") as HTMLButtonElement;

tempBtn.addEventListener("click", async () => {
  const chosenProject = await getCategoryDataFirebase("project", "iudshg98dy");
  renderProjectOverview(chosenProject);
});

// end temp

//RENDER

type Project = {
  name: string;
  deadline: string;
  description: string;
  members: string[];
  tasks: string[];
};

type Member = {
  name: string;
  tasks: number;
  project: string[];
  category: boolean[];
};

async function renderProjectOverview(project: Project): Promise<void> {
  projectTitle.innerHTML = "";
  projectDescription.innerHTML = "";
  projectMembersUl.innerHTML = "";

  projectTitle.textContent = project.name;
  projectDescription.textContent = project.description;

  for (const member in project.members) {
    const projectmembers = await getCategoryDataFirebase("member", member);
    renderProjectMembers(projectmembers);
  }
}

function renderProjectMembers(projectmember: Member): void {
  let activeRole: string = "";

  for (const role in projectmember.category) {
    if (projectmember.category[role] === true) {
      activeRole = role;
    }
  }

  const li = document.createElement("li");
  li.textContent = `Namn: ${projectmember.name}. Roll: ${activeRole}. Antal uppgifter: ${projectmember.tasks}.`;
  projectMembersUl.append(li);
}
