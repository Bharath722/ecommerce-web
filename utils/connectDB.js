import mongoose from "mongoose"

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    // eslint-disable-next-line no-console
    console.log("Already connected.")
    return
  }
  mongoose.connect(
    process.env.MONGODB_URL,
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err
      // eslint-disable-next-line no-console
      console.log("Connected to mongodb.")
    }
  )
}

export default connectDB
