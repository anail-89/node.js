const jwt = require('jsonwebtoken');

class TokenManager {
    static encode(data, expiresIn = 60 * 60 * 24) {
        return jwt.sign(data, 'hi', {
            expiresIn
        });
    }

    static async decode(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, 'hi', function (err, decoded) {
                if (err) {
                    return reject(err);
                }
                resolve(decoded);
            });
        })
    }
}

module.exports = TokenManager;
