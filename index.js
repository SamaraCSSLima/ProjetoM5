//importar express
var express = require('express');

//importar o handlebars
const exphbs = require('express-handlebars')

//importar o mysql 
const mysql = require('mysql')

//variável para definir o express e app.use para o diretotio public
var app = express();
app.use('/public', express.static(__dirname + '/public'));
var port = 3000

//configuração handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//express url. Permite enviar os dados pela url
app.use(
    express.urlencoded({
        extended:true
    })
)

//rotas

//rota raiz geral
app.get('/', function(req,res){
    res.render('home',{layout:false})
   })

//rota raiz video
app.get('/homevideo', function(req,res){
 res.render('homevideo',{layout:false})
})

//rota para inserir dados video
app.post('/video/insertvideo', (req, res) => {
    const video = req.body.video
    const nome = req.body.nome
    const diretor = req.body.diretor
  
     const sql = `INSERT INTO video (video, nome, diretor) VALUES ('${video}', '${nome}', '${diretor}')`
  
    conn.query(sql, function(err){
        if (err){
           console.log(err)
        }
  
        res.redirect('/video')
    })
  })


  

//rota de consulta geral video
app.get('/video', (req, res) => {
    const sql = 'SELECT * FROM video'

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listar = data
        console.log (listar)
        res.render('video', {layout: false, listar})
    })
})

//rota do buscar video
app.get('/buscavideo', (req, res) => {
    res.render('buscavideo', { layout: false })
  })
  
//rota busc para exibir o resultado do buscar video
app.post('/buscvideo/', (req, res) => {
      const nome = req.body.nome
      const sql = `SELECT * FROM video WHERE nome = '${nome}'`
    
      conn.query(sql, function(err, data){
         if(err){
         console.log(err)
          return
        }
         const listarVideo = data[0]
         res.render('vd', {  layout: false, listarVideo } )
         })
        })

//rota para pegar dados para editar registro video

app.get('/video/edit/:nome', (req, res) => {
    
    const nome= req.params.nome

    const sql = `SELECT * FROM video where nome = '${nome}'`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const video = data[0]
        res.render('editvideo', { layout: false, video } )

    })
})

//rota para atualizar os dados video (editar registro com post) 
app.post('/video/updatevideo', (req, res) => {

    const id = req.body.id
    const nome = req.body.nome
    const diretor = req.body.diretor
    
    const sql = `UPDATE video SET nome = '${nome}', diretor = '${diretor}' WHERE id = '${id}'` 

    conn.query(sql, function(err) {
        if(err){
            console.log(err)
            return
        }

        res.redirect('/video')
    })

})

//rota para deletar um registro video
app.get('/video/remove/:nome', (req, res) => {
    const nome = req.params.nome
  
    const sql = `DELETE FROM video WHERE nome = '${nome}'`
  
    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
  
        res.redirect('/video')
    })
  })

  //rotas do Ocean Livros
  //rota raiz livros
