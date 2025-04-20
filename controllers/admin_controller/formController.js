import Form from "../../model/form.js";

export const createForm = async (req, res) => {
  try {
    const count = await Form.countDocuments();
    const registrationNo = `ATMA_${String(count + 1).padStart(2, '0')}`;

    const newForm = new Form({ ...req.body, registrationNo });
    await newForm.save();

    res.status(201).json({
      message: 'Form submitted successfully',
      data: newForm,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
