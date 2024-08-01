import { Create } from '@/models/bank/local/create';
import { Update } from '@/models/bank/local/update';
import { Delete } from '@/models/bank/local/delete';

const LocalModel = {
    create: Create,
    update: Update,
    delete: Delete
}

export default LocalModel;