const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const scenarioSchema = new Schema({
    id: {
        type: String, 
        required: [true, 'missing id field']
    },
    type: {
        type: String, 
        required: [true, 'missing type field']
    },
    attributes: {
        type: Map,
        of: Schema.Types.Mixed,
        required: [true, 'missing attributes field']
    }
});

module.exports = mongoose.model('Scenario', scenarioSchema);