app.get('/livros', (req, res) => {
    res.render('home-livros', { layout: false })
  })

    //rota para inserir dados livros
  app.post('/livros-cad/insertlivros', (req, res) => {
    const titulo = req.body.titulo
    const autor = req.body.autor
  
    const sql = `INSERT INTO livros (titulo, autor) VALUES ('${titulo}', '${autor}')`
  
    conn.query(sql, function(err){
        if (err){
            console.log(err)
        }
  
        res.redirect('/livros-cad')
    })
  })
  
  //Rota de consulta geral livros
  app.get('/livros-cad', (req, res) => {
    const sql = 'SELECT * FROM livros'
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
    
        const listar = data
        
        console.log(listar)
  
        res.render('livros-cad', { layout: false, listar })
  
    })
  })
  
  //Consulta um registo pelo id livros
  app.get('/livros-cad/:id', (req, res) => {
    const id = req.params.id
    
    const sql = `SELECT * FROM livros WHERE id = '${id}'`
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
  
        const listarLivro = data[0]
        res.render('livros', {  layout: false, listarLivro } )
  
    })
  })
  
  //Rota do buscar livros
  app.get('/busc-livros', (req, res) => {
    res.render('busca-livros', { layout: false })
  })
  
  //Rota busc, para exibir o resultado do buscar livros
  app.post('/busc-livros/', (req, res) => {
    const titulo = req.body.nome
    const sql = `SELECT * FROM livros WHERE titulo = '${titulo}'`
  
    conn.query(sql, function(err, data){
       if(err){
       console.log(err)
        return
      }
       const listarLivro = data[0]
       res.render('livros', {  layout: false, listarLivro } )
       })
      })
  
  //pegando para editar registro livros
  app.get('/livros-cad/edit/:id', (req, res) => {
      
    const id = req.params.id
  
    const sql = `SELECT * FROM livros where id = '${id}'`
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
  
        const livros = data[0]
        res.render('edit-livros', { layout: false, livros } )
  
    })
  })
  
  //rota de edicao do registro com post livros
  app.post('/livros-cad/updatelivros-cad', (req, res) => {
  
    const id = req.body.id
    const titulo = req.body.nome
    const autor = req.body.autor
    
    const sql = `UPDATE livros SET titulo = '${titulo}', autor = '${autor}' WHERE id = '${id}'` 
  
    conn.query(sql, function(err) {
        if(err){
            console.log(err)
            return
        }
  
        res.redirect('/livros-cad')
    })
  
  })
  
  //rota para deletar um registro livros
  app.get('/livros-cad/remove/:id', (req, res) => {
    const id = req.params.id
  
    const sql = `DELETE FROM livros WHERE id = '${id}'`
  
    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
  
        res.redirect('/livros-cad')
    })
  })

// rotas Ocean Musica

//rota raiz musica
app.get('/homemusica', function(req,res){
    res.render('homemusica',{layout:false})
   })
   
   //rota para inserir dados musica
   app.post('/musica/insertmusica', (req, res) => {
       const nome = req.body.nome
       const artista = req.body.artista
     
        const sql = `INSERT INTO musica (nome, artista) VALUES ('${nome}', '${artista}')`
     
       conn.query(sql, function(err){
           if (err){
               console.log(err)
           }
     
           res.redirect('/musica')
       })
     })
     
   
   //rota de consulta geral musica
   app.get('/musica', (req, res) => {
       const sql = 'SELECT * FROM musica'
   
       conn.query(sql, function (err, data) {
           if (err) {
               console.log(err)
               return
           }
           const listar = data
           console.log (listar)
           res.render('musica', {layout: false, listar})
       })
   })
   
   //rota do buscar musica
   app.get('/buscmusica', (req, res) => {
       res.render('buscamusica', { layout: false })
     })
     
   //rota busc para exibir o resultado do buscar musica
   app.get('/buscmusica/:id', (req, res) => {
         const nome = req.params.id
         const sql = `SELECT * FROM musica WHERE id = '${nome}'`
       
         conn.query(sql, function(err, data){
            if(err){
            console.log(err)
             return
           }
            const listarMusica = data[0]
            res.render('msc', {  layout: false, listarMusica } )
            })
           })
   
   //rota para pegar dados para editar registro musica
   
   app.get('/musica/edit/:nome', (req, res) => {
       
       const nome= req.params.nome
   
       const sql = `SELECT * FROM musica where nome = '${nome}'`
   
       conn.query(sql, function(err, data){
           if(err){
               console.log(err)
               return
           }
   
           const musica = data[0]
           res.render('editmusica', { layout: false, musica } )
   
       })
   })
   
   //rota para atualizar os dados musica (editar registro com post) 
   app.post('/musica/updatemusica', (req, res) => {
   
       const id = req.body.id
       const nome = req.body.nome
       const artista = req.body.artista
       
       const sql = `UPDATE musica SET nome = '${nome}', artista = '${artista}' WHERE id = '${id}'` 
   
       conn.query(sql, function(err) {
           if(err){
               console.log(err)
               return
           }
   
           res.redirect('/musica')
       })
   
   })
   
   //rota para deletar um registro musica  
   
   app.get('/musica/remove/:nome', (req, res) => {
     const nome = req.params.nome
   
     const sql = `DELETE FROM musica WHERE nome = '${nome}'`
   
     conn.query(sql, function(err){
         if(err){
             console.log(err)
             return
         }
   
         res.redirect('/musica')
     })
   })

