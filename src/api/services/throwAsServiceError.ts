import { ApiError } from "../../generated-api";
import { ServiceError } from "./ServiceError";

export const asServiceError = (e: unknown): ServiceError => {
  if (e instanceof ApiError) {
    const apiError = e as ApiError;
    const message =
      apiError.body?.exception || apiError.message || "Unknown Error!";
    return new ServiceError(
      message,
      apiError.status,
      apiError.body?.messages,
      apiError.body?.errorId
    );
  } else if (e instanceof Error) {
    const error = e as Error;
    return new ServiceError(error.message, -1);
  }

  return new ServiceError("Unknown Error!!!", -1);
};
export const throwAsServiceError = (e: unknown) => {
  throw asServiceError(e);
};
