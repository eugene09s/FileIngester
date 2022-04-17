import { useStore } from 'context/RootStoreContext';
import { useEffect } from 'react';
import uploadFiles from '../utils/uploadFiles';

function useFilesHandler() {
    const { filesStore } = useStore();

    useEffect(() => {
        if (filesStore.files) uploadFiles(filesStore.files);
    }, [filesStore.files]);
}

export default useFilesHandler;
