const path = require("path");

module.exports = path.dirname(require.main.filename); 


//This  gives us the path to the file that is responsible for the fact that our application is running
//In other words it points to the module that spuns up our app and returns the directory name
