const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((con) => console.log("Connection created"));
const port = process.env.PORT;
app.listen(port || 3000, () => {
  console.log(`Server running on port ${port} `);
});
