import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    isPurchased: Boolean,
    items: Array,
    total: Number,
  },
  {
    timestamps: true,
  }
)

let Dataset = mongoose.models.order || mongoose.model("order", orderSchema)
export default Dataset
