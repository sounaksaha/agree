import Form from "../../model/form.js";
import { buildQuery, paginate } from "../../utils/queryHelper.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const createForm = async (req, res) => {
  try {
    const count = await Form.countDocuments();
    const registrationNo = `ATMA_${String(count + 1).padStart(2, "0")}`;

    const newForm = new Form({ ...req.body, registrationNo });
    await newForm.save();

    res
      .status(201)
      .json(new ApiResponse(200, "Form submitted successfully", newForm));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, "Server Error", error.message));
  }
};

export const getAllForms = async (req, res) => {
  try {
    const queryObj = buildQuery(req);
    const { skip, limit, page } = paginate(req);

    const total = await Form.countDocuments(queryObj);
    const forms = await Form.find(queryObj)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const responseData = {
      total,
      page,
      pages: Math.ceil(total / limit),
      results: forms,
    };

    res
      .status(200)
      .json(new ApiResponse(200, "Forms fetched successfully", responseData));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, "Server error", error.message));
  }
};

export const getFormById = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res
        .status(400)
        .json(new ApiResponse(400, "ID is required in query"));
    }

    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json(new ApiResponse(404, "Form not found"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Form fetched successfully", form));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, "Server error", error.message));
  }
};

export const updateForm = async (req, res) => {
  try {
    const { id } = req.query; // assuming /form/:id is the endpoint
    const existingForm = await Form.findById(id);

    if (!existingForm) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Update simple fields directly
    Object.assign(existingForm, {
      village_name: req.body.village_name,
      group_name: req.body.group_name,
      sub_district_name: req.body.sub_district_name,
      farmer_count: req.body.farmer_count,
      bank_name: req.body.bank_name,
      branch_name: req.body.branch_name,
      ifscCode: req.body.ifscCode,
      accoutNo: req.body.accoutNo,
      preparedBy: req.body.preparedBy,
      approvedBy: req.body.approvedBy,
      date: req.body.date,
      place: req.body.place,
      category: req.body.category,
      gender: req.body.gender,
      disable: req.body.disable,
      totalArea: req.body.totalArea,
      gatNo: req.body.gatNo,
      cultivatedArea: req.body.cultivatedArea,
      horizontalArea: req.body.horizontalArea,
      irigrationSource: req.body.irigrationSource,
      areaUnderOrganic: req.body.areaUnderOrganic,
      education: req.body.education,
      infrustructure: req.body.infrustructure,
      mainCrops: req.body.mainCrops,
      lattitude: req.body.lattitude,
      logtitude: req.body.logtitude,
      noOfcattel: req.body.noOfcattel,
      mention: req.body.mention,
    });

    // Helper function to merge by _id
    const mergeSubdocuments = (existingArray, updatedArray) => {
      const merged = [];

      updatedArray.forEach((item) => {
        if (item._id) {
          const existingItem = existingArray.find(
            (i) => i._id.toString() === item._id
          );
          if (existingItem) {
            Object.assign(existingItem, item);
            merged.push(existingItem);
          } else {
            // Unknown _id, treat as new
            merged.push(item);
          }
        } else {
          // New item
          merged.push(item);
        }
      });

      return merged;
    };

    // Merge subdocuments
    existingForm.farmers = mergeSubdocuments(
      existingForm.farmers || [],
      req.body.farmers || []
    );
    existingForm.project = mergeSubdocuments(
      existingForm.project || [],
      req.body.project || []
    );
    existingForm.farmerVision = mergeSubdocuments(
      existingForm.farmerVision || [],
      req.body.farmerVision || []
    );

    const updatedForm = await existingForm.save();

    res.status(200).json({
      statusCode: 200,
      message: "Form updated successfully",
      data: updatedForm,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ statusCode: 500, message: "Server error", error: err.message });
  }
};


export const deleteForm = async (req, res) => {
  try {
    const { id } = req.query;

    const deletedForm = await Form.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Form not found'
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: 'Form deleted successfully',
      data: deletedForm
    });
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
      error: error.message
    });
  }
};