export class Member {
  public readonly id: string;
  public readonly name: string;
  public readonly tasks: number;
  public readonly category: boolean;
  public readonly projects: string;
  public readonly memberObj: {
    id: string;
    name: string;
    tasks: number;
    category: boolean;
    projects: string;
  };

  constructor(
    id: string,
    memberObj: {
      id: string;
      name: string;
      tasks: number;
      category: boolean;
      projects: string;
    },
  ) {
    this.memberObj = memberObj;
    this.id = id;
    this.name = memberObj.name;
    this.tasks = memberObj.tasks;
    this.category = memberObj.category;
    this.projects = memberObj.projects;
  }

  render() {
    console.log("working");
    console.log("LOOP ID: ", this.id);
  }
}
