"use server";
import { connectToDatabase } from "../mongodb/database";
import Category from "../mongodb/models/category.model";
import { handleError } from "../utils";
type categoryParams = {
  newCategory: string;
};
export const createCategory = async ({ newCategory }: categoryParams) => {
  try {
    await connectToDatabase();

    const cat = await Category.create({ name: newCategory });
    return JSON.parse(JSON.stringify(cat));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    await connectToDatabase();
    const categories = await Category.find();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};
