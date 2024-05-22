const cloudinary = require("cloudinary"); //import cloudinary package from node_modules folder
const User = require("../model/user"); //import user model from models folder

cloudinary.config({
  //configure cloudinary with cloud_name, api_key and api_secret from .env file
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, //cloud_name is the name of your cloudinary account
  api_key: process.env.CLOUDINARY_API_KEY, //api_key is the key of your cloudinary account
  api_secret: process.env.CLOUDINARY_API_SECRET, //api_secret is the secret of your cloudinary account
});

exports.upload_profile = async (req, res) => {
  const { profile_pic, user_id } = req.body;

  let result = await cloudinary.v2.uploader.upload(req.body.profile_pic, {
    //upload file to cloudinary server and return public_id and url of the file to client side
    public_id: `${Date.now()}`,
    resource_type: "auto",
    folder: "AutoDocVerifier/profile_pictures",
  });
  //save public_id and url to user model
  await User.findByIdAndUpdate(user_id, { picture: result.secure_url });

  console.log(result);
  res.json({
    //send response to client side with public_id and url of the file in json format
    profile_pic_uploaded: true,
  });
};
