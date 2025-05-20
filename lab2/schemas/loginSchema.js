const joi=require("joi");

const loginSchema=joi.object({
    email:joi.string().email().required()
    .messages({
        "string.email":"Invalid email address",
        "any.required":"Email is required",
    }),
    password:joi.string().required()
    .messages({
        "string.empty":"Password is required",
    }),
});

module.exports=loginSchema; 