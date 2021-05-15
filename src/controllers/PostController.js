const { Op } = require('sequelize');
const sequelize = require('sequelize');
const Post = require('../models/Post');

const { verifyFields } = require('../utils/fields');
const { serverErrorLog, invalidLog, requiredLog, emptyLog, notFoundLog } = require('../utils/logs');

module.exports = {
  async save(req, res) {
    const { title, content } = req.body;

    if (title === undefined)
      return res.status(400).json({ message: requiredLog('title') });

    if (title === '' || title === null)
      return res.status(400).json({ message: emptyLog('title') });

    if (content === undefined)
      return res.status(400).json({ message: requiredLog('content') });

    if (content === '' || content === null)
      return res.status(400).json({ message: emptyLog('content') });

    if (!verifyFields([title, content]))
      return res.status(400).json({ message: invalidLog });

    try {
      const post = await Post.create({ title, content, userId: req.id });

      return res.status(201).json({ title: post.title, content: post.content, userId: post.userId });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: serverErrorLog });
    }
  },

  async all(req, res) {
    try {
      const posts = await Post.findAll({
        include: {
          association: 'user',
          attributes: { exclude: ['password'] }
        }
      });

      return res.status(200).json(posts);
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
      const post = await Post.findByPk(id, {
        include: {
          association: 'user',
          attributes: { exclude: ['password'] }
        }
      });

      if (!post)
        return res.status(404).json({ message: notFoundLog('post') });

      return res.status(200).json(post);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: serverErrorLog });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: invalidLog });

    const { title, content } = req.body;

    if (title === undefined)
      return res.status(400).json({ message: requiredLog('title') });

    if (title === '' || title === null)
      return res.status(400).json({ message: emptyLog('title') });

    if (content === undefined)
      return res.status(400).json({ message: requiredLog('content') });

    if (content === '' || content === null)
      return res.status(400).json({ message: emptyLog('content') });

    if (!verifyFields([title, content]))
      return res.status(400).json({ message: invalidLog });

    try {
      const post = await Post.findByPk(id);

      if (!post)
        return res.status(404).json({ message: notFoundLog('post') });

      if (post.userId !== req.id)
        return res.status(401).json({ message: 'user unauthorized' });

      await post.update({ title, content });
      return res.status(200).json({ title: post.title, content: post.content, userId: post.userId });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: serverErrorLog });
    }
  },

  async search(req, res) {
    const query = req.query.q;

    const options = {
      include: {
        association: 'user',
        attributes: { exclude: ['password'] },
      }
    };

    if (query) {
      options.where = {
        [Op.or]: [
          {
            title: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('title')),
              'LIKE',
              `%${query}%`
            )
          },
          {
            content: sequelize.where(
              sequelize.fn('LOWER', sequelize.col('content')),
              'LIKE',
              `%${query}%`
            )
          },
        ]
      }
    }
    try {
      const posts = await Post.findAll(options);
      return res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: serverErrorLog });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: invalidLog });

    try {
      const post = await Post.findByPk(id);

      if (!post)
        return res.status(404).json({ message: notFoundLog('post') });

      if (post.userId !== req.id)
        return res.status(401).json({ message: 'user unauthorized' });

      await post.destroy();
      return res.status(200).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: serverErrorLog });
    }
  }
}