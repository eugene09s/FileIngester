import { useStore } from 'context/RootStoreContext';
import { useCallback, useEffect, useRef, useState } from 'react';

function useFilesHandler() {
    const { filesStore } = useStore();
    const [progress, setProgress] = useState<number>(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // example
    const uploadFile = useCallback(() => {
        if (timerRef.current === null) {
            timerRef.current = setInterval(() => {
                setProgress((progress) => {
                    if (timerRef.current !== null && progress >= 100) {
                        clearInterval(timerRef.current);
                        return progress;
                    }

                    return progress + 10;
                });
            }, 500);
        }
    }, []);

    useEffect(() => {
        if (filesStore.file !== null) uploadFile();

        return () => {
            if (timerRef.current !== null) clearInterval(timerRef.current);
        };
    }, [filesStore.file, uploadFile]);

    return { progress };
}

export default useFilesHandler;
