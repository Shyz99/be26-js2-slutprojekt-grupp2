export async function cleanIndex() {
  const renderAllProjectsSection = document.getElementById(
    "renderAllProjectsSection",
  ) as HTMLElement;
  renderAllProjectsSection.innerHTML = "";

  const renderAllMembersSection = document.getElementById(
    "renderAllMembersSection",
  ) as HTMLElement;
  renderAllMembersSection.innerHTML = "";
}
