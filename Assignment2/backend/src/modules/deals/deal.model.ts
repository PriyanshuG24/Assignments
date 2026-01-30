import mongoose, { Schema, Document } from "mongoose";

interface IDeal extends Document {
    dealId: number;
    title: string;
    description: string;
    category: string;
    partnerName: string;
    isLocked: boolean;
    expiresAt: Date;
}

const DealSchema = new Schema<IDeal>(
    {
        dealId: { type: Number, required: true },
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        category: {
            type: String,
            required: true,
            trim: true,
            enum: ["cloud", "marketing", "analytics", "productivity", "devtools", "other"],
        },
        partnerName: { type: String, required: true, trim: true },
        isLocked: { type: Boolean, default: false },
        expiresAt: { type: Date, required: true }
    },
    { timestamps: true }
);

DealSchema.index({ category: 1, isLocked: 1 });
DealSchema.index({ title: "text", description: "text", partnerName: "text" });
DealSchema.index({ expiresAt: 1 });
DealSchema.index({ dealId: 1 }, { unique: true });

const Deal = mongoose.model<IDeal>('Deal', DealSchema)
export default Deal
