import { FindUnique } from "@/models/social/find";
import { Create } from "@/models/social/create";
import { Delete } from "@/models/social/delete";

const SocialModel = {
    create: Create,
    delete: Delete,
    find: {
        unique: FindUnique
    },
}
export default SocialModel;