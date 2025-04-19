import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import LayoutRoot from "./components/LayoutRoot";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import UserNew from "./components/UserNew";
import UserDetail from "./components/UserDetail";
import { Provider } from "react-redux";
import { store } from "./stores";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "create-new-user",
        element: <UserNew />,
      },
      {
        path: "user/:id",
        element: <UserDetail />,
      },
      {
        path: "user/edit/:id",
        element: <UserNew />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <React.StrictMode>
        <LayoutRoot />
      </React.StrictMode>
    </RouterProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();