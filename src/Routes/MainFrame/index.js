import React from 'react'
import TopNav from '../../Components/TopNav'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../Routes.constants'
import Home from '../Home'
import PrivateRoute from '../../Utils/PrivateRoute'
import { CommonUtils } from '../../Utils/commonUtils'
import AuthRoute from '../../Utils/AuthRoute'
import Login from '../Login'

const MainFrame = () => {
  return (
    <>
        // <TopNav/>
        <Routes>
            <Route element={<AuthRoute/>}>
                <Route path={ROUTES.HOME} element={<Home/>}/>
            </Route>
            <Route element={<PrivateRoute/>}>
                <Route path={ROUTES.LOGIN} element={<Login/>}/>
            </Route>
        </Routes>
    </>
  )
}

export default MainFrame