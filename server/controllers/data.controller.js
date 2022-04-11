const Scenario = require("../models/scenarioModel");

/*
  @desc   add scenario
  @route  POST /scenarios/add
  @access private
*/
const addScenario = async (req, res) => {
  const data = req.body;
  let id = data.id;
  const scenario = new Scenario(data);
  const duplicates = await Scenario.findOne({ id });
  let error;

  if (!duplicates) {
    await scenario.save(function (err) {
      error = err;
    });
  }
  if (!duplicates && !error) {
    res.status(201).json(scenario);
  } else if (duplicates) {
    res.status(409).json(error);
    console.log("409");
  }
};

/*
  @desc   get list of saved scenrios
  @route  GET /scenarios
  @access private
*/
const getScenarios = async (req, res) => {
  // const data = await Scenario.find();
  res.status(200).json({ data: "list of saved scenarios" });
};

module.exports = { addScenario, getScenarios };
