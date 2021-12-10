import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	image: { type: String, required: true },
	storeId: { type: String, required: true },
});

export default mongoose.model('Products', bookSchema);
