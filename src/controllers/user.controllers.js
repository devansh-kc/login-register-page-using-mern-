import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { firstname, lastname, email, username, password } = req.body;
  console.log("email", email);
  console.log("Password:", password);
  if (
    [firstname, lastname, email, username, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "all fields  are   reqired");
  }
  if (!email.includes("@")) {
    throw new ApiError(
      401,
      "the email is incorrect it should contain @ symbol "
    );
  }
  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new ApiError(409, "Username and email already exists ");
  }

  console.log(req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, " !avttar avatar file is required");
  }
  const user = await User.create({
    firstname,
    lastname,
    avatar: avatar.url,
    email,
    password,
    username: username.toLowerCase,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while regestring the user");
  }
  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User registered successfully "));
});

export { registerUser };
