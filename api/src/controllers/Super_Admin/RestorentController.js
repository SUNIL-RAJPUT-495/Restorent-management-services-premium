import Restorent from "../../models/Super_Admin/Restorent.js";
import Lead from "../../models/Super_Admin/Lead.js";


export const create_restaurant = async(req,res) =>{
    try {
        return res.status(403).json({
            success: false,
            message: "Direct restaurant creation is disabled. Please complete plan purchase and payment first.",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message});
    }
}


export const get_all_restaurants = async(req,res)=>{
    try {
        const restaurants = await Restorent.find();
        return res.status(200).json({success:true,message:"Restaurants fetched successfully",restaurants});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message});
    }
}

export const get_all_leads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            message: "Leads fetched successfully",
            leads
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}