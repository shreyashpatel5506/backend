const mongoose = require('mongoose');
import { put } from "@vercel/blob";

// MongoDB URI (include the database name at the end)
const mongoURI = "mongodb+srv://shreyash:Shreyash%40123@cluster0.xzlmk.mongodb.net/inotebook?retryWrites=true&w=majority";

// Function to connect to MongoDB
const connectToMongo = async () => {  
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

// Function to upload a file to Vercel Blob storage
const uploadToVercelBlob = async () => {
  try {
    const { url } = await put('articles/blob.txt', 'Hello World!', { access: 'public' });
    console.log("File uploaded successfully. Access the file at:", url);
  } catch (err) {
    console.error("Failed to upload file to Vercel Blob:", err);
  }
};

// Main function that connects to MongoDB and uploads a file
const main = async () => {
  await connectToMongo();  // Connect to MongoDB
  await uploadToVercelBlob();  // Upload file to Vercel Blob storage
};

main();
