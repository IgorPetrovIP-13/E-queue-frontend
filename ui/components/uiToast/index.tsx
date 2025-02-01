import { Alert } from "@heroui/react";

interface IToastProps {
  title: string;
  description?: string;
  color: "primary" | "success" | "warning" | "danger";
}

const UiToast = (props: IToastProps) => {
  return (
    <Alert
      title={props.title}
      description={props.description}
      color={props.color}
      variant="flat"
    />
  );
};

export default UiToast;
