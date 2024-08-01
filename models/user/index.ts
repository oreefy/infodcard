import { Create } from "@/models/user/create";
import { FindUnique } from "@/models/user/find";
import { Update, ChangePassword, ComparePassword } from "@/models/user/update";
import messages from "@/models/user/messages";
import { CodeGenerate } from "@/models/user/others";

const UserModel = {
    create: Create,
    update: Update,
    find: {
        unique: FindUnique
    },
    messages,
    codeGenerate: CodeGenerate,
    password: {
        change: ChangePassword,
        compare: ComparePassword
    }
}

export default UserModel;