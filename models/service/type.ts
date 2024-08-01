export interface ServiceType {
    unique: string;
    image: string;
    title: string;
    message: string | null;
    price: string | null;
    authorUnique: string;
}
export function ServiceSelect() {
    return {
        unique: true,
        image: true,
        title: true,
        message: true,
        price: true,
        authorUnique: true,
    }
}
export function ServiceReturn(service: ServiceType) {
    return service;
}
export function ServiceReturns(services: ServiceType[]) {
    const response: ServiceType[] = [];
    services.map((service) => {
        response.push(ServiceReturn(service));
    });
    return response;
}