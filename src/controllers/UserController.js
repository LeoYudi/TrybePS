const User = require('../models/User');

const { generateHash, generateToken, validPassword } = require('../utils/auth');
const { lengthLog, requiredLog, serverErrorLog, invalidLog, emptyLog, emailLog, notFoundLog } = require('../utils/logs');
const { verifyEmail, verifyFields } = require('../utils/fields');

module.exports = {
  async save(req, res) {
    const { displayName, email, password, image } = req.body;
    if (!verifyFields([displayName, email, password, image]))
      return res.status(400).json({ message: invalidLog });

    if (displayName.length < 8)
      return res.status(400).json({ message: lengthLog('displayName', 8) });

    if (!email)
      return res.status(400).json({ message: requiredLog('email') });

    if (!verifyEmail(email))
      return res.status(400).json({ message: emailLog });

    if (!req.body.password)
      return res.status(400).json({ message: requiredLog('password') });

    if (password.length < 6)
      return res.status(400).json({ message: lengthLog('password', 6) });

    try {
      const userExists = await User.findOne({ where: { email } });
      if (userExists)
        return res.status(409).json({ message: 'user already exists' });

      const user = await User.create({
        displayName,
        email,
        password: await generateHash(password),
        image
      });

      return res.status(201).json({ token: generateToken({ id: user.id }) });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: serverErrorLog });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    if (email === undefined)
      return res.status(400).json({ message: requiredLog('email') });

    if (email === '' || email === null)
      return res.status(400).json({ message: emptyLog('email') });

    if (!verifyEmail(email))
      return res.status(400).json({ message: emailLog });

    if (password === undefined)
      return res.status(400).json({ message: requiredLog('password') });

    if (password === '' || email === null)
      return res.status(400).json({ message: emptyLog('password') });

    if (!verifyFields([email, password]))
      return res.status(400).json({ message: invalidLog });

    try {
      const user = await User.findOne({ where: { email } });
      if (!user)
        return res.status(400).json({ message: invalidLog });

      if (!(await validPassword(password, user.password)))
        return res.status(400).json({ message: invalidLog });

      return res.status(200).json({ token: generateToken({ id: user.id }) });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: serverErrorLog });
    }
  },

  async all(req, res) {
    try {
      const users = await User.findAll({ attributes: { exclude: ['password'] } });
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: serverErrorLog });
    }
  },

  async one(req, res) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: invalidLog });

    try {
      const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
      if (!user)
        return res.status(404).json({ message: notFoundLog('user') });

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: serverErrorLog });
    }
  },

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.id);
      await user.destroy();

      return res.status(204).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: serverErrorLog });
    }
  }
}