const joi=require("joi");
const APIError=require("./apiError");


//function to validate the request body using given schema
const joiValidation = (schema) => {
    return (req, res, next) => {
        try {
            const { error } = schema.validate(req.body, { abortEarly: true, });

            console.log("error isssssss=>",error);
            
            if (error) {
                console.log("error detaiiils isssssss=>",error.details[0].message);
                throw new APIError(error.details[0].message, 400);
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports=joiValidation;
