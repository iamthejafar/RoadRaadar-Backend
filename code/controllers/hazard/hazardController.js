const { HazardSchema } = require("../../models/hazard/hazard.model");





const addHazardIssue = async (req,res) => {
    const { userId, description, hazardType, coordinates } = req.body;
    if(!userId){
        return res.status(400).send({ message: "UserId is required" });
    }
    try{
        let images = [];
        req.files.hazardImages.map((image) => images.push({mimeType: image?.mimetype, url:image?.location}));

        await HazardSchema.create({
            userId,
            description,
            hazardImages : images,
            hazardType,
            coordinates
        });

        return res.status(201).json({message : "Issue added successfully."});

    } catch(e){
        console.log(e);
        return res.status(500).json({message : "Error adding hazard issue."});
    }
    
}


const getHazard = async (req,res) =>{
    let {userId,page,size} = req.query;

    if (!page) page = 1;
    if (!size) size = 20;

    let limit = parseInt(size);
    let skip = (page - 1) * size;

    if(!userId){
        return res.status(400).json({message:"Userid is required"});
    }


    try{
        const hazard = await HazardSchema.find({userId : userId});

    
        if(hazard){
            console.log(hazard);
            return res.status(200).send(hazard.slice(skip, skip + limit));

        } else {
            return res.status(400).json([]);
        }

    } catch(e){
        console.log(e);
        return res.status(500).json({message : "Error Getting hazards."});
    }



    res.status(200).json({message:"Done"});

}


module.exports = {addHazardIssue,getHazard}