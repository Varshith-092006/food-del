import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://varshith:49174918vk@cluster0.vggikpg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DataBase Connected"));
}