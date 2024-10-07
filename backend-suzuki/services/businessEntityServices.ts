// import BusinessEntity from '../models/businessEntityModel';
// import { BusinessEntityListResponse, BusinessEntityResponse } from '../helpers/businessEntityRequestResponseInterface'
// import { errorResponse, successResponse } from '../helpers/responseHelper';
// import mongoose from 'mongoose';

// class BusinessEntityServiceClass {
//   async listAll(): Promise<BusinessEntityListResponse> {
//     try {
//       const result = await BusinessEntity.find();
//       return successResponse({ statusCode: 200, message: 'These are all business entity datas', data: result });
//     } catch (err) {
//       console.log(err);
//       return errorResponse({ statusCode: 500, message: "Something Went Wrong", data: null })
//     }
//   }

//   async create(data: { name: string }): Promise<BusinessEntityResponse> {
//     try {
//       const { name } = data;
//       const result = await BusinessEntity.create({ name });
//       return successResponse({ statusCode: 200, message: 'Business Entity Name Created successfully', data: result });
//     } catch (err) {
//       console.log(err);
//       return errorResponse({ statusCode: 500, message: "Something Went Wrong", data: null });
//     }
//   }

//   async readById(id: mongoose.Types.ObjectId): Promise<BusinessEntityResponse> {
//     try {
//       const result = await BusinessEntity.findById(id);
//       return successResponse({ statusCode: 200, message: 'This is business entity by id', data: result });
//     } catch (err) {
//       console.log(err);
//       return errorResponse({ statusCode: 500, message: "Something Went Wrong", data: null });
//     }
//   }

//   async updateById(id: mongoose.Types.ObjectId, datas: { name: string }): Promise<BusinessEntityResponse> {
//     try {
//       const { name } = datas;
//       const result = await BusinessEntity.findByIdAndUpdate(id, { name }, { new: true });
//       return successResponse({ statusCode: 200, message: 'Business Entity Updated successfully', data: result });
//     } catch (err) {
//       console.log(err);
//       return errorResponse({ statusCode: 500, message: "Something Went Wrong", data: null });
//     }
//   }

//   async delete(id: mongoose.Types.ObjectId): Promise<BusinessEntityResponse> {
//     try {
//       const result = await BusinessEntity.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
//       return successResponse({ statusCode: 200, message: 'Business Entity Name deleted successfully', data: result });
//     } catch (err) {
//       console.log(err);
//       return errorResponse({ statusCode: 500, message: "Something Went Wrong", data: null });
//     }
//   }
// }

// export default new BusinessEntityServiceClass();
