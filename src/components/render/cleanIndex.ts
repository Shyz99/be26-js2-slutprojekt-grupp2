// empty list if element exists 
export async function cleanIndex(){
  const renderAllProjectsSection = document.getElementById(
    "renderAllProjectsSection",
  );
  
  if (renderAllProjectsSection) {
    renderAllProjectsSection.innerHTML = "";
  }
  
  const renderAllMembersSection = document.getElementById( 
    "renderAllMembersSection",
  );
  
  if (renderAllMembersSection) {
    renderAllMembersSection.innerHTML = "";
  }
}