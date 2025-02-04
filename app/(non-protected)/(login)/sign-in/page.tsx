"use client";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRoundSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { initialValues, IFormValues } from "@/types/forms/sign-in-form.types";
import { authService } from "@/services/auth/auth.service";
import SignInForm from "@/components/non-ptotected/login/sign-in/SignInForm";
import { signInSchema } from "@/validation/sign-in.schema";
import { ROUTES } from "@/common/enums/routes-enum";
import { formatAxiosError } from "@/common/axios/error";
import { openToast } from "@/utils/openToast";
import { ISignInReq } from "@/types/services/auth.types";

export default function SignInPage() {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid, dirtyFields }
  } = useForm<IFormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
    defaultValues: initialValues
  });

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: (data: ISignInReq) => authService.signIn(data),
    onSuccess: data => {
      openToast("success", `Ласкаво просимо на платформу, ${data.name}!`);
      router.push(ROUTES.DASHBOARD);
      reset();
    },
    onError: error => {
      openToast("danger", "Помилка авторизації", formatAxiosError(error));
    }
  });

  const onSubmit: SubmitHandler<IFormValues> = async (values: IFormValues) => {
    const payload = {
      email: values.email,
      password: values.password
    };

    mutate(payload);
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <UserRoundSearch />
          <h1 className="text-xl">Вхід</h1>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <SignInForm
          control={control}
          dirtyFields={dirtyFields}
          errors={errors}
          handleSubmit={handleSubmit}
          isSubmitting={isPending}
          isValid={isValid}
          onSubmit={onSubmit}
        />
      </CardBody>
    </Card>
  );
}
