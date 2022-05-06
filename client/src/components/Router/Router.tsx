import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '@components/pages/UploadPage/Main';
import DownloadInfo from '@components/pages/DownloadInfo/DownloadInfo';

const Router: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/download/:fileId" element={<DownloadInfo />} />
        </Routes>
    );
};

export default Router;
