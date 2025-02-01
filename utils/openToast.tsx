import { toast } from "sonner";

import UiToast from "@/ui/components/uiToast";

type ToastVariant = "info" | "success" | "warning" | "danger";
type NewVariant = "primary" | "success" | "warning" | "danger";

export const openToast = (
  variant: ToastVariant,
  title: string,
  description?: string
) => {
  let newVariant: NewVariant;

  if (variant === "info") {
    newVariant = "primary";
  } else {
    newVariant = variant;
  }
  toast(
    <UiToast
      color={newVariant}
      description={description}
      title={title}
    />
  );
};
