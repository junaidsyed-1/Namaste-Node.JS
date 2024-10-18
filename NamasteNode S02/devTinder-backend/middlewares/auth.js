const adminAuth = (req, res, next) => {
  console.log("Checking the auth for the admin");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Not Authorized");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("Checking the auth for the user");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Not Authorized");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
