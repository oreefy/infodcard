import { ShopProductImageType, ShopProductImageSelect } from '@/models/shopProductImage/type'

export interface ShopProductType {
    unique: string;
    path: string;
    title: string;
    images: ShopProductImageType[];
    currency: string;
    price: number;
    description?: string | null;
    discount?: number | null;
    fee?: number;
    video?: string | null;
}
export function ShopProductSelect(fields?: string) {
    return {
        unique: true,
        path: true,
        title: true,
        images: { select: ShopProductImageSelect() },
        currency: true,
        price: true,
        description: fields?.includes("shopProduct.description"),
        discount: fields?.includes("shopProduct.discount"),
        fee: fields?.includes("shopProduct.fee"),
        video: fields?.includes("shopProduct.video"),
    }
}
export function ShopProductReturn(shopProduct: ShopProductType, fields?: string) {
    const response: ShopProductType = { unique: "", path: "", title: "", images: [], currency: "", price: 0 };
    response.unique = shopProduct.unique;
    response.path = shopProduct.path;
    response.title = shopProduct.title;
    response.images = shopProduct.images;
    response.currency = shopProduct.currency;
    response.price = shopProduct.price;

    if (fields?.includes("user.shopProduct")) { response.description = shopProduct.description }
    if (fields?.includes("user.shopProduct")) { response.discount = shopProduct.discount }
    if (fields?.includes("user.shopProduct")) { response.fee = shopProduct.fee }
    if (fields?.includes("user.shopProduct")) { response.video = shopProduct.video }
    return response;
}
export function ShopProductReturns(shopProducts: ShopProductType[], fields?: string) {
    const response: ShopProductType[] = [];
    shopProducts.map((shopProduct) => {
        response.push(ShopProductReturn(shopProduct, fields));
    });
    return response;
}