const User = require('../models/User');
const Member = require('../models/Member');
const Buy = require('../models/Buy');

module.exports = {
  async create(req, res){
    try{
      const { user_id: created_by } = req.user;

      const { user_id, price } = req.body;

      if(typeof(user_id) != "number" || typeof(price) != "number")
        return res.json({ error: "Faltam enviar informações, ou você enviou incorretamente" });

      if(price < 1)
        return res.json({ error: "Preço passado incorretamente" });

      const member = await Member.findByPk(user_id);

      if(!member)
        return res.json({ error: "Usuario não encontrado." });

      const created = await Buy.create({
        price, user_id, created_by
      });

      return res.json(created);

    }catch(err){
      return res.json({ error: err.message });
    }
  },

  async delete(req, res){
    try{
      const { buy_id } = req.params;
      if(!buy_id)
        return res.json({ error: "Você não enviou o buy_id" });
      
      const buy = await Buy.findByPk(buy_id);
    
      if(!buy)
        return res.status(404).json({ error: "Compra não encontrado" });

      await buy.destroy();

      return res.json({ success: "Compra removida do banco de dados", buy_id });
    }catch(err){
      return res.json({ error: err.message });
    }
  },

  async getAll(req, res){
    const buys = await Buy.findAll();

    return res.json(buys);
  }
}
