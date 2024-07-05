// models/Orders.js
import mongoose from 'mongoose';

const orders = new mongoose.Schema({
    customer_id: {
        type: String,
    },
    order_id: {
        type: String,
    },
    restaurant_id: {
        type: String,
    },
    table_number: {
        type: String,
    },
    order_items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SingleOrders'
    }],
    initial_bill: {
        type: String,
    },
    tax: {
        type: String,
    },
    total_bill: {
        type: String,
    },
    order_status: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.models.Orders || mongoose.model("Orders", orders);
