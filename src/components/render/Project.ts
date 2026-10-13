import { getMembersWithID } from "../../firebase/getProjectOrMembersDataWithID.ts";
import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";
import {
  renderProjectTaskCount,
  renderProjectSubTaskCount,
} from "../render/renderTaskCountWithProjectID.ts";

//getMemnersWithID

export class Project {
  public readonly id: string;
  public readonly name: string;
  public tasks: Record<string, unknown> | undefined;
  public readonly deadline: string;
  public readonly description: string;
  public members: Record<string, unknown> | undefined;
  public readonly projectObj: {
    id: string;
    name: string;
    tasks: {};
    deadline: string;
    description: string;
    members: {};
  };

  constructor(
    id: string,
    projectObj: {
      id: string;
      name: string;
      tasks: {};
      deadline: string;
      description: string;
      members: {};
    },
  ) {
    this.id = id;
    this.name = projectObj.name;
    this.tasks = projectObj.tasks as Record<string, unknown> | undefined;
    this.deadline = projectObj.deadline;
    this.description = projectObj.description;
    this.members = projectObj.members as Record<string, unknown> | undefined;
    this.projectObj = projectObj;
  }

  private async loadMembers(): Promise<void> {
    this.members = await getMembersWithID(this.id);
  }

  async renderAllProjectDataIndex() {
    await this.loadMembers();

    const tasksCount = await renderProjectTaskCount(this.id);
    const subTasksCount = await renderProjectSubTaskCount(this.id);
    console.log("ProjectName", this.name, " Subtasks: ", subTasksCount);

    const renderAllProjectsSection = document.getElementById(
      "renderAllProjectsSection",
    ) as HTMLElement;
    const projectContainer = document.createElement("section") as HTMLElement;
    const projectName = document.createElement("h3") as HTMLElement;
    const projectTasks = document.createElement("p") as HTMLElement;
    const projectSubTasks = document.createElement("p") as HTMLElement;
    const projectDeadline = document.createElement("p") as HTMLElement;
    const projectDescription = document.createElement("p") as HTMLElement;
    const projectMembersContainer = document.createElement(
      "section",
    ) as HTMLElement;
    const projectMembersContainerTitle = document.createElement(
      "h4",
    ) as HTMLElement;
    const projetLink = document.createElement("a") as HTMLAnchorElement;

    projetLink.innerText = "[WIP] -->";
    projetLink.classList.add("linkButton");
    projetLink.href = "./src/html/projectOverview.html";

    projectMembersContainerTitle.innerText = "Members";
    projectMembersContainerTitle.classList.add("H3Title");
    projectMembersContainer.append(projectMembersContainerTitle);
    projectMembersContainer.classList.add("projectMembersContainer");

    for (const memberId in this.members) {
      const membersData = await getCategoryDataFirebase("member", memberId);
      const memberName = document.createElement("p") as HTMLElement;

      memberName.innerText = membersData.name;
      projectMembersContainer.append(memberName);
    }

    projectName.innerText = "♥ " + this.name;
    projectTasks.innerText = "Tasks: " + tasksCount;
    projectSubTasks.innerText = "Sub-tasks: " + subTasksCount;
    projectDeadline.innerText = "Deadline: " + this.deadline;
    projectDescription.innerText = "Description: " + this.description;

    projectContainer.classList.add("projectContainer");

    projectContainer.append(
      projectName,
      projectDescription,
      projectTasks,
      projectSubTasks,
      projectDeadline,
      projectMembersContainer,
      projetLink,
    );
    renderAllProjectsSection.append(projectContainer);
  }
}
