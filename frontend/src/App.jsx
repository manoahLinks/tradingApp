import { useState } from 'react';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import { Main } from './layouts';
import { Dashboard, HomePage, Login, Signup } from './pages';

function App() {

  const router = createBrowserRouter([
    {
      path: `/`,
      element: <Main/>,
      children: [
        {
          index: true,
          element: <Dashboard/>
        },
        {
          path: `/home`,
          element: <HomePage/>
        },

        {
          path: `/signup`,
          element: <Signup/>
        },

        {
          path: `/login`,
          element: <Login/>
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
