import { RESPONSE_CODES } from "message-catcher";
import { NextFunction } from "express";
import { ParsedQs } from "qs";
import { v4 } from "uuid";
import multer from "multer";
import { ParamsDictionary, Request, Response } from "express-serve-static-core";

import { responseCatcher } from "@helpers/response-catcher";

import { multerStorage } from "@controllers/product/helpers/multer-storage";


export const saveProductImages = async (req: Request<ParamsDictionary, unknown, unknown, ParsedQs, Record<string, unknown>>, res: Response<unknown, Record<string, unknown>, number>, next: NextFunction) => {
  const directoryId = v4();


  const upload = multer({
    storage: multerStorage(directoryId),
    fileFilter: (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        return callback(new Error("Only image files are allowed!"));
      }
      callback(null, true);
    }
  });


  const cdUpload = upload.fields([{ name: "gallery", maxCount: 8 }]);

  cdUpload(req, res, (err) => {

    if (err) {
      next({
        responseCode: RESPONSE_CODES.S_ERROR_INTERNAL,
        message: err.toString()
      });
      return;
    }
    next(
      responseCatcher<string>({
        responseCode: RESPONSE_CODES.SUCCESS,
        data: {
          data: directoryId,
          message: "Product images store with directory id"
        }
      })
    );
  });
};
