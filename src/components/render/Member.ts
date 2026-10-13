import { getProjectsWithID } from "../../firebase/getProjectOrMembersDataWithID.ts";
import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";
import {
  renderTaskCount,
  renderSubTaskCount,
} from "../render/renderTaskCountWithMemberAndProjectID.ts";

export class Member {
  public readonly id: string;
  public readonly name: string;
  public readonly tasks: string;
  public readonly category: {
    backend: boolean;
    frontend: boolean;
    ux: boolean;
  };
  public readonly backend: boolean;
  public readonly frontend: boolean;
  public readonly ux: boolean;
  public projects: Record<string, unknown> | undefined;
  public readonly memberObj: {
    id: string;
    name: string;
    tasks: string;
    category: {
      backend: boolean;
      frontend: boolean;
      ux: boolean;
    };
    projects: {};
  };

  constructor(
    id: string,
    memberObj: {
      id: string;
      name: string;
      tasks: string;
      category: {
        backend: boolean;
        frontend: boolean;
        ux: boolean;
      };
      projects: {};
    },
  ) {
    this.memberObj = memberObj;
    this.id = id;
    this.name = memberObj.name;
    this.tasks = memberObj.tasks;
    this.category = memberObj.category;
    this.backend = this.category.backend;
    this.frontend = this.category.frontend;
    this.ux = this.category.ux;
    this.projects = undefined;
    void this.loadProjects();
  }

  private async loadProjects(): Promise<void> {
    this.projects = await getProjectsWithID(this.id);
  }

  async renderAllMemberDataIndex() {
    if (this.projects === undefined) {
      await this.loadProjects();
    }

    const renderAllMembersContainer = document.getElementById(
      "renderAllMembersSection",
    ) as HTMLElement;
    const memberContainer = document.createElement("section") as HTMLElement;
    const memberName = document.createElement("h2") as HTMLElement;
    let taskCount: number = 0;
    let subTaskCount: number = 0;
    const memberTasks = document.createElement("p") as HTMLElement;
    const memberSubTasks = document.createElement("p") as HTMLElement;
    const memberCategory = document.createElement("p") as HTMLElement;
    const memberProjetsContainer = document.createElement(
      "section",
    ) as HTMLElement;

    if (this.backend === true) {
      memberCategory.innerText = "BACKEND";
    } else {
      if (this.frontend === true) {
        memberCategory.innerText = "FRONTEND";
      }
      if (this.ux === true) {
        memberCategory.innerText = "UX";
      }
    }

    if (
      this.projects === undefined ||
      Object.keys(this.projects).length === 0
    ) {
      const memberProjets = document.createElement("p") as HTMLElement;
      memberProjets.innerText = "No projects available for this member";
      memberProjetsContainer.append(memberProjets);
    } else {
      for (const projectId in this.projects) {
        const memberProjets = document.createElement("section") as HTMLElement;
        const memberProjetName = document.createElement("h3") as HTMLElement;
        const memberProjetDeadline = document.createElement("p") as HTMLElement;
        const memberProjetLink = document.createElement(
          "a",
        ) as HTMLAnchorElement;
        const memberProjetDescription = document.createElement(
          "p",
        ) as HTMLElement;
        const projectData = await getCategoryDataFirebase("project", projectId);

        memberProjetName.classList.add("H3Title");
        memberProjetLink.innerText = "[WIP] -->";
        memberProjetLink.classList.add("linkButton");
        memberProjetName.innerText = projectData.name;
        // memberProjetLink.href = `/project/${encodeURIComponent(projectId)}`;
        memberProjetLink.href = "./src/html/projectOverview.html";
        memberProjetDescription.innerText = projectData.description;
        memberProjetDeadline.innerText = "Deadline: " + projectData.deadline;
        memberProjets.classList.add("memberProjet");
        memberProjets.append(
          memberProjetName,
          memberProjetDescription,
          memberProjetDeadline,
          memberProjetLink,
        );
        memberProjetsContainer.append(memberProjets);
        //! maybe remove if not wrking
        const newTaskCount = await renderTaskCount(this.id, projectId);
        const newSubTaskCount = await renderSubTaskCount(this.id, projectId);
        taskCount = taskCount + newTaskCount;
        subTaskCount = subTaskCount + newSubTaskCount;

        // console.log("User: ", this.name);
        // console.log("newtaskCount Function: ", newTaskCount);
        // console.log("taskCount: ", taskCount);
        // console.log("subTaskCount: ", subTaskCount);
      }
    }

    memberProjetsContainer.classList.add("memberProjetsContainer");

    memberName.innerText = this.name;
    //! memberTasks.innerText = "Total Tasks: " + this.tasks;
    memberTasks.innerText = "Total Tasks: " + taskCount;
    memberSubTasks.innerText = "Total Sub-Tasks: " + subTaskCount;

    memberContainer.classList.add("memberContainer");
    memberContainer.append(
      memberName,
      memberCategory,
      memberTasks,
      memberSubTasks,
      memberProjetsContainer,
    );
    renderAllMembersContainer.append(memberContainer);
  }
}
