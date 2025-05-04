import { z } from "zod";
import { customerValidation } from "../utils/zod";
import CustomerModel from "../schemas/customer.schema";

export const addNewCustomer = async (customerData: z.infer<typeof customerValidation>) => {
    try {
        const { phoneNumber } = customerData;
        const existingCustomer = await CustomerModel.findOne({ phoneNumber });
        if(existingCustomer) return { success: false, message: "Customer already exists" };

        await CustomerModel.create(customerData);
        return {
            success: true,
            message: "Added customer successfully"
        }
    } catch (error) {
        return { success: false, error: `Internal server error: ${error}` };
    }
}

export const getAllCustomers = async () => {
    try {
        const customers = await CustomerModel.find();
        return {
            success: true,
            customers
        }
    } catch (error) {
        return { success: false, error: `Internal server error: ${error}` };
    }
}

export const getOneCustomer = async (phoneNumber: string) => {
    try {
        const customer = await CustomerModel.findOne({ phoneNumber });
        return {
            success: true,
            customer
        }
    } catch (error) {
        return { success: false, error: `Internal server error: ${error}` };
    }
}

const updateCustomerValidation = customerValidation.partial();

export const updateCustomerData = async (customerId: string, customerData: z.infer<typeof updateCustomerValidation>) => {
    try {
        const existingCustomer = await CustomerModel.findById(customerId);
        if(!existingCustomer) return { success: false, message: "Customer does not exist" };

        const result = updateCustomerValidation.safeParse(customerData);
        if(!result.success) return { success: false, error: "Internal server error" }
        
        await CustomerModel.findByIdAndUpdate(customerId, { $set: customerData }, { new: true });
        return {
            success: true,
            message: "Customer updated successfully"
        }
    } catch (error) {
        return { success: false, error: `Internal server error: ${error}` };
    }
}

export const removeCustomer = async (customerId: string) => {
    try {
        const existingCustomer = await CustomerModel.findById(customerId);
        if(!existingCustomer) return { success: false, message: "Customer does not exists" };

        await CustomerModel.findByIdAndDelete(customerId);
        return {
            success: true,
            message: "Customer deleted successfully"
        }
    } catch (error) {
        return { success: false, error: `Internal server error: ${error}` };
    }
}