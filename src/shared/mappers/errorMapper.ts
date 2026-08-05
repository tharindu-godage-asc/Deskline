export type ErrorInfo = {
  title: string;
  description: string;
};

export function mapStatusCodeToError(
  status?: number
): ErrorInfo {
  switch (status) {
    case 400:
      return {
        title: "Invalid Request",
        description:
          "The request could not be processed.",
      };

    case 401:
      return {
        title: "Unauthorized",
        description:
          "You don't have access to view.",
      };

    case 403:
      return {
        title: "Access Denied",
        description:
          "You don't have permission to perform this action.",
      };

    case 404:
      return {
        title: "Request Not Found",
        description:
          "The requested request could not be found.",
      };

    case 500:
      return {
        title: "Server Error",
        description:
          "Something went wrong on our end.",
      };

    default:
      return {
        title: "Unexpected Error",
        description:
          "An unexpected error occurred.",
      };
  }
}