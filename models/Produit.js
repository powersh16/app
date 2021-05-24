const mongoose = require('mongoose');

const ProduitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  promotion: {
    type: Number,
    required: true
  },
  images:{
    type:String,
  
  },
  couleur: {
    type: Array,
    required: true
  },
 
  tailles:{
    type:Array,
    required: true
  }
});

const Produit = mongoose.model('Produit', ProduitSchema);

module.exports = Produit;