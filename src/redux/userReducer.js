import axios from 'axios';
const initialState = {
   email: null,
   firstName: null,
   lastName: null
}

//action type
const REQUEST_USER_DATA = 'REQUEST_USER_DATA';

export function requestUserData() {
   //stores response data from axios request to a variable
   let data = axios.get('/auth/user-data').then(res => res.data);
   return {
      type: 'REQUEST_USER_DATA',
      //payload has the user object that we use to destructure below
      payload: data
   }
}

//should make habit of always doing state=initialState 
export default function reducer(state=initialState, action) {
   switch(action.type) {
      case `${REQUEST_USER_DATA}_FULFILLED`:
         //destruct properties from user object in action payload
         const {email, firstName, lastName} = action.payload.user;
         //we are returning an object of state along with any updated values
         return {
            email,
            firstName,
            lastName
         }
      default:
         return state;
   }
}