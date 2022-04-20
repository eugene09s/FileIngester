import { useStore } from 'context/RootStoreContext';
import { useCallback } from 'react';

function useFilesSelect() {
    const { filesStore } = useStore();

    const selectFiles = useCallback(() => {
        const input = document.createElement('input');

        input.type = 'file';
        input.multiple = true;

        input.addEventListener('change', function () {
            if (this.files) filesStore.setFile(this.files[0]);
        });
        input.click();
    }, [filesStore]);

    return { selectFiles };
}

export default useFilesSelect;
