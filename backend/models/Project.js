import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    desc: { type: String, required: true },
    tech: [{ type: String }],
    iconKey: { type: String, default: '' },
    image: { type: String, default: '' },
    client: { type: String, default: '' },
    stats: { type: String, default: '' },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);
export default Project;

