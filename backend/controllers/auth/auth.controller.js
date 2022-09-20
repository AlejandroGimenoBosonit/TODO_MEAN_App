const bcryptjs = require("bcryptjs");
// express
const { request, response } = require("express");
// mongoose models
const User = require("../../models/User/User");
// helpers
const { generateJWT, verifyToken } = require("../../helpers/jwt");


const authenticateUser = async (req = request, res = response) => {
  // extract email and password
  const { email, password } = req.body;

  // try - catch
  try {
    // 1 - look for user in database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        process_ok: false,
        message: "Error: User not found",
      });
    }

    // 2 - check if password matches
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        process_ok: false,
        msg: "Invalid password",
      });
    }

    // generate jwt
    const token = await generateJWT(user.id);

    // response
    return res.status(200).json({
      process_ok: true,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      process_ok: false,
      message: "Error during login process!",
    });
  }
};

const registerUser = async (req = request, res = response) => {
  // extract body fields

  // try - catch
  try {
    // check for user in database
    if (await User.findOne({email: req.body.email})) {
      return res.status(400).json({
        process_ok: false,
        message: "User already exists!",
      });
    }
    const dbUser = new User(req.body);
    
    // encrypt password
    const salt = bcryptjs.genSaltSync();
    dbUser.password = bcryptjs.hashSync(req.body.password, salt);

    // // jwt
    const token = await generateJWT(dbUser.id);
  
    // store user in ddbb
    await dbUser.save();
    // // success response
    return res.status(200).json({
      process_ok: true,
      token,
    });
  } catch (error) {
      return res.status(400).json({
        process_ok: false,
        message: "Error with registration process!",
      });
  }
};

// const tokenValidator = async (req = request, res = response) => {
//   // read uid and name that has been declared in the middleware
//   const { uid } = req;

//   const user = await User.findById(uid);

//   // generate new jwt
//   const token = await generateJWT(uid);

//   return res.json({
//     ok: true,
//     uid,
//     name: user.name,
//     email: user.email,
//     token,
//   });
// };

const getUser = async (req = request, res = response) => {
  const token = req.headers['x-token'];
  try {
    // verify token
    const verified = await verifyToken( token );
    if(!verified){
      return res.status(400).json({
        process_ok: false,
        message: "Error verifying token!",
      });
    }
    const user = await User.findById({"_id": verified.uid});
    return res.status(200).json({
      process_ok: true,
      user
    });

  } catch (error) {
    return res.status(400).json({
      process_ok: false,
      message: "Error obtaining user info!",
    });
  }
};

const updateUser = async (req = request, res = response) => {
  try {
    // check user by id
    if (!await User.findById({"_id":req.params.id})) {
      return res.status(400).json({
        process_ok: false,
        message: "User doesn't exists!",
      });
    }
    // check for password and encrypt
    if(Object.keys(req.body).includes('password')){
      req.body.password = bcryptjs.hashSync(req.body.password, bcryptjs.genSaltSync());
    }
    // update user info with payload
    await User.updateOne({}, req.body);
    // generate new token
    const token = await generateJWT(req.params.id);
    // response message
    return res.status(200).json( {
      process_ok: true,
      token,
    });

  } catch (error) {
    return res.status(400).json({
      process_ok: false,
      message: "Error with user update process!",
    });
  }
};

const deleteUser = async (req = request, res = response) => {
  // console.log(req.params.id);
  try {
    // check if exists user
    // const user = await User.findById({'_id':req.params.id});
    if (!await User.findById({'_id':req.params.id})) {
      return res.status(400).json({
        process_ok: false,
        message: "User doesn't exists!",
      });
    }

    await User.deleteOne({'_id': req.params.id});

    // response message
    return res.status(200).json( {
      process_ok: true,
      message: "User deleted successfully!",
    });

    
  } catch (error) {
    return res.status(400).json({
      process_ok: false,
      message: "Error with user deleting process!",
    });
  }
};

module.exports = { registerUser, authenticateUser, getUser, updateUser, deleteUser };
