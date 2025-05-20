const joi=require("joi");

const createUserSchema=joi.object({
    name:joi.string().required(),
    email:joi.string().email().required().messages({
        "string.email":"Invalid email address",
        "any.required":"Email is required",
        "any.duplicate":"Email already exists",
        }),
    password:joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required().messages({
        "string.empty":"Password is required",
        "string.pattern.base":"Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
    }),
    confirmPassword:joi.string().valid(joi.ref("password")).required().messages({
        "any.only":"Passwords do not match",
        "any.required":"Passwords do not match"
    }),
    role: joi.string().valid("admin", "user").optional(),
});

module.exports=createUserSchema;
