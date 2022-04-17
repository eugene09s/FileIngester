import { StyledEngineProvider } from '@mui/material';
import { RootStoreContextProvider } from 'context/RootStoreContext';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './styles/global.scss';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <StyledEngineProvider injectFirst>
                <RootStoreContextProvider>
                    <App />
                </RootStoreContextProvider>
            </StyledEngineProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
