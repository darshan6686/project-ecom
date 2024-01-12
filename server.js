require('dotenv').config();
const express = require('express');
const server = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
const userRoute = require('./routes/user_routes');
const path = require('path');
const indexRoute = require('./routes/admin/index_routes');
const indexroute = require('./routes/user/index_routes')
const imagePath = path.join(__dirname, 'public' ,'images');

async function main(){
    await mongoose.connect(process.env.MONGODB_PATH);
}
main()
    .then(() => {
        console.log("MongoDB connected successfully...");
    })
    .catch(() => {
        console.log(err);
    })

    server.use(express.json());
    server.use('/public/images',express.static(imagePath));

    server.use('/api/user', userRoute);
    server.use('/api/admin', indexRoute);
    server.use('/api/user', indexroute);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})