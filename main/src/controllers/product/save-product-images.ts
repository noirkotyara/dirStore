import { RESPONSE_CODES } from "message-catcher";
import { NextFunction } from "express";
import { ParsedQs } from "qs";
import multer from "multer";
import { ParamsDictionary, Request, Response } from "express-serve-static-core";
import path from "path";
import { v4 } from "uuid";

import { responseCatcher } from "@helpers/response-catcher";
import { errorCatcher } from "@helpers/error-catcher";

import { createImages } from "@services/image/create-image";


export const saveProductImages = async (req: Request<ParamsDictionary, unknown, unknown, ParsedQs, Record<string, unknown>>, res: Response<unknown, Record<string, unknown>, number>, next: NextFunction) => {
  const createdImagesId: string[] = [];

  const multerStorage = () => multer.diskStorage({
    destination(req, file, cb) {
      const directoryName = path.join(__dirname, "../../uploads");
      cb(null, directoryName);
    },

    filename(req, file, cb) {
      const fileId = v4();
      const ending = file.originalname.split(".").pop();
      const fullyImageName = `${fileId}.${ending}`;
      createdImagesId.push(fullyImageName);
      cb(null, fullyImageName);
    }
  });

  const upload = multer({
    storage: multerStorage(),
    fileFilter: (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        return callback(new Error("Only image files are allowed!"));
      }
      callback(null, true);
    }
  });


  const cdUpload = upload.fields([{ name: "gallery", maxCount: 8 }]);

  cdUpload(req, res, async (err) => {

    if (err) {
      next({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        message: err.toString()
      });
      return;
    }

    const createdImages = await createImages(createdImagesId);

    if (!createdImages) {
      errorCatcher({
        message: "Images are not saved"
      });
      return;
    }

    next(
      responseCatcher<string[]>({
        responseCode: RESPONSE_CODES.SUCCESS,
        data: {
          data: createdImages,
          message: "Product images store with directory id"
        }
      })
    );
  });
};
