import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json(
        { error: "Файл для завантаження відсутній" },
        { status: 400 }
      );
    }

    const uploadData = new FormData();

    uploadData.append(
      "UPLOADCARE_PUB_KEY",
      process.env.UPLOADCARE_PUBLIC_KEY || ""
    );
    uploadData.append("UPLOADCARE_STORE", "auto");

    uploadData.append("file", file);

    const ucResponse = await fetch("https://upload.uploadcare.com/base/", {
      method: "POST",
      body: uploadData
    });

    if (!ucResponse.ok) {
      return NextResponse.json(
        { error: "Помилка вивантаження файлу" },
        { status: 500 }
      );
    }

    const ucResult = await ucResponse.json();
    const cdnUrl = `https://ucarecdn.com/${ucResult.file}/`;

    return NextResponse.json({ cdnUrl });
  } catch (error) {
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
