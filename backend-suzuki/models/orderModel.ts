import mongoose, { Document, Schema, Model } from 'mongoose'

interface Order extends Document {
    isDeleted: boolean,
    orderDate: Date,
    orderNumber: number,
    customer: mongoose.Schema.Types.ObjectId,
    dealer: mongoose.Schema.Types.ObjectId,
    totalSaleAmount: number,
    totalItem: number,
    status: string,
    deliverOrder: mongoose.Schema.Types.ObjectId
}

const OrderSchema: Schema<Order> = new Schema({

})

const OrderModels: Model<Order> = mongoose.model<Order>('orders', OrderSchema)

export { OrderModels, Order }