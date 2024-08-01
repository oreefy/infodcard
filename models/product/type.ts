export interface ProductType {
    unique: string;
    title: string;
    image: string;
    price: string | null;
    message: string | null;
    authorUnique: string;
}
export function ProductSelect() {
    return {
        unique: true,
        title: true,
        image: true,
        price: true,
        message: true,
        authorUnique: true,
    }
}
export function ProductReturn(product: ProductType) {
    const response: ProductType = { unique: "", title: "", image: "", price: "", message: "", authorUnique: "", };
    response.unique = product.unique;
    response.title = product.title;
    response.image = product.image;
    response.price = product.price;
    response.message = product.message;
    response.authorUnique = product.authorUnique;
    return response;
}
export function ProductReturns(products: ProductType[]) {
    const response: ProductType[] = [];
    products.map((product) => {
        response.push(ProductReturn(product));
    });
    return response;
}