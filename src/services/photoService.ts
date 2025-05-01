import { ValidationError, FileTooLargeError } from "@/errors";

type UploadedPhotoResponseJSON = {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: string;
    height: string;
    size: string;
    time: string;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    },
    thumb: {
      filename: string,
      name: string,
      mime: string,
      extension: string,
      url: string,
    },
    medium: {
      filename: string,
      name: string,
      mime: string,
      extension: string,
      url: string,
    },
    delete_url: string
  },
  success: true,
  status: 200
};

type UploadedErrorJSON = {
  status_code: number;
  error: {
    message: string;
    code: number;
  },
  status_txt: string;
}

type UploadedPhotoUrls = {
  thumbnailUrl: string;
  fileUrl: string;
};

const imageHostApiKey = "5766dd450acc191f87589a57db07f429";

export async function uploadPhotoAsync(file: File): Promise<UploadedPhotoUrls> {
  if (file.size > 3 * 1024 * 1024) {
    throw new FileTooLargeError(file.size);
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${imageHostApiKey}`, {
    method: "post",
    body: formData
  });

  const json = await response.json();

  if (response.status === 400 && (json as UploadedErrorJSON).error.code === 310) {
    throw new ValidationError({ file: [ "Ảnh không hợp lệ." ] });
  }

  const successJson = json as UploadedPhotoResponseJSON;
  return {
    thumbnailUrl: successJson.data.thumb.url,
    fileUrl: successJson.data.image.url
  };
}