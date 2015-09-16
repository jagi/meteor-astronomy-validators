Astro.createValidator = function(validatorDefinition) {
  var definition = new ValidatorDefinition(validatorDefinition);

  var validatorGenerator = function(options, userMessage) {
    var validator = function(fieldValue, fieldName) {
      var doc = this;

      if (_.isFunction(options)) {
        options = options.call(doc);
      }

      return validator.definition.validate.call(
        doc,
        fieldValue,
        fieldName,
        options, // Validator options passed by user.
        validator // Parent validator.
      );
    };

    _.extend(validator, {
      definition: definition,
      options: options,
      message: userMessage
    });

    return validator;
  };

  // Validator is just a function with the "definition" property where all the
  // validator definition is stored.
  Validators[definition.name] = validatorGenerator;

  // We also return created validator if someone would like not to use long
  // default namespace which is e.g. `Validators.isString`.
  return validatorGenerator;
};
