const Joi = require('joi');

const signupValidation = (req, res, next) => {
  console.log('Signup validation - request body:', req.body);
  
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required()
  });
  
  const { error } = schema.validate(req.body);
  if (error) {
    console.log('Validation error:', error);
    return res.status(400)
      .json({ message: "Bad request", error })
  }
  
  console.log('Validation passed');
  next();
}
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400)
      .json({ message: "Bad request", error })
  }
  next();
}
module.exports = {
  signupValidation,
  loginValidation
}