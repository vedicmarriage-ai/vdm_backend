// HTTP Strict Transport Security Middleware
module.exports = (req, res, next) => {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
};