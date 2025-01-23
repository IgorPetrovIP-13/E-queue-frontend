"use client";

import { forwardRef, useState } from "react";
import { Input, InputProps } from "@heroui/react";

import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { EyeFilledIcon } from "./EyeFilledIcon";

interface IPasswordInputProps extends Omit<InputProps, "type"> {
  errorMessage?: string;
}

const UiPasswordInput = forwardRef<HTMLInputElement, IPasswordInputProps>(
  (props, ref) => {
    const { errorMessage, ...inputProps } = props;
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
      <Input
        {...inputProps}
        ref={ref}
        endContent={
          <button
            aria-label="Toggle password visibility"
            className="focus:outline-none mb-1"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="w-6 h-6 text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="w-6 h-6 text-default-400 pointer-events-none" />
            )}
          </button>
        }
        helperText={errorMessage}
        isInvalid={!!errorMessage}
        type={isVisible ? "text" : "password"}
      />
    );
  }
);

UiPasswordInput.displayName = "UiPasswordInput";

export default UiPasswordInput;
