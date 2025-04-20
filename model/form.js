import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  fullName: String,
  aadhaarNo: String,
  area: String,
  role: {
    type: String,
    enum: ["president", "secretary", "member", "अध्यक्ष", "सचिव", "सदस्य"],
  },
});

const projectSchema = new mongoose.Schema({ name: String });
const farmerVisionSchema = new mongoose.Schema({ name: String });

const formSchema = new mongoose.Schema(
  {
    registrationNo: { type: String, unique: true },
    village_name: String,
    group_name: String,
    sub_district_name: String,

    farmers: [farmerSchema],
    farmer_count: Number,

    bank_name: String,
    branch_name: String,

    president_name: String,
    secretary_name: String,

    ifscCode: String,
    accountNo: String,

    preparedBy: String,
    approvedBy: String,

    date: { type: Date, default: Date.now },
    place: String,

    project: [projectSchema],
    farmerVision: [farmerVisionSchema],

    aadhaarNo: String,
    mobileNo: String,
    category: String,
    gender: { type: String, enum: ["male", "female", "पुरूष", "स्त्री"] },
    disable: String,
    totalArea: Number,
    gatNo: String,
    cultivatedArea: Number,
    horizontalArea: Number,
    irigrationSource: String,
    areaUnderOrganic: Number,
    education: String,
    noofcattel: Number,
    infrustructure: String,
    mainCrops: String,
    lattitude: Number,
    logtitude: Number,
    farmer_producer_company: String,
    other_farmer_group: String,
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);
export default Form;
