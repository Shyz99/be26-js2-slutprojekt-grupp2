import { baseURL } from "./firebaseRequestURL.ts";
import type { ModalOptions } from "../components/modals/Modal.ts";

export async function patchMemberToProject(
  data: Record<string, any>,
  URLEndPoint: string,
  options: ModalOptions,
): Promise<boolean> {
  if (
    typeof data.memberID === "string" &&
    typeof options.projectID === "string"
  ) {
    const projectID = options.projectID;
    const memberID = data.memberID;

    const patchOptions = {
      method: "PATCH",
      body: JSON.stringify({ [memberID]: "" }),
      headers: {
        "Content-Type": "application/json",
      },
    };


    const patchOptionsMember = {
      method: 'PATCH',
      body: JSON.stringify({ [projectID]: "" }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const responseMember = await fetch(`${baseURL}/member/${memberID}/project.json`, patchOptionsMember);

      const response = await fetch(
        `${baseURL}${URLEndPoint}/${projectID}/members.json`,
        patchOptions,
      );

      if (!response.ok || !responseMember.ok) {
        throw "Something went wrong";
      }

      const dataMember = await responseMember.json();
      const data = await response.json();

      if (data && dataMember) {
        setTimeout(() => {
          window.location.reload();
        }, 500);
        return true;
      } else {
        return false;
      }

    } catch (error) {
      console.log("PATCH gick fel", error);
      return false;
    }
  } else {
    return false;
  }
}
