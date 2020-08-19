function likeRepository(repository){
  repository.likes++
  return true
}

module.exports = {
  likeRepository
}