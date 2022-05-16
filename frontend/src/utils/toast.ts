import {toastAtom} from '../state/toastState'
import { useRecoilState } from 'recoil'
import {IToast} from '../interfaces/toast'
import {v1} from 'uuid'
import {useQueueState} from 'rooks'

export const useToast = () => {
  const [toastList, setToastList] = useRecoilState(toastAtom)

  let current = toastList;

  const showToast = (toast: IToast) => {

    const id = v1()

    setToastList((prevToastList) => [{id, ...toast}, ...prevToastList])

    setTimeout(() => {
      setToastList(toastList.filter((toast: IToast) => toast.id !== id))
    }, 2000)

    return current;
  }

  return {
    showToast
  }
}