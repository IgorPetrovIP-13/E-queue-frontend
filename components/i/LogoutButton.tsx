"use client";

import { Button } from "@heroui/button";
import {
  useDisclosure
} from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { authService } from "@/services/auth/auth.service";
import { ROUTES } from "@/common/enums/routes-enum";
import { formatAxiosError } from "@/common/axios/error";
import { openToast } from "@/utils/openToast";
import LogoutModal from "./LogoutModal";

export default function LogoutButton() {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      router.push(ROUTES.WELCOME);
    },
    onError: error => {
      openToast("danger", "Помилка виходу", formatAxiosError(error));
    }
  });

  const handleLogout = (onClose: () => void) => {
    mutate();
    onClose();
  };

  return (
    <>
      <Button
        isIconOnly
        className="w-full flex justify-start md:justify-center lg:justify-start p-3 md:p-0 lg:p-3"
        color="danger"
        variant="flat"
        onPress={onOpen}
      >
        <div className="flex gap-2 items-center">
          <LogOut size={20} />
          <span className="inline md:hidden lg:inline">Вихід</span>
        </div>
      </Button>
      <LogoutModal
        isOpen={isOpen}
        onSubmit={onClose => handleLogout(onClose)}
				onOpenChange={onOpenChange}
				isSubmitting={isPending}
      />
    </>
  );
}
