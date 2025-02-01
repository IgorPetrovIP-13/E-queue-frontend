"use client";

import { useDropzone } from "react-dropzone";
import { FileSearch } from "lucide-react";
import { Image } from "@heroui/react";
import { useEffect, useState } from "react";

interface IDropzone {
  value: File | null;
  onChange: (file: File | null) => void;
}

const UiDropzone = (props: IDropzone) => {
  const [preview, setPreview] = useState<string>();
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0] || null;

      props.onChange(file);
    }
  });

  useEffect(() => {
    if (props.value) {
      const objectUrl = URL.createObjectURL(props.value);

      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [props.value]);

  return (
    <div
      {...getRootProps()}
      className="border border-default-200 p-4 rounded-lg text-center cursor-pointer max-w-4xl"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col h-full gap-2 items-center justify-center">
        {preview ? (
          <Image
            isBlurred
            isZoomed
            radius="sm"
            src={preview}
            width={250}
          />
        ) : (
          <FileSearch size={40} />
        )}
        <p className="text-md">
          Перетягніть файл сюди або{" "}
          <span className="text-primary">натисніть</span> для завантаження.
        </p>
        <p className="text-sm">
          Максимальний розмір файлу: 5 МБ. Дозволені типи файлів:{" "}
          <span className="font-semibold">JPG, PNG, SVG</span>.
        </p>
      </div>
    </div>
  );
};

export default UiDropzone;
