import { Alert } from "@heroui/react";

interface IToastProps {
  title: string;
  description?: string;
  color: "primary" | "success" | "warning" | "danger";
}

const UiToast = (props: IToastProps) => {
  return (
    <Alert
      color={props.color}
      description={props.description}
      title={props.title}
      variant="flat"
    />
  );
};

export default UiToast;
