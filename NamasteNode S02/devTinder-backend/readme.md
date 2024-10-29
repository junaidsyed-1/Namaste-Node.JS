# What packages will we use in our project?

- Node.js framework: Express.js
- For DB: MongoDB, Mongoose
- Validaor : For validation
- bcrypt - for password hash
- cookie-parser
- JWT - token

# Node modules

- Node modules are the acutal files and code for packages(dependencies) which we install in a Node.js project. It is basically like a package manager, node modules has so many packages, it is more like a space in which there are thousands of dependencies lying.

# package.json

- package.json is a file which contains the metadata about a Node.js project, all the dependencies that the project requires and the version.

# package-lock.json

- package-lock.json is a file that is automatically generated when installing dependencies with npm. It locks the exact versions of the depencdency(and their dependencuies) to ensure consistency across different environment.

# When we create route the order of the route matter. because the routing is oreder-dependent.

- Express executes routes in the order they are defined. If you put a more general route like "/" first, it can catch requests intended for more specific routes (like /dash or /test), making them unreachable.
- Since this is synchronous code, once a response is sent (e.g., res.send()), the request is considered handled, and no further routes are checked.

# Routing

=> Routing refers to how an application's endpoint(url) should response to client request. In express basically there are multiple HTTP methods:

1. GET : we use GET to fetch the details.
2. POST : we use POST to save the data to DB.
3. PUT : Used to update the data
4. PATCH : Used to update the data
5. DELETE: Used to delete the data from the DB
6. OPTIONS

# Route paths

=> Route paths in combination with a request method, define the endpoint at which requests can be made. Route paths can be string, string patterns and regex.
For Instance: The characters ?, +, \* and () are subsets of their regular expression.

# Route Parameters

=> Route parameters are named URL segments that are used to capture the values from the url at their specified position at the URL. Then the captured value are populated in the req.param.

# What is a request/route handler?

=> Request/Route handler is a functions in Express that processes incoming HTTP requests and sends back a response. The handler define what the server should do when a specific route is hit, such as retrieving data, processing it, and sending a response back to the client.
We can also have multiple route handler in the same route.

# Middleware

=> Middleware in Express referes to functions that execute in the order they are defined, before the next route handler is called.

# Why do we need middleware?

=> We need middleware because they can perform various tasks such as processing requests, modifying the request and response objects, executing code, and ending the request-response cycle by sendig a response. Middleware continues to run until a response is sent or next() function is called to pass control to the next middleware or route handler.

=> While creating routes we can also use regex in the string. We can use dynamic routing we can use query and also params.

# In Mongoose: An instance of a model is called a document. Creating them and saving to the database is easy.

# APIs for devTinder

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## requestRouter

- POST /request/send/:status("interested","ignored")/:userId
- POST /request/review/:status("accepted","rejected")/:requestId

## userRouter

- GET /user/requests/received
- GET /user/connections

- GET /user/feed
