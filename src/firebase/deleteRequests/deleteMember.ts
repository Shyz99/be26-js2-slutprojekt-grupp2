import { baseURL } from "../firebaseRequestURL.ts";

export async function deleteTask(memberID: string): Promise<any> {
  if (!memberID) {
    return;
  }

  const deleteOptions = {
    method: "DELETE",
  };

  try {
    const responseDelMember = await fetch(
      `${baseURL}/member/${memberID}.json`,
      deleteOptions,
    );
    if (!responseDelMember.ok) {
      throw "Raderingen av medlem fungerade inte";
    }

    return;
  } catch (error) {
    throw error;
  }
}
