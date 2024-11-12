import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Encuentra el elemento donde deseas renderizar tu aplicación
const container = document.getElementById('root');

// Usa createRoot para inicializar y renderizar el componente App
const root = createRoot(container);
root.render(<App />);
