import jwt from "jsonwebtoken";
import Admin from "../../model/admin.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
export const registerAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json(new ApiResponse(400, "Admin already exists"));

    const newAdmin = new Admin({ email, password, role });
    await newAdmin.save();

    res
      .status(201)
      .json(new ApiResponse(201, "Admin registered successfully", newAdmin));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, "Server error", error));
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json(new ApiResponse(401, "Invalid credentials"));
  }

  const payload = { id: admin._id, role: admin.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.status(200).json(
    new ApiResponse(200, "Login Successfull", {
      token,
      admin: { email: admin.email, role: admin.role },
    })
  );
};

export const getProfile = (req, res) => {
  res.json(req.user);
};
