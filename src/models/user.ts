import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  password: string
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

export default mongoose.model<IUser>('User', UserSchema)
