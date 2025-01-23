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
import { IFormValues } from "@/types/forms/sign-up-form.types";

interface ISignUpForm {
  onSubmit: SubmitHandler<IFormValues>;
  handleSubmit: UseFormHandleSubmit<IFormValues, undefined>;
  control: Control<IFormValues>;
  errors: FieldErrors;
  isSubmitting: boolean;
  isValid: boolean;
  dirtyFields: Record<string, boolean>;
}

const SignUpForm: React.FC<ISignUpForm> = ({
  onSubmit,
  handleSubmit,
  control,
  errors,
  isSubmitting,
  isValid,
  dirtyFields
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                {...field}
                isRequired
                errorMessage={errors.name?.message?.toString()}
                id="name"
                isInvalid={!!errors.name}
                label="Ім'я"
                size="sm"
              />
            )}
          />
          <Controller
            control={control}
            name="surname"
            render={({ field }) => (
              <Input
                {...field}
                isRequired
                errorMessage={errors.surname?.message?.toString()}
                id="surname"
                isInvalid={!!errors.surname}
                label="Прізвище"
                size="sm"
              />
            )}
          />
        </div>
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
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <UiPasswordInput
              {...field}
              isRequired
              errorMessage={errors.confirmPassword?.message?.toString()}
              id="confirmPassword"
              isInvalid={!!errors.confirmPassword}
              label="Підтвердження паролю"
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
};

export default SignUpForm;
