"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  useDisclosure
} from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";

import { IPayload } from "./page.types";

import { useProfile } from "@/common/hooks/useProfile";
import { getRouteValue } from "@/utils/getRouteValue";
import UpdateProfileForm from "@/components/i/profile/UpdateProfileForm";
import { IFormValues } from "@/types/forms/update-user-form";
import { updateUserSchema } from "@/validation/update-user.schema";
import { uploadFileService } from "@/services/upload-file.service";
import DeleteProfileModal from "@/components/i/profile/DeleteProfileModal";
import { formatAxiosError } from "@/common/axios/error";
import { openToast } from "@/utils/openToast";
import { ROUTES } from "@/common/enums/routes-enum";
import { profileService } from "@/services/profile.service";
import { IUpdateProfileReq } from "@/types/services/profile.types";

export default function ProfilePage() {
  const { data } = useProfile();
  const pathname = usePathname();
  const { title, icon: Icon } = getRouteValue(pathname);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const initialValues: IFormValues = useMemo(() => {
    return {
      avatar: data?.avatar || null,
      name: data?.name || "",
      surname: data?.surname || "",
      email: data?.email || "",
      password: "",
      confirmPassword: ""
    };
  }, [data]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields }
  } = useForm<IFormValues>({
    resolver: zodResolver(updateUserSchema),
    mode: "onTouched",
    defaultValues: initialValues
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (values: IUpdateProfileReq) =>
      profileService.updateProfile(values),
    onSuccess: () => {
      openToast("success", "Профіль успішно оновлено");
    },
    onError: error => {
      openToast("danger", "Помилка оновлення профілю", formatAxiosError(error));
    }
  });

  const onSubmit: SubmitHandler<IFormValues> = async (values: IFormValues) => {
    const payload: IPayload = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      avatar: null
    };

    if (values.avatar && typeof values.avatar !== "string") {
      payload.avatar = await uploadFileService.uploadFile(values.avatar);
    }

    mutateUpdate(payload);
  };

  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationKey: ["deleteProfile"],
    mutationFn: () => profileService.deleteProfile(),
    onSuccess: () => {
      router.push(ROUTES.DASHBOARD);
      openToast("success", "Профіль успішно видалено");
    },
    onError: error => {
      openToast("danger", "Помилка видалення профілю", formatAxiosError(error));
    }
  });

  const handleDeleteProfile = (onClose: () => void) => {
    mutateDelete();
    onClose();
  };

  return (
    <>
      <Card className="animate-slideInDown w-full">
        <CardHeader className="flex justify-between">
          <div className="flex items-center gap-2">
            <Icon size={21} />
            <h1 className="text-md">{title}</h1>
          </div>
          <Button
            color="danger"
            size="sm"
            startContent={<CircleX size={18} />}
            variant="flat"
            onPress={onOpen}
          >
            Видалити профіль
          </Button>
        </CardHeader>
        <Divider />
        <CardBody>
          <UpdateProfileForm
            control={control}
            dirtyFields={dirtyFields}
            errors={errors}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isValid={isValid}
            onSubmit={onSubmit}
          />
        </CardBody>
      </Card>
      <DeleteProfileModal
        isOpen={isOpen}
        isSubmitting={isPendingDelete}
        onOpenChange={onOpenChange}
        onSubmit={onClose => handleDeleteProfile(onClose)}
      />
    </>
  );
}
