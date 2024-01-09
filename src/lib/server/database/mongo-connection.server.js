import mongoose from "mongoose";
var connectionUrl = "mongodb+srv://joyalthomas373:gbGMEksrc9oMJ9g7@cluster0.dpjubjh.mongodb.net/?retryWrites=true&w=majority"
var connection = mongoose.connect(connectionUrl);
export default connection;





