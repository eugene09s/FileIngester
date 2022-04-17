import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '@components/Main';

const Router: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
        </Routes>
    );
};

export default Router;
