import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
} from './types';

// How to use ASyncStorage:
// AsyncStorage.setItem('fb_token', token); SET AS KEY
// AsyncStorage.getItem('fb_token'); GET FROM KEY

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
        // Dispatch an action saying FB login is done
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
    } else {
        // Start up FB Login process
        doFacebookLogin(dispatch);

    }
};

const doFacebookLogin = async dispatch => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('1720542881362329', {
        permissions: ['public_profile']
    });

    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL })
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token})
};
