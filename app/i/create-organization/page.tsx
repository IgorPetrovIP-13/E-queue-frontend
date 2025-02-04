"use client";

import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import CreateOrganizationForm from "@/components/i/create-organization/CreateOrganizationForm";
import { formatAxiosError } from "@/common/axios/error";
import {
  IFormValues,
  initialValues
} from "@/types/forms/organization-request-form.types";
import { createOrganizationSchema } from "@/validation/create-organization.schema";
import { ICreateOrganizationRequestReq } from "@/types/services/organization-request.types";
import { organizationRequestService } from "@/services/organization-request.service";
import { ROUTES } from "@/common/enums/routes-enum";
import { organizationTypeService } from "@/services/organization-type.service";
import { connectionTypeService } from "@/services/connection-type.service";
import { IAutocompleteData } from "@/types/generic/autocomplete-data.types";
import { preSendClear } from "@/utils/preSendClear";
import { openToast } from "@/utils/openToast";
import { getRouteValue } from "@/utils/getRouteValue";

export default function CreateOrganizationPage() {
  const [organizationTypes, setOrganizationTypes] = useState<
    IAutocompleteData[]
  >([]);
  const [connectionTypes, setConnectionTypes] = useState<IAutocompleteData[]>(
    []
  );

  const pathname = usePathname();
  const router = useRouter();

  const { title, icon: Icon } = getRouteValue(pathname);

  useEffect(() => {
    async function fetchData() {
      try {
        const organizationTypes =
          await organizationTypeService.getAutocompleteData();
        const connectionTypes =
          await connectionTypeService.getAutocompleteData();

        setOrganizationTypes(organizationTypes);
        setConnectionTypes(connectionTypes);
      } catch (error) {
        openToast(
          "danger",
          "Помилка завантаження даних",
          formatAxiosError(error)
        );
      }
    }
    fetchData();
  }, []);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid, dirtyFields }
  } = useForm<IFormValues>({
    resolver: zodResolver(createOrganizationSchema),
    mode: "onTouched",
    defaultValues: initialValues
  });

  const onSubmit: SubmitHandler<IFormValues> = async (values: IFormValues) => {
    const payload = {
      organization_logo: values.organization_logo || null,
      organization_type_id: values.organization_type_id!,
      organization_title: values.organization_title,
      desired_connection_type_id: values.desired_connection_type_id!,
      desired_connection: values.desired_connection,
      organization_description: values.organization_description,
      organization_website: values.organization_website || null,
      attachments: values.attachments
    };

    mutate(preSendClear(payload));
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["createOrganization"],
    mutationFn: (data: ICreateOrganizationRequestReq) =>
      organizationRequestService.create(data),
    onSuccess: () => {
      openToast(
        "success",
        "Заявку на організацію успішно створено",
        "Вона з'явиться в списку заявок на організацію"
      );
      router.push(ROUTES.ORGANIZATION_REQUESTS);
      reset();
    },
    onError: error => {
      openToast(
        "danger",
        "Помилка створення заявки на організацію",
        formatAxiosError(error)
      );
    }
  });

  return (
    <Card className="animate-slideInDown w-full">
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <Icon size={21} />
          <h1 className="text-md">{title}</h1>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <CreateOrganizationForm
          control={control}
          dirtyFields={{
            ...dirtyFields,
            attachments: !!dirtyFields.attachments?.length
          }}
          errors={errors}
          handleSubmit={handleSubmit}
          isSubmitting={isPending}
          isValid={isValid}
          orgConnectionTypes={connectionTypes}
          orgTypes={organizationTypes}
          onSubmit={onSubmit}
        />
      </CardBody>
    </Card>
  );
}
