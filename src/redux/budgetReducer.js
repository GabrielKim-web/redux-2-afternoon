import axios from 'axios';
const initialState = {
   purchases: [],
   budgetLimit: null,
   loading: false
}

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA';
const ADD_PURCHASE = "ADD_PURCHASE";
const REMOVE_PURCHASE = "REMOVE_PURCHASE";

export function removePurchase(id) {
   let data = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data);
   // remember; this is an action object, e.g. action.payload = data
   return {
      type: "REMOVE_PURCHASE",
      payload: data
   }
}

export function addPurchase(price, description, category) {
   let addPurchase = {
      price,
      description,
      category
   }
   let data = axios.post('/api/budget-data/purchase', addPurchase).then(res => res.data);
   return {
      type: 'ADD_PURCHASE',
      payload: data
   }
}

export function requestBudgetData() {
   //gets data from response via axios request
   let data = axios.get('/api/budget-data').then(res => res.data);
   return {
      type: 'REQUEST_BUDGET_DATA',
      //sets the action.payload equal to that data
      payload: data
   }
}

export default function reducer(state=initialState, action) {
   switch(action.type) {
      case `${REQUEST_BUDGET_DATA}_PENDING`:
         return {
            ...state,
            loading: true
         }
      case `${REQUEST_BUDGET_DATA}_FULFILLED`:
         const {purchases, budgetLimit} = action.payload
         return {
            ...state,
            purchases,
            budgetLimit,
            loading: false
         }
      case `${ADD_PURCHASE}_PENDING`:
         return {
            ...state,
            loading: true
         }
      case `${ADD_PURCHASE}_FULFILLED`:
         return {
            ...state,
            //when a purchase is added, we want to store the new payload in the global initialState and update the key-value pairs we want to change; if we use spread like this we are NOT replacing the original data because spread operator makes a copy of the data!
            // ...action.payload,
            purchases: action.payload,
            loading: false
         }
      case `${REMOVE_PURCHASE}_PENDING`:
         return {
            ...state,
            loading: true
         }
      case `${REMOVE_PURCHASE}_FULFILLED`:
         return {
            ...state,
            //tldr; be careful of where to use the spread operator!
            // ...action.payload,
            purchases: action.payload,
            loading: false
         }
      default:
         return state;
   }
}