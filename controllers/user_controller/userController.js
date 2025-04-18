import Auth from '../../model/auth.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const registerUser = async (req, res) => {
  try {
    const { email, password, phone, role } = req.body;

    // Ensure at least one of email or phone is provided
    if (!email && !phone) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Either email or phone is required"));
    }

    // Check for existing admin by email or phone (whichever is provided)
    const existingUser = await Auth.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ]
    });

    if (existingUser) {
      return res
        .status(400)
        .json(new ApiResponse(400, "User with this email already exists"));
    }

    const newUser = new Auth({ email, password, phone, role });
    await newUser.save();

    res
      .status(201)
      .json(new ApiResponse(201, "User registered successfully", newUser));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, "Server error", error.message));
  }
};
