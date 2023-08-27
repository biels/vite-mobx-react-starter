import 'reflect-metadata'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {configure} from "mobx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

configure({
    enforceActions: "never",
});
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
