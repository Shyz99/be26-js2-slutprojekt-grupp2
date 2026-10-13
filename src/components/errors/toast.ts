
export function showToast(message: string): void {
  let toast = document.getElementById("error-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "error-toast";
    document.body.append(toast);
  }

  toast.textContent = message;
  toast.className = "error-toast";
}
