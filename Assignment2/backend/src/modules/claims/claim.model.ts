import mongoose, { Schema, Document } from "mongoose";

interface IClaim extends Document {
    claimId: number;
    userId: string;
    dealId: string;
    status: string;
}
const ClaimSchema = new Schema(
    {
        claimId: { type: Number, required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        dealId: { type: Schema.Types.ObjectId, ref: "Deal", required: true },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

ClaimSchema.index({ userId: 1, dealId: 1 }, { unique: true });
ClaimSchema.index({ claimId: 1 }, { unique: true });

const Claim = mongoose.model<IClaim>('Claim', ClaimSchema)
export default Claim
