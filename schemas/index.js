const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
mongoose.plugin(beautifyUnique);

const base_schema = mongoose.Schema({
    name: {
        type: String,
        // unique: true
    },
})

module.exports = mongoose.model("BaseSchema", base_schema);
