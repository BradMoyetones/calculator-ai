import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './routes';
import { ThemeProvider } from './components/theme-provider';
import '@/styles/globals.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="ui-theme"
        >
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode>
);
