import MobileBank from '@/models/bank/mobile';
import LocaleBank from '@/models/bank/local';
import GlobalBank from '@/models/bank/global';

const BankModel = {
    mobile: MobileBank,
    local: LocaleBank,
    global: GlobalBank,
}
export default BankModel;