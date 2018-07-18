/**
 * Created by bhuang on 1/5/18.
 */
import expect from 'expect'
import { userConstants } from '../constants/userConstants'
import {signup} from './signupReducer'

expect(
    signup({}, {type: userConstants.REGISTER_REQUEST})
).toEqual({registering: true})

