import { Button, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import styles from './FileUploadSection.module.scss';
import useDrag from './hooks/useDrag';
import useFilesSelect from './hooks/useFilesSelect';
import useFilesHandler from './hooks/useFilesHandler';
import { observer } from 'mobx-react-lite';

const FileUploadSection: FC = () => {
    useFilesHandler();
    const { containerRef, dragEnterHandler, dragLeaveHandler, dropHandler, dragOverHandler } = useDrag();
    const { selectFiles } = useFilesSelect();

    return (
        <form className={styles.form}>
            <Grid
                ref={containerRef}
                container
                justifyContent="center"
                alignItems="center"
                p={2.5}
                className={styles.container}
                onDragEnter={dragEnterHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragOverHandler}
                onDrop={dropHandler}
            >
                <Grid container item direction="column" alignItems="center">
                    <CloudUploadOutlinedIcon sx={{ fontSize: 100 }} color="primary" />
                    <Typography component="p" variant="h6">
                        Перетащите сюда ваши файлы
                    </Typography>
                    <Typography component="p">или</Typography>
                    <Button onClick={selectFiles}>Выберите файлы</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default observer(FileUploadSection);
