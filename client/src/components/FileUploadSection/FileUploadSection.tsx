import { Button, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import FileCopyIcon from '@mui/icons-material/FileCopy';
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
                px={5}
                py={8}
                className={styles.container}
                onDragEnter={dragEnterHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragOverHandler}
                onDrop={dropHandler}
            >
                <Grid container item direction="column" alignItems="center">
                    <FileCopyIcon sx={{ fontSize: 60 }} color="primary" />
                    <Typography component="p" variant="h6" className={styles.mt}>
                        Перетащите сюда ваш файл или
                    </Typography>
                    <Typography component="p">или</Typography>
                    <Button onClick={selectFiles}>Выберите файл</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default observer(FileUploadSection);