//rotas Ocean Jogos

//rota raiz Jogos
app.get('/gamehome', function(req,res){
    res.render('gamehome',{layout:false})
   })
   

//rota de consulta geral
app.get('/gamelist', (req, res) => {
    const sql = 'SELECT * FROM jogos'

    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }
        const listar = data
        console.log (listar)
        res.render('Gamelist', {layout: false, listar})
    })
})


//rota do buscar
app.get('/buscagame', (req, res) => {
    res.render('buscagame', { layout: false })
  })
  
//rota busc para exibir o resultado do buscar
app.post('/buscgame/', (req, res) => {  //NÃO FUNCIONA
      const nome = req.body.nome
    
      const sql = `SELECT * FROM jogos WHERE nome = '${nome}'`
    
      conn.query(sql, function(err, data){
         if(err){
         console.log(err)
          return
        }
         const listarGame = data[0]
         res.render('buscagameresult', {  layout: false, listarGame } )
         })
        })	



        app.get('/game/delete/:id', (req, res) => {
            const id = req.params.id
          
            const sql = `DELETE FROM jogos WHERE id = ${id}`
          
            conn.query(sql, function(err){
                if(err){
                    console.log(err)
                    return
                }
          
                res.redirect('/gamelist')
            })
          })


// Create CRUD - inserindo 

app.get('/addgame', (req, res) => {
    res.render('addgame', { layout: false })
  })

app.post('/creategame', (req, res) => {

    const nome = req.body.nome
    const desenvolvedor = req.body.desenvolvedor

    const sql = `INSERT INTO jogos (nome, desenvolvedor) VALUES ('${nome}', '${desenvolvedor}')`

    conn.query(sql, function (err) {
        if (err) {
            console.log(err)
        }

        res.redirect('/gamelist')
        
    })
})

//Rota Atualizar

app.get('/gameupdate', (req, res) => {
    
    const id = req.params.id

    const sql = `SELECT * FROM jogos where id = '${id}'`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const listarUpdate = data[0]
        res.render('gameupdate', { layout: false, listarUpdate } )

    })
})



//rotas Ocean Loja

//rota raiz loja
app.get('/loja', (req, res) => {
    res.render('home-loja', { layout: false })
  })

//rota para inserir dados loja
app.post('/loj/insertloj', (req, res) => {
    const departamento = req.body.departamento
   
    const sql = `INSERT INTO loja (departamento) VALUES ('${departamento}')`
  
    conn.query(sql, function(err){
        if (err){
            console.log(err)
        }
  
        res.redirect('/loja')
    })
  })
  
  //Rota de consulta geral loja
  app.get('/loj', (req, res) => {
    const sql = 'SELECT * FROM loja'
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
    
        const listar = data
        
        console.log(listar)
  
        res.render('loj', { layout: false, listar })
  
    })
  })
  
  //Consulta um registro pelo id loja
  app.get('/loj/:id', (req, res) => {
    const nome = req.params.id
    
    const sql = `SELECT * FROM loja WHERE id = '${nome}'`
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
  
        const listarLoj = data[0]
        res.render('loja', {  layout: false, listarLoj } )
  
    })
  })
  
  //Rota do buscar loja
  app.get('/busca-loja', (req, res) => {
    res.render('busca-loja', { layout: false })
  })
  
  //Rota busc, para exibir o resultado do buscar loja
  app.post('/busca-loja/', (req, res) => {
    const id = req.body.id
    const sql = `SELECT * FROM loja WHERE id = ${id}`
  
    conn.query(sql, function(err, data){
       if(err){
       console.log(err)
        return
      }
       const listarLoj = data[0]
       res.render('loja', {  layout: false, listarLoj } )
       })
      })
  
  //pegando para editar registro loja
  app.get('/loj/editloja/:id', (req, res) => {
      
    const id = req.params.id
  
    const sql = `SELECT * FROM loja where id = ${id}`
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
  
        const loj = data[0]
        res.render('editloja', { layout: false, loj } )
  
    })
  })
  
  //rota de edicao do registro com post loja
  app.post('/loj/updateloj', (req, res) => {
  
    const id = req.body.id
    const departamento = req.body.departamento
    
    const sql = `UPDATE loja SET departamento = '${departamento}' WHERE id = '${id}'`
  
    conn.query(sql, function(err) {
        if(err){
            console.log(err)
            return
        }
  
        res.redirect('/loj')
    })
  
  })
  
  //rota para deletar um registro loja
  app.get('/loj/remove/:id', (req, res) => {
    const id = req.params.id
  
    const sql = `DELETE FROM loja WHERE id = '${id}'`
  
    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
  
        res.redirect('/loj')
    })
  })

  //rotas Fornecedor
  //rota raiz
