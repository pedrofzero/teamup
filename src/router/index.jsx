import React, { Suspense } from 'react'
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import Home from '../pages/Home'

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Home />} />
        <Route path='/test' element={<>Test Page</>} />
        </>
    )
  )

  return (
    <Suspense fallback={<div className="loading" />}>
        <RouterProvider router={router} />
    </Suspense>
  )
}

export default Router
