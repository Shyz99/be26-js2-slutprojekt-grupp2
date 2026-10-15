import { getProjectsWithID } from "../../firebase/getProjectOrMembersDataWithID.ts";
import { getCategoryDataFirebase } from "../../firebase/getCategoryDataFirebase.ts";
import {
  renderMemberTaskCount,
  renderMemberSubTaskCount,
} from "./renderTaskCountWithMember.ts";

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
  public projects: Record<string, unknown> | undefined | null;
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

    const newTaskCount = await renderMemberTaskCount(this.id);
    const newSubTaskCount = await renderMemberSubTaskCount(this.id);
    taskCount = newTaskCount;
    subTaskCount = newSubTaskCount;

    if (
      this.projects === undefined ||
      this.projects === null ||
      Object.keys(this.projects).length === 0
    ) {
      const memberProjets = document.createElement("p") as HTMLElement;
      memberProjets.innerText = "No projects available for this member";
      memberProjetsContainer.append(memberProjets);
    } else {
      for (const projectId in this.projects) {
        console.log("projekt ID: ", projectId);
        const memberProjets = document.createElement("section") as HTMLElement;
        const memberProjetName = document.createElement("h3") as HTMLElement;
        const memberProjetDeadline = document.createElement("p") as HTMLElement;
        const memberProjetDescription = document.createElement(
          "p",
        ) as HTMLElement;
        const projectData = await getCategoryDataFirebase("project", projectId);
        const projectDataNameString: string = String(
          projectData?.name ?? "Unknown member",
        );
        const projectDataDescriptionString: string = String(
          projectData?.description ?? "Unknown member",
        );
        const projectDataDeadlineString: string = String(
          projectData?.deadline ?? "Unknown member",
        );

        memberProjetName.classList.add("H3Title");
        memberProjetName.innerText = projectDataNameString;
        memberProjetDescription.innerText = projectDataDescriptionString;
        memberProjetDeadline.innerText =
          "Deadline: " + projectDataDeadlineString;
        memberProjets.classList.add("memberProjet");
        memberProjets.append(
          memberProjetName,
          memberProjetDescription,
          memberProjetDeadline,
        );
        memberProjetsContainer.append(memberProjets);
      }
    }

    memberProjetsContainer.classList.add("memberProjetsContainer");

    memberName.innerText = this.name;
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
