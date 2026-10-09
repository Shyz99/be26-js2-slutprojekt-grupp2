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
  public readonly projects: {};
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
    this.projects = memberObj.projects;
  }

  render() {
    console.log("LOOP ID: ", this.id);
    console.log("LOOP cat: ", this.backend);

    const renderAllMembersContainer = document.getElementById(
      "renderAllMembersSection",
    ) as HTMLElement;
    const memberContainer = document.createElement("section") as HTMLElement;
    const memberName = document.createElement("p") as HTMLElement;
    const memberTasks = document.createElement("p") as HTMLElement;
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

    console.log(typeof this.projects);

    if (!this.projects === null || undefined) {
      console.log("PRO KEY");
    } else {
      for (let i: number = 1; i < 8; i++) {
        const memberProjets = document.createElement("p") as HTMLElement;
        memberProjets.classList.add("memberProjet");
        memberProjets.innerText =
          "No projects available for this member - " + i;
        console.log("No projects available for this member.");
        memberProjetsContainer.append(memberProjets);
      }
    }

    memberProjetsContainer.classList.add("memberProjetsContainer");

    memberName.innerText = this.name;
    memberTasks.innerText = "Tasks: " + this.tasks;

    memberContainer.classList.add("memberContainer");
    memberContainer.append(
      memberName,
      memberCategory,
      memberTasks,
      memberProjetsContainer,
    );
    renderAllMembersContainer.append(memberContainer);
  }
}
