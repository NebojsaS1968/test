const validacija = (schema) => {
    return (req, res, next) => {
      const { value, error } = schema.validate(req.body);
      if (error) {
        const defaultError = {
          message: "Validation error!",
          value: error.details[0].message,
        };
        res.status(400).send({ error: defaultError });
      }
      next();
    };
  };
  
  module.exports = { validacija };
