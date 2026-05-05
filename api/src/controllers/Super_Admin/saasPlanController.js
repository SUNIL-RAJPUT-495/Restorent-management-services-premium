import SaaSPlan from "../../models/Super_Admin/SaaSPlan.js";

export const createSaasPlan = async(req,res)=>{
    try{
        const { name, description, price, durationValue, durationUnit, features, active, isPopular } = req.body;
        const newSaasPlan = new SaaSPlan({
            name,
            description,
            price,
            durationValue,
            durationUnit,
            features,
            active,
            isPopular,
        });
        await newSaasPlan.save();
        res.status(201).json({
            success:true,
            message:"SaaS Plan created successfully",
            data:newSaasPlan
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error while creating SaaS Plan",
            error:error.message
        })
    }
}

export const getAllSaasPlans = async(req,res)=>{
    try{
        const plans = await SaaSPlan.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            success:true,
            data:plans
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error while fetching SaaS Plans",
            error:error.message
        })
    }
}

export const updateSaasPlan = async(req,res)=>{
    try{
        const { id } = req.params;
        const { name, description, price, durationValue, durationUnit, features, active, isPopular } = req.body;
        
        const updatedPlan = await SaaSPlan.findByIdAndUpdate(
            id,
            { name, description, price, durationValue, durationUnit, features, active, isPopular },
            { new: true }
        );

        if (!updatedPlan) {
            return res.status(404).json({ success: false, message: "Plan not found" });
        }

        res.status(200).json({
            success: true,
            message: "SaaS Plan updated successfully",
            data: updatedPlan
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error while updating SaaS Plan",
            error: error.message
        });
    }
}

export const deleteSaasPlan = async(req,res)=>{
    try{
        const { id } = req.params;
        const deletedPlan = await SaaSPlan.findByIdAndDelete(id);
        
        if (!deletedPlan) {
            return res.status(404).json({ success: false, message: "Plan not found" });
        }

        res.status(200).json({
            success: true,
            message: "SaaS Plan deleted successfully"
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Error while deleting SaaS Plan",
            error: error.message
        });
    }
}
