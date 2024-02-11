import { toast } from 'react-toastify';
class FormHelper {
    SuccessToast(msg) {
        toast.success(msg, {position: 'top-right', theme: 'dark'})
    }

    ErrorToast(msg) {
        toast.error(msg, {position: 'top-right', theme: 'dark'})
    }
}

export const {SuccessToast, ErrorToast} = new FormHelper()