import jwt from "jsonwebtoken";
import Auth from "../../model/auth.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
export const registerAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingAdmin = await Auth.findOne({ email });
    if (existingAdmin)
      return res.status(400).json(new ApiResponse(400, "Admin already exists"));

    const newAdmin = new Auth({ email, password, role });
    await newAdmin.save();

    res
      .status(201)
      .json(new ApiResponse(201, "Admin registered successfully", newAdmin));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, "Server error", error));
  }
};

export const login= async (req, res) => {
  const { email, password } = req.body;

  const auth = await Auth.findOne({ email });
  if (!auth || !(await auth.matchPassword(password))) {
    return res.status(401).json(new ApiResponse(401, "Invalid credentials"));
  }

  const payload = { id: auth._id, role: auth.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.status(200).json(
    new ApiResponse(200, "Login Successfull", {
      token,
      auth: { email: auth.email, role: auth.role },
    })
  );
};

export const getProfile = (req, res) => {
  res.json(req.user);
};
