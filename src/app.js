const express = require("express");
const cors = require("cors");
const RepositoryService = require("./services/RepositoryService")
const LikeService = require("./services/LikeService")

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

app.get("/repositories", (req, res) => {
  res.status(200).json(RepositoryService.listRepositories())
});

app.post("/repositories", (req, res) => {
  const {url, title, techs} = req.body
  const savedRepository = RepositoryService.createRepository({url, title, techs});
  if(savedRepository){
    res.status(201).json(savedRepository)
    return
  }
  res.status(400).json("Bad Request") 
});

app.put("/repositories/:id", (req, res) => {
  const {id} = req.params;
  const {url, title, techs} = req.body
  const repository = RepositoryService.updateById(id, {url, title, techs})
  if(repository){
    res.status(200).json(repository)
    return
  }
  res.status(400).json("Bad Request")

});

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params;
  const {url, title, techs} = req.body
  const repository = RepositoryService.deleteById(id)
  if(repository){
    res.status(204).json("Deleted")
    return
  }
  res.status(400).json("Bad Request")
});

app.post("/repositories/:id/like", (req, res) => {
  const {id} = req.params;
  const repository = RepositoryService.getById(id)
  if(repository){
    if(LikeService.likeRepository(repository)) {
      res.status(200).json(repository)
      return
    }
  }
  res.status(400).json("Bad Request")
});

module.exports = app;
