import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '@components/Main';
import DownloadInfo from "@components/DownloadInfo/DownloadInfo";

const Router: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/download" element={<DownloadInfo />} />
        </Routes>
    );
};

export default Router;
