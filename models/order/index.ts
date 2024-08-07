import { Create } from '@/models/order/create';
import { Update } from '@/models/order/update';
import { FindUnique, FindMany, FindUserOrders } from '@/models/order/find';
import { StatusFilter } from '@/models/order/filter';
import { GenerateInvoice } from '@/models/order/others';

const OrderModel = {
    create: Create,
    update: Update,
    find: {
        unique: FindUnique,
        many: FindMany,
        userOrders: FindUserOrders,
    },
    generateInvoice: GenerateInvoice,
    filter: {
        status: StatusFilter,
    }
}

export default OrderModel;