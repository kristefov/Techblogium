/**
 * This is a middleware function that checks if a user is logged in and redirects them to the login
 * page if they are not.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client to
 * the server. It contains information about the request, such as the URL, headers, and any data sent
 * in the request body.
 * @param res - `res` stands for response. It is an object that represents the HTTP response that an
 * Express app sends when it receives an HTTP request. It contains methods for sending the response
 * back to the client, such as `res.send()`, `res.json()`, `res.redirect()`, etc. In
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to move on to the next middleware function after the current
 * middleware function has completed its task. In this case, `next()` is called if the user is
 * authenticated, which allows
 */
const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = withAuth;