import mongoose, { Document, Schema, Model } from 'mongoose'

interface OrderItem extends Document {
    isDeleted: boolean,
    partNumber: string,
    partName: string,
    price: number,
    quantity: number,
    status: string,
    totalSalePrice: number,
    createdAt: Date,
    date: Date,
    remark: string
}

const OrderItemSchema: Schema<OrderItem> = new Schema({

})

const OrderItemModels: Model<OrderItem> = mongoose.model<OrderItem>('orders', OrderItemSchema)

export { OrderItemModels, OrderItem }