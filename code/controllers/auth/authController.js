const { UserSchema } = require("../../models/auth/user/user.model");

const login = async (req,res) => {

    const {email, password} = req.query;


    if(!email || !password){
        return res.status(400).json(
            {
                message : "All Fields are mandotry !"
            }
        );
    }

   try{
    const user = await UserSchema.findOne({email});

    if(!user){
        return res.status(400).json({message: "Email id is not registered."});
    }

    if(user.password === password){
        return res.status(200).json({
            message: "Logged in Successfully.",
            userId : user._id
        });
    }
   } catch(e){
        return res.status(500).json({message: "Login Error"});
   }

}


const signUp = async (req,res) => {
    const { email, password } = req.query;
    if(!email || !password){
        res.status(400).json(
            {
                message : "All Fields are mandotry !"
            }
        );
    }

    try{
        const user = await UserSchema.findOne({email});
        if(user){
            res.status(400).json({message: "Email id already exist."});
        }
        else{
            let newUSer = new UserSchema({
                email : email,
                password : password,
                completeProfile : false
            });
            await newUSer.save();
            res.status(200).json({
                message : "Successfully Signup",
                user : newUSer._id
            });
        }
    } catch(e){
        res.status(500).json({message: "Signup Error !"});
    }
}


module.exports = {login,signUp};