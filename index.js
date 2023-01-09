require('dotenv').config();

const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const auth = require("./middlewares/authHelper");
const authApi = require("./middlewares/authApiHelper");

mongoose.connect(process.env.DB_ADDRESS, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
	
app.use(express.json());

app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    helpers: {
      splitString: (string) => {
        if (string.length > 50) {
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
const blogApiRouter = require("./api/router/blogApiRouter");
const userApiRouter = require("./api/router/userApiRouter");

app.get("/", (_req, res) => {
  res.render("home");
});

app.use("/blog", auth, blogRouter);
app.use("/user", userRouter);
app.use("/api/blog", authApi, blogApiRouter);
app.use("/api/user", userApiRouter);


app.listen(process.env.SERVER_PORT || 5500, () => {
  console.log("Server is working on port " + process.env.SERVER_PORT);
});
