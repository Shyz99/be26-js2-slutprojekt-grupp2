// this function checks the templates and information sent through to various firebase requests to make sure
// the correct function is called upon

import { postNewMember } from "./postNewMember.ts";
import { postNewProject } from "./postNewProject.ts";
import { postNewTask } from "./postNewTask.ts";
import { postNewSubtask } from "./postNewSubtask.ts";
import type { ModalOptions } from "../components/modals/Modal.ts";
import { patchMemberToProject } from "./patchMemberToProject.ts";
import { patchTaskStatus } from "./patchTaskStatus.ts";
import { patchTaskDeadline } from "./patchTaskDeadline.ts";
import { patchTaskPriority } from "./patchTaskPriority.ts";
import { patchTaskDescription } from "./patchTaskDescription.ts";

export async function dynamicPostCheck(
  data: Record<string, any>,
  URLEndPoint: string,
  options: ModalOptions,
) {
  if (URLEndPoint === "/project" && options.projectID && data.memberID) {
    return await patchMemberToProject(data, URLEndPoint, options);
  }

  if (URLEndPoint === "/task" && options.taskID && data.status) {
    return await patchTaskStatus(data, URLEndPoint, options);
  }

  if (URLEndPoint === "/task" && options.taskID && data.priority) {
    return await patchTaskPriority(data, URLEndPoint, options);
  }

  if (URLEndPoint === "/task" && options.taskID && data.description) {
    return await patchTaskDescription(data, URLEndPoint, options);
  }

  if (URLEndPoint === "/task" && options.taskID && data.deadline) {
    return await patchTaskDeadline(data, URLEndPoint, options);
  }

  if (URLEndPoint === "/member") {
    return await postNewMember(data, URLEndPoint);
  }

  if (URLEndPoint === "/project") {
    return await postNewProject(data, URLEndPoint);
  }

  if (URLEndPoint === "/task") {
    return await postNewTask(data, URLEndPoint, options);
  }

  if (URLEndPoint === "/subtask") {
    if (options.taskID) {
      const correctEndPointURL = `${options.taskID}/subtask`;
      return await postNewSubtask(data, correctEndPointURL, options);
    } else {
      return false;
    }
  }
}
