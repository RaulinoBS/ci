const express = require("express")
const server = express()


const db = require("./db")

    
    
server.use(express.static("public"))
server.use(express.urlencoded({ extended:true }))
    
    
    
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
  express: server,
  noCache: true,
})



server.get("/", function (request, response) {

  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err)
      return response.send("Erro no banco de dados!")
    }
    const reverseIdeas = [...rows].reverse()
    const lastIdeas = []
    for (idea of (reverseIdeas)) {
      if (lastIdeas.length < 3) {
        lastIdeas.push(idea)
      }
    }

    return response.render("index.html", { ideas: lastIdeas })
  })


})

server.get("/ideias", function (request, response) {
  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err)
      return response.send("Erro no banco de dados!")
    }
    const reverseIdeas2 = [...rows].reverse()
    return response.render("ideas.html", { ideas: reverseIdeas2 })
  })
})

server.post("/" , function(request,response){
  const query = `
    INSERT INTO ideas(
      image,
      title,
      category,
      description,
      link
    ) VALUES(?,?,?,?,?);
   `

  const values = [
    request.body.image,
    request.body.title,
    request.body.category,
    request.body.description,
    request.body.link
  ]

  db.run(query, values, function (err) {
    if (err) {
      console.log(err)
      return response.send("Erro no banco de dados!")
    }

    return response.redirect("/ideias")
  })
})

server.listen("3000")