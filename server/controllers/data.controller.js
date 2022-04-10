/*
  @desc   add scenario
  @route  POST /scenarios/add
  @access private
*/
const addScenario = (req, res) => {
    res.status(201).json({msg: "scenario saved to database"})
}

/*
  @desc   get list of saved scenrios
  @route  GET /scenarios
  @access private
*/
const getScenarios = (req, res) => {
    res.status(200).json({data: "list of saved scenarios"})
}

module.exports = { addScenario, getScenarios }