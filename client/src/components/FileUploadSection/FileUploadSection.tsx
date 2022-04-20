import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import styles from './FileUploadSection.module.scss';
import useDrag from './hooks/useDrag';
import useFilesSelect from './hooks/useFilesSelect';
import { observer } from 'mobx-react-lite';
import FileStorageTimeSelection from '../FileStorageTimeSelection';
import { useStore } from 'context/RootStoreContext';
import { CSSTransition } from 'react-transition-group';

const FileUploadSection: FC = () => {
    const { containerRef, iconRef, dragEnterHandler, dragLeaveHandler, dropHandler, dragOverHandler } = useDrag();
    const { selectFiles } = useFilesSelect();
    const { filesStore } = useStore();

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
                    <FileCopyIcon color="primary" ref={iconRef} className={styles.icon} />
                    <Typography component="p" variant="h6" className={styles.mt}>
                        Перетащите сюда ваш файл
                    </Typography>
                    <Typography component="p">или</Typography>
                    <Button onClick={selectFiles} disabled={filesStore.file !== null}>
                        Выберите файл
                    </Button>
                </Grid>
            </Grid>
            <CSSTransition
                in={filesStore.file === null}
                timeout={300}
                classNames={{
                    exit: styles.animationExit,
                    exitActive: styles.animationExitActive,
                }}
                unmountOnExit
            >
                <Grid container mt={3} position="relative">
                    <Grid item>
                        <FileStorageTimeSelection />
                    </Grid>
                </Grid>
            </CSSTransition>
        </form>
    );
};

export default observer(FileUploadSection);
