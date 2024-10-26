const Validator = require('validatorjs');
const validator = (body, rules, messages, cb) => {
    const validation = new Validator(body, rules, messages);
    validation.passes(cb(null, true));
    validation.fails(() => {cb(validation.errors, false);});
}

module.exports = validator