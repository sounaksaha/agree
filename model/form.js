import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  fullName: String,
  aadharNo: String,
  Area: String,
  role: { type: String, enum: ['president', 'secretary', 'member'] },
});

const projectSchema = new mongoose.Schema({ name: String });
const farmerVisionSchema = new mongoose.Schema({ name: String });

const formSchema = new mongoose.Schema({
  registrationNo: { type: String, unique: true },
  village_name: String,
  group_name: String,
  sub_district_name: String,

  members: [memberSchema],

  farmer_count: Number,
  bank_name: String,
  branch_name: String,
  ifscCode: String,
  accoutNo: String,
  preparedBy: String,
  approvedBy: String,
  date: Date,
  place: String,

  project: [projectSchema],
  FarmerVision: [farmerVisionSchema],

  category: String,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  disable: Boolean,
  totalArea: Number,
  gatNo: String,
  cultivatedArea: Number,
  horizontalArea: Number,
  irigrationSource: String,
  areaUnderOrganic: Number,
  education: String,
  noOfcattel: Number,
  infrustructure: String,
  mainCrops: String,
  lattitude: Number,
  logtitude: Number,
  mention: String,
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);
export default Form;
