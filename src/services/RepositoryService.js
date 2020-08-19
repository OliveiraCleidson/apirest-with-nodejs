const uuid = require('uuidv4').uuid

const repositories = []

function createRepository({url, title, techs}){
  const newRepository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  }

  try{
    repositories.push(newRepository)  
    return newRepository
  } catch(error){
    return false
  }
}

function listRepositories(){
  return repositories
}

function updateById(id, {url, title, techs}){
  const repository = repositories.find(repository => repository.id === id)
  if(repository){
    Object.assign(repository, {url, title, techs})
    return repository
  }
    return false
}

function getById(id){
  const repository = repositories.find(repository => repository.id === id)
  if(repository){
    return repository
  }
    return false
}

function deleteById(id){
  const repository = repositories.find(repository => repository.id === id)
  if(repository){
    repositories.splice(repositories.indexOf(repository), 1)
    return repositories
  }
    return false
}

module.exports = {
  createRepository,
  listRepositories,
  getById,
  updateById,
  deleteById
}