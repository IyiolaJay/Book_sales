exports.getLogin = (req, res, next) => {
const isLoggedIn = req.get("Cookie").split("=")[1].trim();
  res.render("auth/login", {
    docTitle: "Login",
    path: "/login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
