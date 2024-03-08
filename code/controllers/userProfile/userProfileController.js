const { UserSchema } = require("../../models/auth/user/user.model");
const { use } = require("../../routes/userProfile/userProfile_route");



const completeUserProfile = async (req,res) => {
    const {name, mobileNo, about, userId} = req.body;
    if(name && mobileNo && about){
        try{
            let user = await UserSchema.findByIdAndUpdate(userId);
            if(user){
                let images = [];
                req.files.profilePic.map((image) => images.push({mimeType: image?.mimetype, url:image?.location}));
                user.name = name;
                user.mobileNo = mobileNo;
                user.about = about;
                user.profilePic = images[0];
                user.completeProfile = true;
                await user.save();
                return res.status(200).send({ message: "Successfully complete profile."});
            }
            else{
                return res.status(400).send({message: "User is not available with userId"});
            }
            
        } catch (e){
            console.log(e);
            return res.status(500).send({ message: "Complete Profile failed." });
        }
    } else{
        return res.status(400).send({ message: "Please provide all the required details." });
    }
}

const editUserProfile = async (req,res) => {
    const {name, mobileNo, about, userId} = req.body;
    if(name && mobileNo && about && userId){
        try{
            let user = await UserSchema.findByIdAndUpdate(userId);
            if(user){
                let images = [];
                req.files.profilePic.map((image) => images.push({mimeType: image?.mimetype, url:image?.location}));
                user.name = name;
                user.mobileNo = mobileNo;
                user.about = about;
                user.profilePic = images[0];
                user.completeProfile = true;
                await user.save();
                return res.status(200).send({ message: "Successfully complete profile"});
            }
            else{
                return res.status(400).send({message: "User is not available with userId"});
            }
        } catch (e){
            console.log(e);
            return res.status(500).send({ message: "Edit Profile failed." });
        }
    } else{
        return res.status(400).send({ message: "Please provide all the required details." });
    }
}

const getUserProfile = async (req,res) =>{
    const {userId} = req.query;
    if(userId){
        try{
            let user = await UserSchema.findById(userId);
            if(user){
                return res.status(200).send(user);
            }
            else{
                return res.status(400).send({message: "User is not available with userId"});
            }
        } catch(e){
            console.log(e);
            return res.status(500).send({ message: "get user profile failed." });
        }

    }
    else{
        return res.status(400).send({ message: "Userid is required." });    
    }
}

module.exports = {completeUserProfile, editUserProfile, getUserProfile};