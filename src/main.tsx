import 'reflect-metadata'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {configure} from "mobx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ExamplePage} from "./pages/example-page/ExamplePage.tsx";

configure({
    enforceActions: "never",
});
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/example",
        element: <ExamplePage />,
    },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
