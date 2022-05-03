import { useTheme } from '@mui/material';
import { blue, lightBlue } from '@mui/material/colors';
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
    const iconRef = useRef<SVGSVGElement>(null);
    const dragCounterRef = useRef<number>(0);
    const { filesStore } = useStore();

    const highlight = useCallback(() => {
        containerRef.current?.style.setProperty('background-image', getActiveBorderImage(theme.palette.primary.main));
        containerRef.current?.style.setProperty('background-color', '#e6f1ff');
        iconRef.current?.style.setProperty('top', '-10px');
    }, [theme.palette.primary.main]);

    const unhighlight = useCallback(() => {
        containerRef.current?.style.removeProperty('background-image');
        containerRef.current?.style.removeProperty('background-color');
        iconRef.current?.style.removeProperty('top');
    }, []);

    const dropHandler = useCallback(
        (e: React.DragEvent) => {
            preventDefaults(e);

            if (filesStore.file !== null) return;

            dragCounterRef.current = 0;
            unhighlight();

            const files = e.dataTransfer.files;

            if (files) filesStore.setFile(files[0]);
        },
        [unhighlight, filesStore]
    );

    const dragEnterHandler = useCallback(
        (e: React.DragEvent) => {
            if (filesStore.file !== null) return;

            dragCounterRef.current++;

            preventDefaults(e);
            highlight();
        },
        [highlight, filesStore.file]
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

    return { containerRef, iconRef, dragEnterHandler, dragLeaveHandler, dropHandler, dragOverHandler };
}

export default useDrag;
