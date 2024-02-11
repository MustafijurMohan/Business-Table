import axios from 'axios'
import { ErrorToast } from "../helper/FormHelper"
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice"
import store from "../redux/store/store"
import { SetAllProduct, SetTotal } from '../redux/state-slice/product-slice'
const BaseURL="http://localhost:3000/api/v1"


export const ProductListRequest = async (pageNo, perPage, searchKeyword) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/product-list/' + pageNo + '/' + perPage + '/' + searchKeyword
        let res = await axios.get(URL)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'Successfull') {
            if (res.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetAllProduct(res.data['data'][0]['Rows']))
                store.dispatch(SetTotal(res.data['data'][0]['Total'][0]['Count']))
                return true
            } else {
                store.dispatch(SetAllProduct([]))
                store.dispatch(SetTotal(0))
                ErrorToast('No Data Found !')
                return false
            }
        } else {
            ErrorToast('Something Went Wrong !')
            return false
        }
    } catch (error) {
        store.dispatch(HideLoader())
        ErrorToast('Something Went Wrong !')
        return false
    }
}








