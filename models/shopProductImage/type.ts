export interface ShopProductImageType {
    image: string;
    unique: string;
}
export function ShopProductImageSelect() {
    return {
        image: true,
        unique: true,
    }
}
export function ShopProductImageReturn(shopProductImage: ShopProductImageType) {
    return shopProductImage;
}
export function ShopProductImageReturns(shopProductImages: ShopProductImageType[]) {
    const response: ShopProductImageType[] = [];
    shopProductImages.map((shopProductImage) => {
        response.push(ShopProductImageReturn(shopProductImage));
    });
    return response;
}