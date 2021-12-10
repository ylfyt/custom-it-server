import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	username: { type: String, required: true },
	address: { type: String, required: true },
});

export default mongoose.model('Stores', storeSchema);
