import {getTokenExpire} from '../../helpers/jwt';
import {getToken} from '../../helpers/account';
import { connect } from 'react-redux';
import {getRefreshToken} from '../../actions/AccountActions'
import { useEffect } from 'react';

const TokenRefresher = ({getRefreshToken}) => {
    const TRESHOLD = 30;
    const calculate = () => {
        const token = getToken();
        const expires = getTokenExpire(token);
        const secoundsToExpire = expires - (Date.now() / 1000);
        return secoundsToExpire;
    };

    useEffect(() => {
        const secoundsToExpire = calculate() - TRESHOLD;
      //  const readableTime = secondsToReadableTime(secoundsToExpire);
        const id = setTimeout(getRefreshToken, secoundsToExpire * 1000);
        return () => clearTimeout(id);
    },[getRefreshToken]);

   

    setTimeout(calculate, 1000);

    console.log(calculate);
return null;
};

const mapStateToProps = (state) => {
    return {
        account: state.account.account
    };
};


export default connect(mapStateToProps, {getRefreshToken})(TokenRefresher);