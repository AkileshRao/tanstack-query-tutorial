import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WithQuery from './pages/WithQuery.jsx';
import WithoutQuery from './pages/WithoutQuery.jsx';
import WithInfiniteQuery from './pages/WithInfiniteQuery.jsx';
import Tasks from './pages/Tasks.jsx';
import Post from './pages/Post.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
  },
  {
    path: '/withquery/:id',
    element: <Post />
  },
  {
    path: '/tasks',
    element: <Tasks />
  },
  {
    path: '/withinfinitequery',
    element: <WithInfiniteQuery />
  }
]);

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 2000
    }
  }
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools></ReactQueryDevtools>
    </React.StrictMode>,
  </QueryClientProvider>
)
