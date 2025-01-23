"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Input
} from "@heroui/react";
import { Textarea } from "@heroui/input";
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit
} from "react-hook-form";
import { useMemo } from "react";

import { IAutocompleteData } from "@/types/generic/autocomplete-data.types";
import { IFormValues } from "@/types/forms/organization-request-form.types";

interface ICreateOrganizationForm {
  onSubmit: SubmitHandler<IFormValues>;
  handleSubmit: UseFormHandleSubmit<IFormValues, undefined>;
  control: Control<IFormValues>;
  errors: FieldErrors;
  isSubmitting: boolean;
  isValid: boolean;
  dirtyFields: Record<string, boolean>;
  orgTypes: IAutocompleteData[];
  orgConnectionTypes: IAutocompleteData[];
}

export default function CreateOrganizationForm({
  onSubmit,
  handleSubmit,
  control,
  errors,
  isSubmitting,
  isValid,
  dirtyFields,
  orgTypes,
  orgConnectionTypes
}: ICreateOrganizationForm) {
  const memoizedOrgTypes = useMemo(() => orgTypes, [orgTypes]);
  const memoizedOrgConnectionTypes = useMemo(
    () => orgConnectionTypes,
    [orgConnectionTypes]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Controller
            control={control}
            name="organization_type_id"
            render={({ field }) => (
              <Autocomplete
                {...field}
                isRequired
                defaultItems={memoizedOrgTypes}
                errorMessage={errors.organization_type_id?.message?.toString()}
                isInvalid={!!errors.organization_type_id}
                label="Тип організації"
                size="sm"
                onSelectionChange={value => {
                  field.onChange(value);
                }}
              >
                {item => (
                  <AutocompleteItem key={item.key}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />
          <Controller
            control={control}
            name="organization_title"
            render={({ field }) => (
              <Input
                {...field}
                isRequired
                errorMessage={errors.organization_title?.message?.toString()}
                id="organization_title"
                isInvalid={!!errors.organization_title}
                label="Назва організації"
                size="sm"
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="organization_description"
          render={({ field }) => (
            <Textarea
              {...field}
              isRequired
              errorMessage={errors.organization_description?.message?.toString()}
              id="organization_description"
              isInvalid={!!errors.organization_description}
              label="Опис організації"
              placeholder="Опишіть вашу організацію, чим ви займаєтесь, які цілі та завдання має ваша організація"
              size="sm"
            />
          )}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <Controller
            control={control}
            name="desired_connection_type_id"
            render={({ field }) => (
              <Autocomplete
                {...field}
                isRequired
                defaultItems={memoizedOrgConnectionTypes}
                errorMessage={errors.desired_connection_type_id?.message?.toString()}
                isInvalid={!!errors.desired_connection_type_id}
                label="Тип зв’язку з адміністрацією"
                size="sm"
                onSelectionChange={value => {
                  field.onChange(value);
                }}
              >
                {item => (
                  <AutocompleteItem key={item.key}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />
          <Controller
            control={control}
            name="desired_connection"
            render={({ field }) => (
              <Input
                {...field}
                isRequired
                errorMessage={errors.desired_connection?.message?.toString()}
                id="desired_connection"
                isInvalid={!!errors.desired_connection}
                label="Номер телефону"
                size="sm"
              />
            )}
          />
        </div>
        <Divider />
        <div className="flex justify-end">
          <Button
            color="secondary"
            isDisabled={
              !isValid || isSubmitting || Object.keys(dirtyFields).length === 1
            }
            isLoading={isSubmitting}
            type="submit"
            variant="flat"
          >
            Залишити заявку
          </Button>
        </div>
      </div>
    </form>
  );
}
