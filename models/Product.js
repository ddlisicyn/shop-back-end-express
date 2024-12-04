const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const imageSchema = new Schema({
    imageType: {type: String, required: true},
    format: {type: String, required: true},
    url: {type: String, required: true},
    width: {type: Number, required: true}
});

const productSchema = new Schema({
    amwaySize: {type: String, required: false },
	code: {type: String, required: true, unique: true},
    alias: {type: String, required: false, unique: false},
	name: {type: String, required: true},
    price: {type: Number, required: true},
    retailPrice: {type: Number, required: true},
    category: { type: String, required: true },
    images: {type: [imageSchema], required: true},
    lynxColorCode: {type: String, required: false},
    lynxName: {type: String, required: false},
    visible: {type: Boolean, required: true}
});

const variantSchema = productSchema.omit(['visible']);

productSchema.add({variants: {type: [variantSchema], required: false}});
productSchema.plugin(mongoosePaginate);

module.exports = model('Product', productSchema);