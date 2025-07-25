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

  public static formatDateTime(
    input: string | Date,
    showTime: boolean = false
  ): string {
    if (typeof input === "string") {
      input = new Date(input);
    }
    if (showTime) {
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(input);
    } else {
      return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(input);
    }
  }
}
