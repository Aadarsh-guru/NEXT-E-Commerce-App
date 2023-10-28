import connect from "@/config/dbConfig";
import Category from "@/models/CategoryModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    await connect()
    try {
        const { name, slug } = await request.json();
        const category = await Category.findOne({ slug })
        if (category) {
            return NextResponse.json({ message: 'Category already exists', success: false }, { status: 200 })
        }
        const newCategory = new Category({ name, slug })
        await newCategory.save()
        return NextResponse.json({ message: 'Category added successfully', success: true, category: newCategory }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: 'Error while adding category', error, success: false }, { status: 500 })
    }
}


export const GET = async (request) => {
    await connect()
    try {
        const categories = await Category.find({}).sort({ updatedAt: 'descending' })
        return NextResponse.json({ message: 'Categories fetched successfully', success: true, categories }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Error while fetching category', error, success: false }, { status: 500 })
    }
}