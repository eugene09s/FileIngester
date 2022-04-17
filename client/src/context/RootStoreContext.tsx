import { createContext, FC, useContext } from 'react';
import RootStore from 'stores/RootStore';

const store: RootStore = new RootStore();
const RootStoreContext = createContext<RootStore | undefined>(undefined);

export function useStore() {
    const context = useContext(RootStoreContext);

    if (context === undefined) {
        throw new Error('useStore must be used within RootStoreContextProvider');
    }

    return context;
}

export const RootStoreContextProvider: FC = (props) => {
    return <RootStoreContext.Provider value={store}>{props.children}</RootStoreContext.Provider>;
};
