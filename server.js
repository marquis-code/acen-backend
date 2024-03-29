const express = require("express");
const app = express();
const morgan = require("morgan");
// const helment = require("helmet")
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
const connectDB = require("./config/db.cofig");

connectDB();

// middleware
const corsOptions = {
  // origin:'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));
// app.use(helment());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const authRouter = require("./routes/auth.routes");
const memberRouter = require("./routes/member.routes");
const payment = require("./routes/payment.routes");
const newsRouter = require("./routes/news.routes");
const publicationsRouter = require("./routes/publications.routes");
const eventsRouter = require("./routes/events.routes");

// map URL starts:
// app.get("*", checkUser);
app.use("/api/auth", authRouter);
app.use("/api/member", memberRouter);
app.use("/api/news", newsRouter);
app.use("/api/publications", publicationsRouter);
app.use("/api/pay", payment);
app.use("/api/events", eventsRouter);


app.use(function(err, req, res, next) {
  console.log(res.locals, 'locals here')
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});


module.exports = app;
