"use client";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRoundSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { initialValues, IFormValues } from "@/types/forms/sign-in-form.types";
import { authService } from "@/services/auth/auth.service";
import SignInForm from "@/components/non-ptotected/login/sign-in/SignInForm";
import { signInSchema } from "@/validation/sign-in.schema";
import { ROUTES } from "@/common/enums/routes-enum";
import { formatAxiosError } from "@/common/axios/error";

export default function SignInPage() {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields }
  } = useForm<IFormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onTouched",
    defaultValues: initialValues
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<IFormValues> = async (values: IFormValues) => {
    const payload = {
      email: values.email,
      password: values.password
    };

    try {
      await authService.signIn(payload);
      router.push(ROUTES.DASHBOARD);
      reset();
    } catch (error) {
      toast(formatAxiosError(error));
    }
  };

  return (
    <Card className="w-full max-w-md">
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
          isSubmitting={isSubmitting}
          isValid={isValid}
          onSubmit={onSubmit}
        />
      </CardBody>
    </Card>
  );
}
