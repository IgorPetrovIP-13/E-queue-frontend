import { Tooltip, Button } from "@heroui/react";
import { Info } from "lucide-react";

interface ITooltipProps {
  description: string;
}

const UiTooltip = (props: ITooltipProps) => {
  return (
    <Tooltip
      closeDelay={150}
      content={props.description}
    >
      <Button
        isIconOnly
        size="sm"
        variant="bordered"
      >
        <Info />
      </Button>
    </Tooltip>
  );
};

export default UiTooltip;
