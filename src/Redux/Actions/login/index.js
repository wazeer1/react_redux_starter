import {LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAILED} from '../Redux.constants';
import {login} from '../../api/login';

export function signIn(payload) {
    return async (dispatch) => {
        dispatch({
            type: LOGIN_STARTED,
            payload: {},
        });
        try {
            const data = await login(payload);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: LOGIN_FAILED,
                payload: error,
            });
        }
    };
}
