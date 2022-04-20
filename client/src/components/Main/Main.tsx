import FilesInfo from '@components/FilesInfo';
import FileUploadSection from '@components/FileUploadSection';
import { Container } from '@mui/material';
import { FC } from 'react';
import styles from './Main.module.scss';

const Main: FC = () => {
    return (
        <div className={styles.main}>
            <Container className={styles.container} maxWidth="md">
                <FileUploadSection />
                {/* <FilesInfo /> */}
            </Container>
        </div>
    );
};

export default Main;
