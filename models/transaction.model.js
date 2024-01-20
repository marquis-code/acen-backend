const {mongoose} = require('./../config/mongoose');
const transactionSchema = new mongoose.Schema({
full_name: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
},
amount: {
    type: Number,
    required: true,
},
reference: {
    type: String,
    required: true
}
});
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = {Transaction}