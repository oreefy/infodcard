export interface WithdrawType {
    unique: string;
    amount: number;
    status: "Pending" | "Approved" | "Rejected";
    method: string;
    account: string;
    message?: string | null;
    authorUnique?: string;
    updatedAt?: Date;
    createdAt?: Date;
}
export function WithdrawSelect(fields?: string) {
    return {
        unique: true,
        amount: true,
        status: true,
        method: true,
        account: true,
        message: fields?.includes("withdraw.message"),
        authorUnique: fields?.includes("withdraw.authorUnique"),
        updatedAt: fields?.includes("withdraw.updatedAt"),
        createdAt: fields?.includes("withdraw.createdAt"),
    }
}
export function WithdrawReturn(withdraw: WithdrawType, fields?: string) {
    const response: WithdrawType = { unique: "", amount: 0, status: "Pending", method: "", account: "" };
    response.unique = withdraw.unique;
    response.amount = withdraw.amount;
    response.status = withdraw.status;
    response.method = withdraw.method;
    response.account = withdraw.account;
    if (fields?.includes("withdraw.message")) { response.message = withdraw.message }
    if (fields?.includes("withdraw.authorUnique")) { response.authorUnique = withdraw.authorUnique }
    if (fields?.includes("withdraw.updatedAt")) { response.updatedAt = withdraw.updatedAt }
    if (fields?.includes("withdraw.createdAt")) { response.createdAt = withdraw.createdAt }
    return response;
}
export function WithdrawReturns(withdraws: WithdrawType[], fields?: string) {
    const response: WithdrawType[] = [];
    withdraws.map((withdraw) => {
        response.push(WithdrawReturn(withdraw, fields));
    });
    return response;
}