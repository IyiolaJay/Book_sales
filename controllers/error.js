exports.get404 = (req, res, next) => {
  //   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  // res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
  res.status(404).render("404", {
    docTitle: "Page Not found",
    path: "error",
    isAuthenticated: req.session.isLoggedIn,
  });
};
