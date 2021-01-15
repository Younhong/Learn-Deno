import { Product } from '../types.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

let products: Product[] = [
    {
        id: "1",
        name: "Iron Robots",
        description: "Made by Tony Start",
        price: 500.00
    }, {
        id: "2",
        name: "Shield",
        description: "Made and Used by Captain America",
        price: 77.33
    }, {
        id: "3",
        name: "Hammer",
        description: "Belongs to Thor",
        price: 130.00
    }
];

// @desc    Get all products
// @route   GET /api/v1/products
const getProducts = ({response}: {response: any}) => {
    response.body = {
        success: true,
        data: products
    }
}

// @desc    Get single product
// @route   GET /api/v1/products/:id
const getProduct = ({params, response}: {params: {id: string}, response: any}) => {
    const product: Product | undefined = products.find(
        p => p.id === params.id);
    
    if (product) {
        response.status = 200;
        response.body = {
            success: true,
            data: product
        };
    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: "No Product Found"
        };
    }
}

// @desc    Add Product
// @route   POST /api/v1/products
const addProduct = async ({ request, response }: { request: any, response: any }) => {    
    const body = await request.body()

    if (!request.hasBody) {
        response.status = 400;
        response.body = {
            success: false,
            msg: "No data"
        };
    } else {
        const product: Product = await body.value;
        product.id = v4.generate();
        products.push(product);
        response.status = 201;
        response.body = {
            success: true,
            data: product
        }
    }
}

// @desc    Update product
// @route   PUT /api/v1/products/:id
const updateProduct = async({params, request, response}: {params: {id: string}, request: any, response: any}) => {
    const product: Product | undefined = products.find(
        p => p.id === params.id);
    
    if (product) {
        const body = await request.body();
        const updateData: {
            name?: string;
            description?: string;
            price?: number;
        } = await body.value;
        products = products.map(p => 
            p.id === params.id ? {
                ...p, ...updateData
            } : p);

        response.status = 200;
        response.body = {
            success: true,
            data: products
        };       
    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: "No Product Found"
        };
    }}

// @desc    Delete Product
// @route   DELETE /api/v1/products/:id
const deleteProduct = ({params, response}: {params: {id: string}, response: any}) => {
    const product: Product | undefined = products.find(
        p => p.id === params.id);

    if (product) {
        products = products.filter(p => p.id !== params.id);
        response.body = {
            success: true,
            msg: "Product Removed"
        };
    } else {
        response.body = {
            success: false,
            msg: "Remove Failed"
        };
    }
}

export {getProducts, getProduct, addProduct, updateProduct, deleteProduct}