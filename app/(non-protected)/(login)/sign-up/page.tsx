"use client";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import SignUpForm from "@/components/non-ptotected/login/sign-up/SignUpForm";
import { signUpSchema } from "@/validation/sign-up.schema";
import { initialValues, IFormValues } from "@/types/forms/sign-up-form.types";
import { authService } from "@/services/auth/auth.service";
import { ROUTES } from "@/common/enums/routes-enum";
import { formatAxiosError } from "@/common/axios/error";
import { ISignUpReq } from "@/types/services/auth.types";
import { openToast } from "@/utils/openToast";

export default function SignUpPage() {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid, dirtyFields }
  } = useForm<IFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
    defaultValues: initialValues
  });

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: (data: ISignUpReq) => authService.signUp(data),
    onSuccess: data => {
      openToast("success", `Ласкаво просимо на платформу, ${data.name}!`);
      router.push(ROUTES.DASHBOARD);
      reset();
    },
    onError: error => {
      openToast("danger", "Помилка реєстрації", formatAxiosError(error));
    }
  });

  const onSubmit: SubmitHandler<IFormValues> = async (values: IFormValues) => {
    const payload = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: values.password
    };

    await mutate(payload);
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="flex justify-between">
        <div className="flex items-center gap-2">
          <UserRoundPlus />
          <h1 className="text-xl">Реєстрація</h1>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <SignUpForm
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
