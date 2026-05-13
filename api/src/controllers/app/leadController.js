import Lead from "../../models/Super_Admin/Lead.js";

export const createLead = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      state, 
      city, 
      restaurantName, 
      restaurantStatus, 
      outletType, 
      message 
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email and phone are required",
      });
    }

    const cleanPhone = String(phone).replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits",
      });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      state,
      city,
      restaurantName,
      restaurantStatus,
      outletType,
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
