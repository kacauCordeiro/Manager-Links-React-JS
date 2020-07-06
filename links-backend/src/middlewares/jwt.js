const {verifyJwt, verifyRefreshJwt, getTokenFromHeaders} = require('../helpers/jwt');

const checkJwt = (req, res, next) => {

    const {url: path} = req;
    console.log('***middleware.jwt.checkJwt: ulr: path ----',  path);

    const excludedPaths = ['/auth/sign-in/','/auth/sign-up/', '/auth/refresh/'];

    const iSexcluded = !!excludedPaths.find(p=> p.startsWith(path));

    console.log('***middleware.jwt.checkJwt: Is Excluded ----', iSexcluded);

    const token = getTokenFromHeaders(req.headers);
    console.log('***middleware.jwt.checkJwt:', req.headers)
    console.log('***middleware.jwt.checkJwt:', token);

    token = token ? token.slice(7, token.length): null;
    if(!token){
        return res.jsonUnauthorized(null, 'Invalid token');
    }

    try {
        const decoded = verifyJwt(token);
        req.accountedId = decoded.id;
    } catch (error){
        return res.jsonUnauthorized(null, 'Invalid token');
    }
    

    console.log('Token', token);
    console.log('decoded', decoded)

   // next();
}

module.exports = checkJwt;