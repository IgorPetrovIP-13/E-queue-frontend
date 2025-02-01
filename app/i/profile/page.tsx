"use client";

import { useProfile } from "@/common/hooks/useProfile";
import { getRouteValue } from "@/utils/getRouteValue";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { usePathname } from "next/navigation";
import UpdateProfileForm from "@/components/i/profile/UpdateProfileForm";
import { IFormValues } from "@/types/forms/update-user-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "@/validation/update-user.schema";
import { uploadFileService } from "@/services/upload-file.service";
import { IPayload } from "./page.types";

export default function ProfilePage() {
  const { data } = useProfile();
  const pathname = usePathname();
  const { title, icon: Icon } = getRouteValue(pathname);

  const initialValues: IFormValues = {
    avatar: null,
    name: data?.name || "",
    surname: data?.surname || "",
    email: data?.email || "",
		password: "",
		confirmPassword: ""
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields }
  } = useForm<IFormValues>({
    resolver: zodResolver(updateUserSchema),
    mode: "onTouched",
    defaultValues: initialValues
  });

  const onSubmit: SubmitHandler<IFormValues> = async (values: IFormValues) => {
    const payload: IPayload = {
			password: values.password,
      name: values.name,
      surname: values.surname,
      email: values.email,
      avatar: null
    };
    if (values.avatar) {
      payload.avatar = await uploadFileService.uploadFile(values.avatar);
		}
		console.log(payload);
  };

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
        <UpdateProfileForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          control={control}
          dirtyFields={dirtyFields}
          errors={errors}
          isSubmitting={isSubmitting}
          isValid={isValid}
        />
      </CardBody>
    </Card>
  );
}
