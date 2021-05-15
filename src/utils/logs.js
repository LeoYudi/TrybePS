module.exports = {
  lengthLog: (field, length) => `"${field}" length must be at least ${length} characters long`,
  requiredLog: (field) => `"${field}" is required`,
  emptyLog: (field) => `"${field}" is not allowed to be empty`,
  notFoundLog: (entity) => `${entity} does not exists`,
  invalidLog: 'one or more fields are invalid',
  serverErrorLog: 'internal server error',
  emailLog: '"email" must be a valid email'
}