import { useStore } from 'context/RootStoreContext';
import { useCallback, useState } from 'react';
import { UploadStatuses } from 'stores/FilesStore';

function useDownloadLink() {
    const { filesStore } = useStore();
    const link = `${window.location.origin}/download/${filesStore.uploadedFileId}`;
    const [linkCopied, setLinkCopied] = useState<boolean>(false);

    const uploadMore = useCallback(() => {
        filesStore.setStatus(UploadStatuses.NO_FILE);
    }, [filesStore]);

    const copyLink = useCallback(() => {
        window.navigator.clipboard.writeText(link);
        setLinkCopied(true);
    }, [link]);

    return { link, linkCopied, uploadMore, copyLink };
}

export default useDownloadLink;
