import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      unique: true, // Ensures MongoDB enforces unique values for the name field
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

// Sync indexes to ensure the database reflects the schema definition
// projectSchema.post('save', async function (doc, next) {
//   try {
//     await mongoose.model('Project').syncIndexes();
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

const Project = mongoose.model('Project', projectSchema);

export default Project;
