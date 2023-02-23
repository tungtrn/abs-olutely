import './App.css';

import React from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './app/routes/routes';

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>

  );
}

export default App;
