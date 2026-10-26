import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    desc: { type: String, required: true },
    iconKey: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, default: 4.5 },
    baseCost: { type: Number, required: true, min: 0 },
    typicalDuration: { type: String, required: true },
    image: { type: String, default: '' },
    features: [{ type: String }],
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;

