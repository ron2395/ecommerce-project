import mongoose from 'mongoose';
import 'colors';
import 'dotenv/config';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import Review from './models/reviewSchema.js';
import connectDb from './config/db.js';

connectDb();

const seedData = async() => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        await Review.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map(product =>{
            return {...product, user: adminUser}
        });

        await Product.insertMany(sampleProducts);

        console.log('data imported'.green.inverse)
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async() => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        await Review.deleteMany();

        console.log('data destroyed'.red.inverse)
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse.underline);
        process.exit(1);
    }
}

if(process.argv[2] === '-d') {
    destroyData();
} else {
    seedData();
}