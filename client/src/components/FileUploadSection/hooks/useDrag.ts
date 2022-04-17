import { useTheme } from '@mui/material';
import { useStore } from 'context/RootStoreContext';
import React, { useCallback, useRef } from 'react';
import preventDefaults from 'utils/preventDefaults';

function useDrag() {
    const theme = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const dragCounterRef = useRef<number>(0);
    const { filesStore } = useStore();

    const highlight = useCallback(() => {
        containerRef.current?.style.setProperty('border-color', theme.palette.primary.main);
    }, [theme.palette.primary.main]);

    const unhighlight = useCallback(() => {
        containerRef.current?.style.removeProperty('border-color');
    }, []);

    const dropHandler = useCallback(
        (e: React.DragEvent) => {
            dragCounterRef.current = 0;

            preventDefaults(e);
            unhighlight();

            const files = e.dataTransfer.files;

            if (files) filesStore.setFiles(files);
        },
        [unhighlight, filesStore]
    );

    const dragEnterHandler = useCallback(
        (e: React.DragEvent) => {
            dragCounterRef.current++;

            preventDefaults(e);
            highlight();
        },
        [highlight]
    );

    const dragLeaveHandler = useCallback(
        (e: React.DragEvent) => {
            preventDefaults(e);

            dragCounterRef.current--;

            if (dragCounterRef.current === 0) unhighlight();
        },
        [unhighlight]
    );

    const dragOverHandler = useCallback(preventDefaults, []);

    return { containerRef, dragEnterHandler, dragLeaveHandler, dropHandler, dragOverHandler };
}

export default useDrag;
