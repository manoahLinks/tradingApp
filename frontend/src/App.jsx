import { useState } from 'react';

import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from 'react-router-dom';

// library imports
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Main } from './layouts';
import { Dashboard, HomePage, Login, Logout, Signup, Verification } from './pages';
import { useAuthContext } from './hooks/useAuthContext';
import { Error } from './components';

function App() {

  const {user} = useAuthContext()

  const router = createBrowserRouter([
    {
      path: `/`,
      element: <Main/>,
      errorElement: <Error/>,
      children: [  
        {
          index: true,
          element: !user ? <HomePage/>: <Navigate to={`/dashboard`}/>,
          errorElement: <Error/>,
        },
        {
          path: `/signup`,
          element: !user ? <Signup/> : <Navigate to={`/dashboard`}/>,
          errorElement: <Error/>
        },

        {
          path: `/login`,
          element: !user ? <Login/> : <Navigate to={`/dashboard`}/>,
          errorElement: <Error/>
        },

        {
          path: `/verification`,
          element: !user ? <Verification/> : <Navigate to={`/dashboard`}/>,
          errorElement: <Error/>
        },
        {
          path: `/dashboard`,
          element: user ? <Dashboard/> : <Navigate to={`/login`}/>,
          errorElement: <Error/>
        },
        {
          path: `/logout`,
          element: user ? <Logout/> : <Navigate to={`/login`}/>,
          errorElement: <Error/>
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer/>
    </>
  )
}

export default App
