import mongoose from "mongoose";

const uri =
  "mongodb+srv://balajisenwell:G4dVwdrKT8ROoaRs@cluster0.xac2t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToServer = async (callback) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB.");
    callback();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    callback(err);
  }
};

export default connectToServer;
