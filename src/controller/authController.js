const jwt = require('jsonwebtoken');

const { key } = require('../config/config.json');

const User = require('../models/User');

module.exports = {
  async authenticate(req, res){
    const { username, password } = req.body;

    if(!username || !password)
      return res.json({ error: "Faltam parametros no cadastro" });

    const findUser = await User.findOne({
      where: { username }
    });

    if(!findUser)
      return res.status(401).json({ error: "Usuario não encontrado." });

    if(findUser.password !== password)
      return res.status(401).json({ error: "Senha invalida." });

    if(!findUser.is_admin)
      return res.status(401).json({ error: "Você não têm permissão para acessar" });

    const token = jwt.sign({
      user_id: findUser.id
    }, key, { expiresIn: '1d' });

    return res.status(200).json({ token: `Bearer ${token}` });
  },

  async register(req, res){
    try{
      const { name, username, password } = req.body;

      if(!name || !username || !password)
        return res.json({ error: "Faltam parametros no cadastro" });

      const findUser = await User.findOne({
        where: { username }
      });

      if(findUser)
        return res.status(400).json({ error: "Já existe uma pessoa com esse Usuario" });

      const user = await User.create({ name, username, password })

      return res.status(200).json(user);
    }catch(err){
      return res.status(400).send({ error: err.message });
    }
  }
}
