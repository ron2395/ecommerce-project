import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js'

// @desc Register user
// @route POST api/users
// @access Public

export const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    
    if(userExists){
        res.status(400)
        throw new Error('Email already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.json({
            _id: user._id,
            isAdmin: user.isAdmin,
            email: user.email,
            name: user.name,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user credentials');
    }
});

// @desc Auth user and get token
// @route POST api/users/login
// @access Public

export const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if(user && (await user.matchPasswords(password))){
        res.json({
            _id: user._id,
            isAdmin: user.isAdmin,
            email: user.email,
            name: user.name,
            token: generateToken(user._id)
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc GET user profile
// @route GET api/users/profile
// @access Private

export const getUserProfile = asyncHandler(async(req, res) => {

    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            isAdmin: user.isAdmin,
            email: user.email,
            name: user.name
        })
    } else {
        res.status(404);
        throw new Error('No user found');
    }
});

// @desc PUT user profile
// @route PUT api/users/profile
// @access Private

export const updateUserProfile = asyncHandler(async(req, res) => {
    // const salt = await bcrypt.genSalt(10);
    // const currentPassword = await bcrypt.hash(req.currentPassword, salt);

    const user = await User.findById(req.user._id);
        if (user) {
          if(await user.matchPasswords(req.body.password)){
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
          } else {
            res.status(400)
            throw new Error('Incorrect Password')
          }
          // if(req.body.password){
          //   user.password = req.body.password || user.password;
          // }

          const updatedUser = await user.save()

          res.json({
            _id: updatedUser._id,
            isAdmin: updatedUser.isAdmin,
            email: updatedUser.email,
            name: updatedUser.name,
            token: generateToken(updatedUser._id),
          });

        } else {
          res.status(404);
          throw new Error("No user found");
        }
});

// @desc GET all users
// @route GET /api/users
// @access Private/Admin

export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if(user){
    await user.remove();
    res.json({ message: 'User removed!'})
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

// @desc GET user by Id
// @route GET /api/users/:id
// @access Private/Admin

export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select('-password');

  if(user){
    res.json(user);
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin

export const updateUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      isAdmin: updatedUser.isAdmin,
      email: updatedUser.email,
      name: updatedUser.name
    });
  } else {
    res.status(404);
    throw new Error("No user found");
  }
});
