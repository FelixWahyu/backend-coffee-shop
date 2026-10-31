import type { LatihanImage } from "@prisma/client";

export type ImageResponse = {
  id: number;
  images: string;
};

export type CreateImageRequest = {
  images: string;
};

export type UpdateImageRequest = {
  id: number;
  images?: string;
};

export function toImageResponse(images: LatihanImage): ImageResponse {
  return {
    id: images.id,
    images: images.images,
  };
}
