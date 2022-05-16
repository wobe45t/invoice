export const Paginator = () => {

}
// import { useState } from 'react'
// import { usePagination } from '.'
// import {
//   ChevronDoubleLeftIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   ChevronDoubleRightIcon,
// } from '@heroicons/react/solid'
// import { classNames } from '../utils'

// interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
//   children: any
//   disabled?: boolean
// }

// const IconButton = (props: ButtonProps) => {
//   const { children, disabled, ...rest } = props

//   return (
//     <button
//       type='button'
//       className='border p-2 rounded shadow hover:bg-slate-300 disabled:bg-slate-200 bg-slate-200'
//       {...rest}
//       disabled={disabled}
//     >
//       {children}
//     </button>
//   )
// }

// interface Props {
//   data: any[]
//   itemsPerPage: number
//   onSelect?: (item: any) => void
//   Component: any
// }

// export const Paginator = (props: Props) => {
//   const { data, itemsPerPage, Component } = props
//   const onSelect = props.onSelect || (() => {})

//   const {
//     currentPage,
//     maxPage,
//     page,
//     canNext,
//     canPrevious,
//     jump,
//     goNext,
//     goPrevious,
//   } = usePagination(props.itemsPerPage)

//   const [selected, setSelected] = useState<any>()

//   return (
//     <div>
//       <div>
//         {page.map((value: any, index: number) => {
//           return (
//             <Component
//               key={index}
//               value={value}
//             />
//           )
//         })}
//       </div>
//       <div className='flex flex-row'>
//         <IconButton onClick={() => jump(1)} disabled={!canPrevious}>
//           <ChevronDoubleLeftIcon className='w-5 h-5' />
//         </IconButton>
//         <IconButton onClick={() => goPrevious()} disabled={!canPrevious}>
//           <ChevronLeftIcon className='w-5 h-5' />
//         </IconButton>
//         <IconButton onClick={() => goNext()} disabled={!canNext}>
//           <ChevronRightIcon className='w-5 h-5' />
//         </IconButton>
//         <IconButton onClick={() => jump(maxPage)} disabled={!canNext}>
//           <ChevronDoubleRightIcon className='w-5 h-5' />
//         </IconButton>
//       </div>
//       <div>
//         Page {currentPage} of {maxPage}
//       </div>
//     </div>
//   )
// }
