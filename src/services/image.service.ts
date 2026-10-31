import { Validation } from "../validation/validation";
import { ImageValidation } from "../validation/imageValidation";
import { CreateImageRequest, ImageResponse, toImageResponse, UpdateImageRequest } from "../model/imageModel";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/responseError";

export class ImageService {
  static async create(request: CreateImageRequest): Promise<ImageResponse> {
    const imageCreate = Validation.validate(ImageValidation.IMAGECREATE, request);

    const images = await prismaClient.latihanImage.create({
      data: {
        images: imageCreate.images,
      },
    });

    return toImageResponse(images);
  }
}
