const User = require('../models/User');
const Member = require('../models/Member');
const Buy = require('../models/Buy');

module.exports = {
  async index(req, res){
    const { user_id } = req.user;

    const user = await User.findByPk(user_id);
    res.json(user);
  }
}