app.get('/fornecedor', (req, res) => {
    res.render('home-fornecedor', { layout: false })
  })

  //rota para inserir dados Fornecedor
app.post('/fornecedor-cad/insertfornecedor', (req, res) => {
    const nome = req.body.nome
    const departamento = req.body.departamento
  
    const sql = `INSERT INTO fornecedor (nome,departamento) VALUES ('${nome}', '${departamento}')`
  
    conn.query(sql, function(err){
        if (err){
            console.log(err)
        }
  
        res.redirect('/fornecedor-cad')
    })
  })
  
  //Rota de consulta geral Fornecedor
  app.get('/fornecedor-cad', (req, res) => {
    const sql = 'SELECT * FROM fornecedor'
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
    
        const listar = data
        
        console.log(listar)
  
        res.render('fornecedor-cad', { layout: false, listar })
  
    })
  })
  
  //Consulta um registo pelo nome (fornecedor.handlebars)
  app.get('/fornecedor-cad/:id', (req, res) => {
    const nome = req.params.id
    
    const sql = `SELECT * FROM fornecedor WHERE id = '${nome}'`
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
  
        const listarFornecedor = data[0]
        res.render('fornecedor', {  layout: false, listarFornecedor } )
  
    })
  })
  
  //Rota do buscar Fornecedor
  app.get('/busc-fornecedor', (req, res) => {
    res.render('busca-fornecedor', { layout: false })
  })
  
  //Rota busc, para exibir o resultado do buscar Fornecedor
  app.post('/busc-fornecedor/', (req, res) => {
    const nome = req.body.nome
    const sql = `SELECT * FROM fornecedor WHERE nome = '${nome}'`
  
    conn.query(sql, function(err, data){
       if(err){
       console.log(err)
        return
      }
       const listarFornecedor = data[0]
       res.render('fornecedor', {  layout: false, listarFornecedor } )
       })
      })
  
  //pegando para editar registro Fornecedor
  app.get('/fornecedor-cad/edit/:id', (req, res) => {
      
    const id = req.params.id
  
    const sql = `SELECT * FROM fornecedor where id = '${id}'`
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
  
        const fornecedor = data[0]
        res.render('edit-fornecedor', { layout: false, fornecedor } )
  
    })
  })
  
  //rota de edicao do registro com post
  app.post('/fornecedor-cad/updatefornecedor-cad', (req, res) => {
  
    const id = req.body.id
    const nome = req.body.nome
    
    const sql = `UPDATE fornecedor SET nome = '${nome}' WHERE id = '${id}'` 
  
    conn.query(sql, function(err) {
        if(err){
            console.log(err)
            return
        }
  
        res.redirect('/fornecedor-cad')
    })
  
  })
  
  //rota para deletar um registro fornecedor
  app.get('/fornecedor-cad/remove/:id', (req, res) => {
    const id = req.params.id
  
    const sql = `DELETE FROM fornecedor WHERE id = '${id}'`
  
    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
  
        res.redirect('/fornecedor-cad')
    })
  })
  
  
  
  



  

//conexão com o banco de dados 
var conn = mysql.createConnection({ //esse conn é de connection. Foi abreviado para facilitar na hora da chamada da função
    host: 'localhost',
    port: '3307', //esse numero de servidor foi informado pelo xampp, foi o número ao lado do mysql
    user: 'root', //o usuário que usamos para entrar no mariaDB. Usuário central.
    password: '',  // a senha sempre fica em branco
    database: 'projetofinal'  // banco de dados que criamos pelo phpmyadmin mesmo
})
conn.connect(function(err){
    if(err) {
        console.log(err)
    }
    console.log('Conectado com sucesso!');
    })
//configurar o servidor 
app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})