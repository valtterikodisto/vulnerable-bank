import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  password: string
  balance: number
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, required: true }
})

export default mongoose.model<IUser>('User', UserSchema)
