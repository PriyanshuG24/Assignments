import mongoose, { Document, Schema } from 'mongoose'
import argon2 from 'argon2'


interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
    isVerified: boolean;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        try {
            this.password = await argon2.hash(this.password)
        } catch (error) {
            throw error;
        }
    } else {
        throw new Error('Password is not modified');
    }
})

userSchema.methods.comparePassword = async function (candidatePassword: string) {
    try {
        return await argon2.verify(this.password, candidatePassword)
    } catch (error) {
        throw error;
    }
}

const User = mongoose.model<IUser>('User', userSchema)
export default User