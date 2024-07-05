// models/SingleOrders.js
import mongoose from 'mongoose';

const singleOrders = new mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodItems'
    }],
    notes: {
        type: String,
    },
    item_total: {
        type: String,
    },
    charges: {
        type: String,
    },
    total_price: {
        type: String,
    },
    estimated_time: {
        type: String,
    },
    status: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.models.SingleOrders || mongoose.model("SingleOrders", singleOrders);
