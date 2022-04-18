import { Schema, model } from 'mongoose';

interface FileInfo {
    name: string;
    size: number;
    downloads: number;
    uploadDate: Date;
    deleteDate: Date;
}

const FileInfoSchema = new Schema<FileInfo>(
    {
        name: { type: String, required: true },
        size: { type: Number, required: true },
        downloads: { type: Number, required: true },
        uploadDate: { type: Date, required: true },
        deleteDate: { type: Date, required: true },
    },
    {
        collection: 'files',
    }
);

export default model<FileInfo>('FileInfo', FileInfoSchema);
