
export const UPDATE_USER = 'UPDATE_USER'

import * as Auth from '../core/auth'

/**
* @desc opens a modal window to display a message
* @param string msg - the message to be displayed
* @return bool - success or failure
*/
export const login = (email, password, listener = null) => async (dispatch) => {

    try {
        let auth = await Auth.login(email, password)
        if (listener) listener.loginCompletes(auth)
    } catch (error) {
        if (listener) listener.loginCompletes(null, error)
    }
}

/**
* @desc opens a modal window to display a message
* @param string msg - the message to be displayed
* @return bool - success or failure
*/
export const register = (email, password, listener = null) => async (dispatch) => {
    try {
        let auth = await Auth.register(email, password)
        if (listener) listener.registerCompletes(auth)
    } catch (error) {
        if (listener) listener.registerCompletes(null, error)
    }
}

/**
* @desc opens a modal window to display a message
* @param string msg - the message to be displayed
* @return bool - success or failure
*/
export const fetchUser = () => async (dispatch) => {

    let user = null
    try {
        user = await Auth.fetchUser();
    } catch (error) {
        console.log(error)
    }

    dispatch({
        type: UPDATE_USER,
        user
    })

}