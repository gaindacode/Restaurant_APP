import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeApp } from './services/firebase/initialize';
import { App } from './App';
import './index.css';

async function bootstrap() {
  try {
    // Initialize Firebase with optimized settings
    await initializeApp();

    // Mount React application
    const root = createRoot(document.getElementById('root')!);
    
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize application:', error);
    
    // Show user-friendly error message
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div class="max-w-md w-full text-center">
            <h1 class="text-2xl font-bold text-gray-900 mb-2">
              Unable to Start Application
            </h1>
            <p class="text-gray-600">
              Please refresh the page or try again later.
            </p>
          </div>
        </div>
      `;
    }
  }
}

bootstrap();