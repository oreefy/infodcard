import { Create } from '@/models/order/create';
import { FindUnique, FindUserOrders } from '@/models/order/find';
import { StatusFilter } from '@/models/order/filter';
import { GenerateInvoice } from '@/models/order/others';

const OrderModel = {
    create: Create,
    find: {
        unique: FindUnique,
        userOrders: FindUserOrders,
    },
    generateInvoice: GenerateInvoice,
    filter: {
        status: StatusFilter,
    }
}

export default OrderModel;