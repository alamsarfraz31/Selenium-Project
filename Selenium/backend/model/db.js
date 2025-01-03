const mongoose = require('mongoose');
require('dotenv').config()

const db = async ()=>{ 
    await mongoose.connect(process.env.DB)
  .then(() => console.log('Connected!'));
}

module.exports = db;