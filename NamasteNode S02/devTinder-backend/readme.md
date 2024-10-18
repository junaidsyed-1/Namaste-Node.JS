# What packages will we use in our project?
- Node.js framework: Express.js
- For DB: MongoDB

# Node modules
- Node modules are the acutal files and code for packages(dependencies) which we install in a Node.js project. It is basically like a package manager, node modules has so many packages, it is more like a space in which there are thousands of dependencies lying.

# package.json
- package.json is a file which contains the metadata about a Node.js project, all the dependencies that the project requires and the version.

# package-lock.json
- package-lock.json is a file that is automatically generated when installing dependencies with npm. It locks the exact versions of the depencdency(and their dependencuies) to ensure consistency across different environment.

# What is a request handler?
- Request handler is a functions in Express that processes incoming HTTP requests and sends back a response. The handler define what the server should do when a specifi route is hit, such as retrieving data, processing it, and sending a response back to the client.