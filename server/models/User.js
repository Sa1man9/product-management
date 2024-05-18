const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    fullName: {
        type: String,
        require: true,
        trim:true,
      },
      email: {
        type: String,
        require: true,
        trim: true,
        unique:true
      },
      phone:{
        type: String,
        require:true,
      },
      password: {
        type: String,
        require: true,
      },
      role: { type: String,
        enum:['user','admin'],
        default:'user'
       },

})

module.exports=mongoose.model('User',userSchema)