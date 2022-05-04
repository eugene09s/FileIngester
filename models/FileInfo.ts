import {Schema} from 'mongoose';

export interface FileInfo {
    _id: string,
    name: string;
    mimeType: string,
    size: number;
    downloads: number;
    uploadDate: Date;
    deleteDate: Date;
}

export const FileInfoSchema = new Schema<FileInfo>(
    {
        _id: {type: String, required: true},
        name: {type: String, required: true},
        mimeType: {type: String, required: true},
        size: {type: Number, required: true},
        downloads: {type: Number, required: true},
        uploadDate: {type: Date, required: true},
        deleteDate: {type: Date, required: true},
    },
    {
        collection: 'files',
        versionKey: false
    }
);