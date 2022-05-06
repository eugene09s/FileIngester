import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dateFormat from 'dateformat';

type FileInfo =
    | {
          data: {
              name: string;
              mimeType: string;
              size: number;
              downloads: number;
              uploadDate: string;
              deleteDate: string;
          };
          error: never;
      }
    | { data: never; error: string };

function useDownload() {
    const { fileId } = useParams<'fileId'>();
    const [fileInfo, setFileInfo] = useState<FileInfo['data'] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        async function fetchFile() {
            setLoading(true);

            try {
                const response = await axios.get<FileInfo>(`/api/files/info/${fileId}`);
                const result = response.data;

                console.log(result);

                if (result.error) {
                    throw new Error(result.error);
                } else {
                    setFileInfo(result.data);
                }
            } catch (err) {
                if (err instanceof AxiosError) {
                    setError((err.response?.data as FileInfo).error);
                } else if (err instanceof Error) {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        if (fileInfo === null) fetchFile();
    }, [fileId, fileInfo]);

    useEffect(() => {
        if (fileInfo !== null) {
            fileInfo.uploadDate = dateFormat(fileInfo.uploadDate, 'dddd, mmmm dS, yyyy, HH:MM:ss TT');
            fileInfo.deleteDate = dateFormat(fileInfo.deleteDate, 'dddd, mmmm dS, yyyy, HH:MM:ss TT');
        }
    }, [fileInfo]);

    return { loading, fileInfo, fileId, error };
}

export default useDownload;
