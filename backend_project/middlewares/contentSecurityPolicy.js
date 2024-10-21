// Content Security Policy Middleware
module.exports = (req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
};