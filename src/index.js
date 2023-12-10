import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});
connectDB()
  .then(
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running on port ${process.env.PORT}`);
      app.on("error", () => {
        console.log("error from db", error);
        throw error;
      });
    })
  )
  .catch((err) => {
    console.log("errorfrom ./indexx", err);
  });
/*
const app = express()(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    app.on("error", () => {
      console.log("error from db", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`app is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
})();
*/
