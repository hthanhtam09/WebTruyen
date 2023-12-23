import mongoose from "mongoose"

const URI = process.env.DATABASE_URL || ''

const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log("Mongodb connect successful")
    }catch(err) {
        throw new Error("Error in connecting to mongodb.")
    }
}

export default connectDB