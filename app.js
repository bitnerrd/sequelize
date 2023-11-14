require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// Cross-Origin Resource Sharing
const corsOptions = {
  origin: `http://localhost:${process.env.PORT}`,
};
app.use(cors(corsOptions));

//body parser
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", require("./routes/index"));
app.use("/admin", require("./routes/admin"));

const db = require("./config");
db.sequelize
  .sync()
  .then(() => {
    console.log(`Database Models Sync...`);
  })
  .catch((err) => {
    console.log(`Database Models Failed to Sync... ${err.message}`);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is up on port ${process.env.PORT}`);
});
