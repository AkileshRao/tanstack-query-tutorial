import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WithQuery from './pages/WithQuery.jsx';
import WithoutQuery from './pages/WithoutQuery.jsx';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />
  },
  {
    path: '/withoutquery',
    element: <WithoutQuery />
  },
  {
    path: '/withquery',
    element: <WithQuery />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
