import {setAccount, setToken, setRefreshToken, removeAccount, removeRefreshToken, removeToken, getAccount} from '../helpers/account'
import {SIGN_UP, SIGN_IN, SIGN_OUT, INIT_ACCOUNT, REFRESH_TOKEN} from '../actions/AccountActions';

const intialState = {
    account : null,
    error: null,
}

export default function(state = intialState, action){
    const {type, payload} = action;
    switch(type){
        case SIGN_IN:
        case SIGN_UP:
            const response = (payload) ? payload.data : null;
            const account = (response) ? response.data : null;
            const metadata = (response) ? response.metadata : null;

            const token = (metadata) ? metadata.token : null;
            const refreshtoken = (metadata) ? metadata.refreshtoken : null;

            if (account) setAccount(account);
            if (token) setToken(token);
            if (refreshtoken) setRefreshToken(refreshtoken);

            return {...state, account};
        case SIGN_OUT: {
            removeAccount();
            removeToken();
            removeRefreshToken();

            return {...state, account: null};
        }
        case INIT_ACCOUNT:{
            const account = getAccount();
            return {...state, account}
        }
        case REFRESH_TOKEN:{
            const response = (payload) ? payload.data : null;
            const metadata = (response) ? response.metadata : null;

            const token = (metadata) ? metadata.token : null;
            if (token) setToken(token);
            if (refreshtoken) setRefreshToken(refreshtoken);

            return state;

    }
        default:
            return state;
    }
}