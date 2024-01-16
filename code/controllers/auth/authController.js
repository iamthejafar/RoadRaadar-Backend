

//@desc Login User
//@route POST /api/login
//@acess public
const login = (req,res) => {
    res.status(200).json({message: "Logged in Successfully."});
}



module.exports = {login};