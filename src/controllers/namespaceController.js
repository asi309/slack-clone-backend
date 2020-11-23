const Namespace = require('../models/Namespace');

module.exports = {
  async createNamespace(req, res) {
    const { title, endpoint } = req.body;
    const { user_id } = req.headers;

    try {
      const existing_namespace = await Namespace.findOne({ endpoint });
      if (existing_namespace) {
        return res.status(400).json({
          message: 'Endpoint already taken. Try a different endpoint',
        });
      }
      const namespace = await Namespace.create({
        title,
        endpoint,
      });
      namespace.admin.push(user_id);
      await namespace.save();
      return res.status(201).json({ namespace });
    } catch (error) {
      return res.status(500).json({ message: 'Cannot perform the operation' });
    }
  },
};
