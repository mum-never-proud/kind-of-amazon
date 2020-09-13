// eslint-disable-next-line no-control-regex
const validEmailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const validator = {
  name: (name = '') => name.length >= 3,
  email: (email = '') => validEmailRegExp.test(email),
  password: (password = '') => password.length >= 8,
};

export default function authValidator(userDetailsObject, fields = []) {
  const invalidFields = {};

  for (let i = 0; i < fields.length; i += 1) {
    const field = fields[i];

    if (!validator[field](userDetailsObject[field])) {
      invalidFields.first = invalidFields.first || field;
      invalidFields[field] = true;
    }
  }

  return invalidFields;
}
