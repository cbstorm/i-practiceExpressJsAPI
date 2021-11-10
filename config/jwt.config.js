const jwt = require('jsonwebtoken');

// Sign Access Token
const signAccessToken = async (userdata) => {
    const token = await jwt.sign(
        { ...userdata },
        process.env.ACCESS_TOKEN_SECRET,
        {
            audience: 'i-pratice client',
            issuer: 'i-practice server',
            expiresIn: '10m',
        }
    );
    return token;
};

// Verify Access Token
const verifyAccessToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

// Sign Refresh Token
const signRefreshToken = async (userdata) => {
    const token = await jwt.sign(
        { ...userdata },
        process.env.REFRESH_TOKEN_SECRET,
        {
            audience: 'i-pratice client',
            issuer: 'i-practice server',
            expiresIn: '5 days',
        }
    );
    return token;
};

// Verify Refresh Token
const verifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

const decodeGoogleToken = (token) => {
    const data = jwt.decode(token);
    return data;
};

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    decodeGoogleToken,
};
