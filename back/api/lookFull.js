
module.exports = app => {
   const getLookFull = (req, res) => {
  


  
   app.db('lookfull')
 
   .select('*').from('lookfull')
   .then( lookfull=> res.json(lookfull))
   .catch(err =>  res.status(400).json(err))
}

   const getLookFullSave = (req, res) => {
       
     app.db('lookfull')
         .insert({ titulo: req.body.titulo, descricao: req.body.descricao,preco:req.body.preco, imagem: req.body.imagem, id_external:req.body.id_external })
           
          .then(_ => res.status(204).send())
         .catch(err => res.status(400).json(err))
     }



    



        return { getLookFull, getLookFullSave}

        
   
}