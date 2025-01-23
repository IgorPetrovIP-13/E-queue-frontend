"use client";

import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import {
  Controller,
  SubmitHandler,
  UseFormHandleSubmit
} from "react-hook-form";
import { Control, FieldErrors } from "react-hook-form";

import UiPasswordInput from "@/ui/components/uiPasswordInput";
import { IFormValues } from "@/types/forms/sign-in-form.types";

interface ISignInForm {
  onSubmit: SubmitHandler<IFormValues>;
  handleSubmit: UseFormHandleSubmit<IFormValues, undefined>;
  control: Control<IFormValues>;
  errors: FieldErrors;
  isSubmitting: boolean;
  isValid: boolean;
  dirtyFields: Record<string, boolean>;
}

export default function SignUpForm({
  onSubmit,
  handleSubmit,
  control,
  errors,
  isSubmitting,
  isValid,
  dirtyFields
}: ISignInForm) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              isRequired
              errorMessage={errors.email?.message?.toString()}
              id="email"
              isInvalid={!!errors.email}
              label="Email"
              size="sm"
              type="email"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <UiPasswordInput
              {...field}
              isRequired
              errorMessage={errors.password?.message?.toString()}
              id="password"
              isInvalid={!!errors.password}
              label="Пароль"
              size="sm"
            />
          )}
        />
        <Divider />
        <div className="flex justify-end">
          <Button
            color="secondary"
            isDisabled={
              !isValid || isSubmitting || Object.keys(dirtyFields).length === 0
            }
            isLoading={isSubmitting}
            type="submit"
            variant="flat"
          >
            Підтвердити
          </Button>
        </div>
      </div>
    </form>
  );
}
