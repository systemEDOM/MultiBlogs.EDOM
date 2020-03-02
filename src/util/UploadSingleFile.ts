import * as multer from "multer";

export class UploadSingleFile {

    public static getInstance() {
        if (this.instance == null) {
            this.instance = new UploadSingleFile();
        }

        return this.instance;
    }

    private static instance: UploadSingleFile;

    private constructor() {
    }

    public uploadFile(instance, path, field) {
        const config = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path);
            },
            filename: (req, file, cb) => {
                instance.fileName = Date.now() + "_img_" + file.originalname;
                cb(null, instance.fileName);
            },
        });
        return multer({ storage: config }).single(field);
    }
}
