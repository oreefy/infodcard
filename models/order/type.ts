export interface OrderType {
    unique: string;
    status: "Pending" | "Processing" | "Shipping" | "Delivered" | "Rejected" | "Hold" | "Canceled";
    invoice: string;
    product: string;
    amount: number;
    name: string;
    design?: string | null;
    front?: string | null;
    back?: string | null;
    accountNumber?: string;
    method?: string;
    phone?: string;
    address?: string;
    screenshot?: string;
    trxID?: string | null;
    text?: string | null;
    couponName?: string | null;
    couponPercentage?: number;
    couponPartner?: number;
    couponClient?: number;
    couponProviderUnique?: string | null;
    authorUnique?: string | null;
    updatedAt?: Date;
    createdAt?: Date;
}
export function OrderSelect(fields?: string) {
    return {
        unique: true,
        status: true,
        invoice: true,
        product: true,
        amount: true,
        name: true,
        design: fields?.includes("order.design"),
        front: fields?.includes("order.front"),
        back: fields?.includes("order.back"),
        accountNumber: fields?.includes("order.accountNumber"),
        method: fields?.includes("order.method"),
        phone: fields?.includes("order.phone"),
        address: fields?.includes("order.address"),
        screenshot: fields?.includes("order.screenshot"),
        trxID: fields?.includes("order.trxID"),
        text: fields?.includes("order.text"),
        couponName: fields?.includes("order.couponName"),
        couponPercentage: fields?.includes("order.couponPercentage"),
        couponPartner: fields?.includes("order.couponPartner"),
        couponClient: fields?.includes("order.couponClient"),
        couponProviderUnique: fields?.includes("order.couponProviderUnique"),
        authorUnique: fields?.includes("order.authorUnique"),
        updatedAt: fields?.includes("order.updatedAt"),
        createdAt: fields?.includes("order.createdAt"),
    }
}
export function OrderReturn(order: OrderType, fields?: string) {
    const response: OrderType = { unique: "", status: "Pending", invoice: "", product: "", amount: 0, name: "" };
    response.unique = order.unique;
    response.status = order.status;
    response.invoice = order.invoice;
    response.product = order.product;
    response.amount = order.amount;
    response.name = order.name;
    if (fields?.includes("order.design")) { response.design = order.design };
    if (fields?.includes("order.front")) { response.front = order.front };
    if (fields?.includes("order.back")) { response.back = order.back };
    if (fields?.includes("order.accountNumber")) { response.accountNumber = order.accountNumber };
    if (fields?.includes("order.method")) { response.method = order.method };
    if (fields?.includes("order.phone")) { response.phone = order.phone };
    if (fields?.includes("order.address")) { response.address = order.address };
    if (fields?.includes("order.screenshot")) { response.screenshot = order.screenshot };
    if (fields?.includes("order.trxID")) { response.trxID = order.trxID };
    if (fields?.includes("order.text")) { response.text = order.text };
    if (fields?.includes("order.couponName")) { response.couponName = order.couponName };
    if (fields?.includes("order.couponPercentage")) { response.couponPercentage = order.couponPercentage };
    if (fields?.includes("order.couponPartner")) { response.couponPartner = order.couponPartner };
    if (fields?.includes("order.couponClient")) { response.couponClient = order.couponClient };
    if (fields?.includes("order.couponProviderUnique")) { response.couponProviderUnique = order.couponProviderUnique };
    if (fields?.includes("order.authorUnique")) { response.authorUnique = order.authorUnique };
    if (fields?.includes("order.updatedAt")) { response.updatedAt = order.updatedAt };
    if (fields?.includes("order.createdAt")) { response.createdAt = order.createdAt };
    return response;
}
export function OrderReturns(orders: OrderType[], fields?: string) {
    const response: OrderType[] = [];
    orders.map((order) => {
        response.push(OrderReturn(order, fields));
    });
    return response;
}