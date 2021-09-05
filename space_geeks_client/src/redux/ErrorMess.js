import * as ActionTypes from './ActionTypes';

export const ErrorMess=(state = {
        errMess: null,
    }, action) => {
    switch(action.type) {
        case ActionTypes.ErrorMess:
            return {...state, errMess: action.payload};

        default:
            return state;
    }
}