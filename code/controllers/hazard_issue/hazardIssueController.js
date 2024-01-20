const { HazardSchema } = require("../../models/hazard/hazard.model");





const addHazardIssue = async (req,res) => {
    const { userId, description, hazardType } = req.body;

    console.log(req.body);

    if(!userId){
        return res.status(400).send({ message: "UserId is required" });
    }

    try{
        let images = [];
        req.files.map((image) => images.push(image?.location));

        await HazardSchema.create({
            userId,
            description,
            images
        });

        return res.status(200).json({message : "Issue added successfully."});

    } catch(e){
        console.log(e);
        return res.status(500).json({message : "Error adding hazard issue."});
    }
    
}


module.exports = {addHazardIssue}