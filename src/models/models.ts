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
  category: boolean[];
};

export type Subtask = {
  description: string;
  member: string;
  done: boolean;
};

export type Task = {
  title: string;
  created: string;
  deadline: string;
  description: string;
  member: string;
  priority: number;
  category: boolean[];
  status: boolean[];
  subtask: Subtask[];
};
