import multer from "multer";
import path from "path";
import fs from "fs";

export const multerStorage = (directoryId: string) => multer.diskStorage({
  destination(req, file, cb) {
    const directoryName = path.join(__dirname, "../../../uploads", directoryId);

    if (!fs.existsSync(directoryName)) {
      fs.mkdirSync(directoryName);
    }

    cb(null, directoryName);
  },

  filename(req, file, cb) {
    const ending = file.originalname.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}.${ending}`);
  }
});