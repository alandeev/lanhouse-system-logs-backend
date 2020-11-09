const User = require('../models/User');
const Member = require('../models/Member');
const Buy = require('../models/Buy');

module.exports = {
  async create(req, res){
    try{
      const { user_id: created_by } = req.user;

      const { name, age, description } = req.body;

      if(!name || !age)
        return res.json({ error: "Faltam enviar parametros" });

      const member = await Member.findOne({
        where: { name }
      });

      if(member)
        return res.json({ error: "Já existe um membro com esse nome!", member });

      const created = await Member.create({
        name, age, created_by, description: description || ""
      })

      return res.json(created);

    }catch(err){
      return res.json({ error: err.message });
    }
  },

  async delete(req, res){
    try{
      const { member_id } = req.params;
      if(!member_id)
        return res.json({ error: "Você não enviou o member_id" });
      
      const member = await Member.findByPk(member_id);
    
      if(!member)
        return res.status(404).json({ error: "Membro não encontrado" });

      await member.destroy();

      return res.json({ success: "Membro removido do banco de dados", member_id });
    }catch(err){
      return res.json({ error: err.message });
    }
  },

  async getAll(req, res){
    const members = await Member.findAll();

    return res.json(members);
  },

  async getOneMember(req, res){
    const { member_id } = req.params;
    if(!member_id)
      return res.json({ error: "Você precisa enviar o member_id" });

    const member = await Member.findByPk(member_id, {
      include: {
        model: Buy,
        as: 'buys',
        attributes: ['price', 'created_at'],
      }
    });

    if(!member)
      return res.json({ error: "Membro não encontrado" });

    const prices = member.buys.map(prop => prop.price);
    const price = prices.length ? prices.reduce((accumulator, currentValue) => accumulator + currentValue) : 0;

    const { id, name, age, description, buys } = member;

    return res.json({ id, name, age, description, price, buys });
  }
}
