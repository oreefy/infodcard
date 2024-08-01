import { FindUnique, FindAuthorMessages } from '@/models/message/find';
import { Create } from '@/models/message/create';
import { Delete } from '@/models/message/delete';

const MessageModel = {
    find: {
        unique: FindUnique,
        byAuthor: FindAuthorMessages,
    },
    create: Create,
    delete: Delete,
}

export default MessageModel;