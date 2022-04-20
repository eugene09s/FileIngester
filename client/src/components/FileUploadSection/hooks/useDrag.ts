import { useTheme } from '@mui/material';
import { useStore } from 'context/RootStoreContext';
import React, { useCallback, useRef } from 'react';
import preventDefaults from 'utils/preventDefaults';

function getActiveBorderImage(color: string) {
    const imageColor = color.replace('#', '');

    return `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='21' ry='21' stroke='%23${imageColor}FF' stroke-width='4' stroke-dasharray='8%2c 16' stroke-dashoffset='2' stroke-linecap='round'/%3e%3c/svg%3e")`;
}

function useDrag() {
    const theme = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const dragCounterRef = useRef<number>(0);
    const { filesStore } = useStore();

    const highlight = useCallback(() => {
        containerRef.current?.style.setProperty('background-image', getActiveBorderImage(theme.palette.primary.main));
    }, [theme.palette.primary.main]);

    const unhighlight = useCallback(() => {
        containerRef.current?.style.removeProperty('background-image');
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
