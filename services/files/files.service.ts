import {GetFileData} from './types';
import {Model} from 'mongoose';
import databaseConnectionService from "./db.service"
import {FileInfo} from "../../models/FileInfo";
import fileUpload from "express-fileupload";


const FileInfoModel: Model<FileInfo> = databaseConnectionService.connectToDB();

let fs = require('fs');
const {CronJob} = require('cron');

new CronJob('0 0 * * * *', () => {
    console.log('Expired files cleaner triggered!');
    FileInfoModel.find((err, fileInfos) => {
        if (!err) {
            fileInfos.forEach(fileInfo => {
                if (fileInfo.deleteDate <= new Date()) {
                    let path = './uploads/' + fileInfo._id + '.lz4';
                    if (fs.existsSync(path)) {
                        fs.unlinkSync(path);
                        console.log(path + " is deleted due to expiration")
                    }
                }
            })
        } else {
            throw err;
        }
    })
}).start();

class FilesService {

    getFileInfo({fileId}: GetFileData) {
        // get file info from database and return it
        return FileInfoModel.findById(fileId, (err: any, res: any) => {
            if (!err) {
                if (res) {
                    console.log('File info for ' + fileId + ' id is downloaded!');
                } else {
                    console.log('File info for ' + fileId + ' id is not found!');
                }
            } else {
                throw err;
            }
        }).clone();
    }

    async uploadFile(uploadedFile: fileUpload.UploadedFile, id: string, expirationMS: number) {
        //insert file info to DB
        const newFile = new FileInfoModel();
        newFile.name = uploadedFile.name;
        newFile.size = uploadedFile.size;
        newFile.mimeType = uploadedFile.mimetype;
        newFile._id = id;
        newFile.uploadDate = new Date();
        let deleteDateMS = new Date().getTime() + expirationMS * 1;
        newFile.deleteDate = new Date(+deleteDateMS);
        newFile.downloads = 0;
        await newFile.save(function (err) {
            if (!err) {
                console.log("File info for " + newFile.name + " is inserted to DB successfully!");
            } else {
                throw err;
            }
        });

        //Compress and upload to directory
        await fs.writeFile('./uploads/' + id + '.lz4', uploadedFile.data, (err: any) => {
            if (!err) {
                console.log('File: ./uploads/' + id + '.lz4 is uploaded!');
            } else {
                throw err;
            }
        });
    }

    incrementDownloads(fileId: string) {
        FileInfoModel.findByIdAndUpdate(fileId, {$inc: {'downloads': 1}}, (err: any) => {
            if (err) {
                throw err;
            }
        });
    }


    downloadFile(fileId: string): Buffer | null {
        let path = './uploads/' + fileId + '.lz4';
        if (!fs.existsSync(path)) {
            console.error("File not found on server");
            return null;
        }
        let compressedContent = fs.readFileSync(path);
        console.log("File " + path + " is downloaded!");
        return compressedContent;
    }

    deleteFile(fileId: string) {
        let path = './uploads/' + fileId + '.lz4';
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
    }
}

export default new FilesService();
