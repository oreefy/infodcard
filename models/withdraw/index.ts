import { Create } from '@/models/withdraw/create';
import { StatusFilter } from '@/models/withdraw/filter';

const WithdrawModel = {
    create: Create,
    filter: {
        status: StatusFilter,
    }
}

export default WithdrawModel;