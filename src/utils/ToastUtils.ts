import { toast, type ToastOptions } from "react-hot-toast";
import { ServiceError } from "../api/services/ServiceError";

export class ToasUtils {
  public static showSuccessToast(message: string, options?: ToastOptions) {
    return toast.success(message, options);
  }

  public static showErrorToast(
    message: string,
    error: unknown,
    options?: ToastOptions
  ) {
    let errorDetail;
    if (error instanceof ServiceError) {
      errorDetail =
        error.messages?.join(", ") || error.message || error.exception;
    } else if (error instanceof Error) {
      errorDetail = error.message;
    }

    if (errorDetail) {
      toast.error(`${message} [${errorDetail}]`, options);
    } else {
      toast.error(message, options);
    }
  }
}
