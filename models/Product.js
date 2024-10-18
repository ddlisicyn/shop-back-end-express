const { Schema, model } = required('mongoose');

const imageSchema = new Schema({
    imageType: {type: String, required: true},
    format: {type: String, required: true},
    url: {type: String, required: true},
    width: {type: Number, required: true}
});

const renditionsSchema = new Schema({
    url: {type: String, required: true},
    renditionType: {type: String, required: true},
    assetFormat: {
        width: {type: Number, required: true}
    }
});

const lynxPictureSchema = new Schema({
    renditions: [renditionsSchema]
});

const productSchema = new Schema({
    amwaySize: {type: String, required: false },
	code: {type: String, required: true, unique: true},
    alias: {type: String, require: false, unique: true},
	name: {type: String, required: true},
    price: {type: Number, required: true},
    retailPrice: {type: Number, required: true},
    images: {type: [imageSchema], required: true},
    lynxPicture: {type: lynxPictureSchema, required: false},
    lynxColorCode: {type: String, required: false},
    lynxName: {type: String, required: true},
    variant: {type: [productSchema], required: false}
});

module.exports = model('Product', productSchema);