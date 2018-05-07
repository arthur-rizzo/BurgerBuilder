import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {

    it('should return initialState', () => {

        const initialState = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }

        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should store the token upon login', () => {

        const initialState = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }
        const action  = {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'idToken',
            userId: 'userId'
        };

        const expectedState = {
            token: 'idToken',
            userId: 'userId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        }

        expect(reducer(initialState, action)).toEqual(expectedState)
    })


})