import { FindUnique, FindAuthorMessages, FindMany } from '@/models/adminMessage/find'
import { Create } from '@/models/adminMessage/create'
import { Delete, DeleteUnique } from '@/models/adminMessage/delete'

const AdminMessage = {
    find: {
        unique: FindUnique,
        many: FindMany,
        byAuthor: FindAuthorMessages,
    },
    create: Create,
    deleteUnique: DeleteUnique,
    delete: Delete,
}
export default AdminMessage;