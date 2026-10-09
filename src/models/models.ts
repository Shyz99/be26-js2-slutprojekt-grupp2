export type Project = {
  name: string;
  deadline: string;
  description: string;
  members: string[];
  tasks: string[];
};

export type Member = {
  name: string;
  tasks: number;
  project: string[];
  category: {
    backend: boolean;
    frontend: boolean;
    ux: boolean;
  };
};

export type Task = {
  title: string;
  created: string;
  deadline: string;
  description: string;
  member: string;
  priority: number;
  category: {
    backend: boolean;
    frontend: boolean;
    ux: boolean;
  };
  status: {
    new: boolean;
    ongoing: boolean;
    done: boolean;
  };
  subtask: Subtask[];
};

export type Subtask = {
  description: string;
  member: string;
  done: boolean;
};
