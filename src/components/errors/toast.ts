
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

  if (error instanceof Error) {
    if (error.message.includes("401") || error.message.includes("403")) {
      return "Du saknar behörighet att utföra detta.";
    }

    if (error.message.includes("404")) {
      return "Informationen kunde inte hittas.";
    }

    if (error.message.includes("500")) {
      return "Ett serverfel uppstod. Försök igen senare.";
    }
  }

  return "Något gick fel. Försök igen.";
}
