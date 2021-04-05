import {
  REGISTER_SUCCESS,
  SIGNIN_SUCCESS,
  SIGNOUT_SUCCESS,
  FETCH_USER,
} from '../constants/ActionTypes';

export const RegisterSuccess = () => {
  return {
    type: REGISTER_SUCCESS
  };
};

export const SigninSuccess = () => {
  return {
    type: SIGNIN_SUCCESS
  };
};

export const SignoutSuccess = () => {
  return {
    type: SIGNOUT_SUCCESS
  };
};

export const FetchUser = () => {
  return {
    type: FETCH_USER
  };
};
