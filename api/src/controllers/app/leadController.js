import Lead from "../../models/Super_Admin/Lead.js";

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone are required",
      });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      message: message || "",
      status: "NEW",
    });

    return res.status(201).json({
      success: true,
      message: "Lead submitted successfully",
      data: lead,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
