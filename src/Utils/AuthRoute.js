import { Outlet, Navigate } from 'react-router-dom'
import { CommonUtils } from './commonUtils'
import { ROUTES } from '../Routes.constants'

const AuthRoute = () => {
    console.log(CommonUtils.isLoggedIn(),"isLogged------=======-------");
    return(
        CommonUtils.isLoggedIn() ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default AuthRoute