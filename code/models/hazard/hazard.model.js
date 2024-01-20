const mongoose = require("mongoose")

const HazardSchema = new mongoose.Schema(
    {
        userId: {
            type : String,
            required : true,
        },
        hazardType: {
            type : String,
            required: true
        },
        description : {
            type : String,
            require : true
        },
        images : [
            {
                type : String
            }
        ]
        
    },
    { timestamps:true }
);


module.exports.HazardSchema = mongoose.model('Hazard',HazardSchema);