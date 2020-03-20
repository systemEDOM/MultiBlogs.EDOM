import * as multer from "multer";

export class UploadSingleFile {
    private static instance: UploadSingleFile;

    private constructor() {
        //
    }

    public static getInstance(): UploadSingleFile {
        if (this.instance == null) {
            this.instance = new UploadSingleFile();
        }

        return this.instance;
    }

    public uploadFile(instance, path, field): multer {
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
