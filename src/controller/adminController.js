const User = require('../models/User');
const Member = require('../models/Member');
const Buy = require('../models/Buy');

module.exports = {
  async main(req, res){
    const { user_id } = req.user;

    console.log(req.user);

    const user = await User.findByPk(user_id);
    res.json(user);
  },

  async createMember(req, res){
    try{
      const { user_id } = req.user;

      const { name, age, description } = req.body;

      if(!name || !age)
        return res.json({ error: "Faltam enviar parametros" });

      const member = await Member.findOne({
        where: { name }
      });

      if(member)
        return res.json({ error: "Já existe um membro com esse nome!", member });

      const created = await Member.create({
        name, age, created_by: user_id, description
      })

      return res.json(created);

    }catch(err){
      return res.json({ error: err.message });
    }
  },

  async deleteMember(req, res){
    res.json({ delete: true })
  }
}
