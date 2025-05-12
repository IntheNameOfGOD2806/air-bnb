import { toast } from "react-toastify";

export function showValidationErrors(response: any) {
  if (!response || !response.errorFields) return;

  response.errorFields.forEach((field: any) => {
    const fieldName = field.name.join(".");
    field.errors.forEach((error: any) => {
      toast.error(`${error}`);
    });

    // Optional: handle warnings if needed
    field.warnings.forEach((warning: any) => {
      toast.warn(`${fieldName}: ${warning}`);
    });
  });
}
