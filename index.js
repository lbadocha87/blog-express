const express = require("express");
const app = express();
const hbs = require("express-handlebars");

// Import the mongoose module
const mongoose = require("mongoose");

// Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/blog";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    helpers: {
      splitString: function (string) {
        if(string.length > 50) {
            return string.split("").slice(1, 50).join("") + "...";
        } else {
            return string;
        }   
      },
    },
  })
);

app.set("view engine", "hbs");

const blogRouter = require("./routes/blogRouter");
const userRouter = require("./routes/userRoutes");

app.get("/", (_req, res) => {
  res.render("home");
});

app.use("/blog", blogRouter);
app.use("/user", userRouter);

app.listen(5500, () => {
  console.log("Server is working");
});
