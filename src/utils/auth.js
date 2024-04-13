import checkResponse from './checkResponse.js';
import { REGISTER, LOGIN } from '../constants/constantAPI.js';

export const register = ({ fullName, email, password }) =>
  fetch(REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fullName, email, password }),
  }).then((res) => checkResponse(res));

export const authorize = ({ email, password }) =>
  fetch(LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
