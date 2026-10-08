export async function renderMembers(
  key: Record<string, { name: string; tasks: string }>,
) {
  const renderSection = document.getElementById("renderSection") as HTMLElement;
  //!   if (!renderSection) return;

  // Chagne later to input
  const data = key;
  console.log("Data NEW", data);

  for (const id in data) {
    const newSection = document.createElement("div") as HTMLElement;
    const nameSection = document.createElement("p") as HTMLElement;
    const taskSection = document.createElement("p") as HTMLElement;

    const memberName: string = data[id].name;
    const memberTasks: string = data[id].tasks;

    nameSection.append(memberName);
    taskSection.append(memberTasks);

    newSection.append(nameSection, taskSection);

    renderSection.append(newSection);
  }
}
