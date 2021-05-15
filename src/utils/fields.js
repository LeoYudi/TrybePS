module.exports = {

  verifyFields: (fields) => {
    for (const field of fields) {
      if ((typeof field) !== 'string')
        return false
    }

    return true;
  },

  verifyEmail: (email) => {
    if (email.split('@').length !== 2)
      return false;
    else {
      const [prefix, domain] = email.split('@');
      if (!prefix || !domain)
        return false;
    }

    return true;
  }

}