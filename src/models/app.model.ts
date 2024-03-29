// app-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

export default function (app: Application): Model<any> {
  const modelName = 'app';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['node', 'react'],
    },
    repo: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    port: {
      type: Number,
    },
    status: {
      type: String,
      default: 'Not deployed',
      enum: [
        'Not deployed',
        'Deployed',
        'Deploying...',
        'Error',
      ],
    },
    error: {
      type: String,
    },
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
