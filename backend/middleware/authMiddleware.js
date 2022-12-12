import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async(req, res, next) => {
    const { authorization } = req.headers;
    let token

    if(authorization && authorization.startsWith('Bearer')){
        try{
            token = authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(decoded.id).select('-password');

            return next()
        } catch(error) {
            res.status(401);
            throw new Error('Not authorized, user token not found');
        }
    }
    if(!token){
        res.status(401);
        throw new Error('Not authorized, user token not found');
    }
    next()
})

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized to access this page')
    }
}



export { protect, admin };