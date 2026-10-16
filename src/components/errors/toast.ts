
export function showToast(message: string): void {
  let toast = document.getElementById("error-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "error-toast";
    document.body.append(toast);
  }

  toast.textContent = message;
  toast.className = "error-toast";
  setTimeout(() => {
    toast.remove();
  }, 5000);
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof TypeError) {
    return "Kontrollera din internetanslutning och försök igen.";
  }

  return "Något gick fel. Försök igen.";
}