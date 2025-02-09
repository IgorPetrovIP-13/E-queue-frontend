import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@heroui/react";
import { CircleX } from "lucide-react";

interface IDeleteProfileModal {
  isOpen: boolean;
  onSubmit: (onClose: () => void) => void;
  onOpenChange: () => void;
  isSubmitting: boolean;
}

export default function DeleteProfileModal({
  isOpen,
  onSubmit,
  onOpenChange,
  isSubmitting
}: IDeleteProfileModal) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="text-danger flex items-center gap-2">
              <CircleX size={20} />
              Видалення профілю
            </ModalHeader>
            <ModalBody>
              Видалення профілю незворотній процес. Після видалення ви втратите
              доступ до сервісу. Ващі організації будуть видалені.
              <br /> Ви впевнені що хочете видалити профіль?
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                isLoading={isSubmitting}
                variant="flat"
                onPress={() => onSubmit(onClose)}
              >
                Видалити профіль
              </Button>
              <Button
                color="default"
                variant="flat"
                onPress={onClose}
              >
                Відміна
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
