import React, { Suspense } from 'react'
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom'

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<>Home Page</>} />
        <Route path='/test' element={<>Test Page</>} />
        </>
    )
  )

  return (
    <Suspense fallback={<div className="loading" />}>
      <div className="">
        <RouterProvider router={router} />
      </div>
    </Suspense>
  )



}
export default Router
