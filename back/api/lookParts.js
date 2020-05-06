
module.exports = app => {
     const getLookParts = (req, res) => {
    
      app.db('lookparts')
            .where('id_lookfull_external', '=', req.params.id_lookfull_external)
          .then(lookparts => res.json(lookparts))
          .catch(err =>  res.status(400).json(err))
     }

     const getLookPartsSave = (req, res) => {
  
          app.db('lookparts')
              .insert({ titulo: req.body.titulo, descricao: req.body.descricao,preco:req.body.preco, id_lookfull_external: req.body.id_lookfull_external,imagem: req.body.imagem })
              .then(_ => res.status(204).send())
              .catch(err => res.status(400).json(err))
          }
          return { getLookParts, getLookPartsSave}
  
          
     
  }