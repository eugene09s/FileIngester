import FilesInfo from '@components/FilesInfo';
import FileUploadSection from '@components/FileUploadSection';
import { Container } from '@mui/material';
import { FC } from 'react';
import styles from './Main.module.scss';

const Main: FC = () => {
    return (
        <Container className={styles.container}>
            <FileUploadSection />
            <FilesInfo />
        </Container>
    );
};

export default Main;
