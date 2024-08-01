export interface TransactionType {
    unique: string;
    invoice: string;
    method: string;
    accountNumber: string;
    plan: "FREE" | "PREMIUM" | "BUSINESS";
    quantity: number;
    amount: number;
    status: "Pending" | "Approved" | "Rejected";
    extend?: boolean;
    name?: string;
    phone?: string;
    address?: string;
    screenshot?: string;
    product?: string | null;
    trxID?: string | null;
    couponName?: string | null;
    couponPercentage?: number;
    couponPartner?: number;
    couponClient?: number;
    couponProviderUnique?: string | null;
    authorUnique?: string;
    updatedAt?: Date;
    createdAt?: Date;
}

export function TransactionSelect(fields?: string) {
    return {
        unique: true,
        invoice: true,
        method: true,
        accountNumber: true,
        plan: true,
        quantity: true,
        amount: true,
        status: true,
        extend: fields?.includes("transaction.extend"),
        name: fields?.includes("transaction.name"),
        phone: fields?.includes("transaction.phone"),
        address: fields?.includes("transaction.address"),
        screenshot: fields?.includes("transaction.screenshot"),
        product: fields?.includes("transaction.product"),
        trxID: fields?.includes("transaction.trxID"),
        couponName: fields?.includes("transaction.couponName"),
        couponPercentage: fields?.includes("transaction.couponPercentage"),
        couponPartner: fields?.includes("transaction.couponPartner"),
        couponClient: fields?.includes("transaction.couponClient"),
        couponProviderUnique: fields?.includes("transaction.couponProviderUnique"),
        authorUnique: fields?.includes("transaction.authorUnique"),
        updatedAt: fields?.includes("transaction.updatedAt"),
        createdAt: fields?.includes("transaction.createdAt"),
    }
}
export function TransactionReturn(transaction: TransactionType, fields?: string) {
    const response: TransactionType = { unique: "", invoice: "", method: "", accountNumber: "", plan: "FREE", quantity: 0, amount: 0, status: "Pending" };
    response.unique = transaction.unique;
    response.invoice = transaction.invoice;
    response.method = transaction.method;
    response.accountNumber = transaction.accountNumber;
    response.plan = transaction.plan;
    response.quantity = transaction.quantity;
    response.amount = transaction.amount;
    response.status = transaction.status;
    if (fields?.includes("transaction.extend")) { response.extend = transaction.extend };
    if (fields?.includes("transaction.name")) { response.name = transaction.name };
    if (fields?.includes("transaction.phone")) { response.phone = transaction.phone };
    if (fields?.includes("transaction.address")) { response.address = transaction.address };
    if (fields?.includes("transaction.screenshot")) { response.screenshot = transaction.screenshot };
    if (fields?.includes("transaction.product")) { response.product = transaction.product };
    if (fields?.includes("transaction.trxID")) { response.trxID = transaction.trxID };
    if (fields?.includes("transaction.couponName")) { response.couponName = transaction.couponName };
    if (fields?.includes("transaction.couponPercentage")) { response.couponPercentage = transaction.couponPercentage };
    if (fields?.includes("transaction.couponPartner")) { response.couponPartner = transaction.couponPartner };
    if (fields?.includes("transaction.couponClient")) { response.couponClient = transaction.couponClient };
    if (fields?.includes("transaction.couponProviderUnique")) { response.couponProviderUnique = transaction.couponProviderUnique };
    if (fields?.includes("transaction.authorUnique")) { response.authorUnique = transaction.authorUnique };
    if (fields?.includes("transaction.updatedAt")) { response.updatedAt = transaction.updatedAt };
    if (fields?.includes("transaction.createdAt")) { response.createdAt = transaction.createdAt };
    return response;
}
export function TransactionReturns(transactions: TransactionType[], fields?: string) {
    const response: TransactionType[] = [];
    transactions.map((transaction) => {
        response.push(TransactionReturn(transaction, fields));
    });
    return response;
}