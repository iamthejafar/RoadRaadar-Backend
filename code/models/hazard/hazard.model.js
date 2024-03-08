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
        coordinates : {
            type: [Number],
            require : true
        },
        hazardImages : [
            {
                mimeType: {
                    type: String,
                },
                url: {
                    type: String,
                },
            }
        ]
        
    },
    { timestamps:true }
);


module.exports.HazardSchema = mongoose.model('Hazard',HazardSchema);