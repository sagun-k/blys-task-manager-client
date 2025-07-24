export class DateUtils {
  public static formatDate(date?: Date | string) {
    if (!date) return "";
    if (typeof date === "string") {
      date = new Date(date);
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // utils/formatDateTime.ts

  public static formatDateTime(input: string | Date): string {
    const date = new Date(input);

    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium", // e.g., Jan 3, 2025
      timeStyle: "short", // e.g., 3:45 PM
    }).format(date);
  }
}
