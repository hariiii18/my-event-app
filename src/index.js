// プログラムを実行する最初の場所

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';  // パスは直した後のもの

const container = document.getElementById('root');
createRoot(container).render(<App />);




