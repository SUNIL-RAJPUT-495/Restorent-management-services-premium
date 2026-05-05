import Restorent from "../../models/Super_Admin/Restorent.js";
import bcrypt from "bcryptjs";


export const create_restaurant = async(req,res) =>{
    try {
        const {name,email,phone,address,password,ownerName,subscription} = req.body;

        if (!name || !email || !phone || !address || !password || !ownerName || !subscription) {
            return res.status(400).json({error:"All fields are required"});
        }
        const existingRestaurant = await Restorent.findOne({email});
        if(existingRestaurant){
            return res.status(400).json({error:"Restaurant already exists"});
        }
        
        const hashpassword = await bcrypt.hash(password,10)

        const restaurant = await Restorent.create({
            name,
            email,
            phone,
            address,
            password:hashpassword,
            ownerName,
            subscription,
        })
        return res.status(201).json({success:true,message:"Restaurant created successfully",restaurant});
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