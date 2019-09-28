import * as express from 'express';
import TYPES from '../types';
import * as multer from 'multer';
import * as fs from 'fs';

export class UploadSingleFile {

    private static instance: UploadSingleFile;

    private constructor() {
    }

    public static getInstance() {
        if (this.instance == null)
            this.instance = new UploadSingleFile();

        return this.instance;
    }

    public uploadFile (instance, path, field) {
        let config = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path)
            },
            filename: function (req, file, cb) {
                instance.fileName = Date.now()+"_img_"+file.originalname;
                cb(null, instance.fileName)
            }
        });
        return multer({ storage: config }).single(field);
    }
}