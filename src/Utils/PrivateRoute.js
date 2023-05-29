import { Outlet, Navigate } from 'react-router-dom'
import { CommonUtils } from './commonUtils'

const PrivateRoute = () => {
    console.log(CommonUtils.isLoggedIn(),"------=====");
    return(
        !CommonUtils.isLoggedIn() ? <Outlet/> : <Navigate to="/home"/>
    )
}

export default PrivateRoute