const validator = require('validator');
const validateReg = (data) => {
    const mandatoryFields = ["firstName", "email", "password"];

    const isAllowed = mandatoryFields.every(key =>
        Object.keys(data).includes(key)
    );

    if (!isAllowed) {
        throw new Error("One or more fields is/are missing!");
    }
};

module.exports = validateReg;