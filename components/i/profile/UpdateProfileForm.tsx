"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/react";
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit
} from "react-hook-form";

import UiDropzone from "@/ui/components/uiDropzone";
import { IFormValues } from "@/types/forms/update-user-form";
import { useRouter } from "next/navigation";
import UiPasswordInput from "@/ui/components/uiPasswordInput";

interface IUpdateProfileForm {
  onSubmit: SubmitHandler<IFormValues>;
  handleSubmit: UseFormHandleSubmit<IFormValues, undefined>;
  control: Control<IFormValues>;
  errors: FieldErrors;
  isSubmitting: boolean;
  isValid: boolean;
  dirtyFields: Record<string, boolean>;
}

export default function UpdateProfileForm({
  onSubmit,
  handleSubmit,
  control,
  errors,
  isSubmitting,
  isValid,
  dirtyFields
}: IUpdateProfileForm) {
  const router = useRouter();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          name="avatar"
          render={({ field: { onChange, value } }) => (
            <UiDropzone
              value={value}
              onChange={onChange}
            />
          )}
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
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
                errorMessage={errors.email?.message?.toString()}
                id="email"
                isInvalid={!!errors.email}
                label="Email"
                size="sm"
                type="email"
              />
            )}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <UiPasswordInput
                  {...field}
                  errorMessage={errors.password?.message?.toString()}
                  id="password"
                  isInvalid={!!errors.password}
                  label="Новий пароль"
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
                  errorMessage={errors.confirmPassword?.message?.toString()}
                  id="confirmPassword"
                  isInvalid={!!errors.confirmPassword}
                  label="Підтвердження паролю"
                  size="sm"
                />
              )}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            isDisabled={isSubmitting}
            type="button"
            variant="flat"
            onPress={() => router.back()}
          >
            Скасувати
          </Button>
          <Button
            color="primary"
            isDisabled={
              !isValid || isSubmitting || Object.keys(dirtyFields).length === 0
            }
            isLoading={isSubmitting}
            type="submit"
            variant="flat"
          >
            Підтвердити зміни
          </Button>
        </div>
      </div>
    </form>
  );
}
