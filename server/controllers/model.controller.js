/*
  @desc   get model metadata
  @route  GET /models/id
  @access public
*/
const getModel = (req, res) => {
    res.status(200).json({data: "metadata for model {id}"})
}

/*
  @desc   get models
  @route  GET /models
  @access public
*/
const getModels = (req, res) => {
    res.status(301).redirect('/models/1')
}

module.exports = { getModels, getModel }