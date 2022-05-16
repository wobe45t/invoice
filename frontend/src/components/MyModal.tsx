import {useRef} from 'react'
import { useEventListener } from '../utils/useEventListener'

export function MyModal(props: {
  header?: string
  children: any
  show: boolean
  confirmText?: string
  cancelText?: string
  setShow: (v: boolean) => void
  onConfirm?: () => void
}) {
  const { show, setShow } = props
  const onConfirm = props.onConfirm || (() => {})
  const header = props.header || 'Warning'
  const confirmText = props.confirmText || 'Continue'
  const cancelText = props.cancelText || 'Cancel'
  const divRef = useRef(null)

  return (
    <>
      {show ? (
        <>
          <div
            ref={divRef}
            className='w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
          >
            <div className='my-6 w-full sm:w-3/4 md:w-3/5 lg:w-1/2'>
              <div className='border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {props.header}
                <div className='p-4'>{props.children}</div>
                <div className='flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => setShow(false)}
                  >
                    {cancelText}
                  </button>
                  <button
                    className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => {
                      setShow(false)
                      onConfirm()
                    }}
                  >
                    {confirmText}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  )
}
