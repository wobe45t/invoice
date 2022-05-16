import tw from 'twin.macro'
import {
  TrashIcon as TrashIconExt,
  PencilIcon as PencilIconExt,
  DocumentIcon as DocumentIconExt,
  DownloadIcon as DownloadIconExt,
} from '@heroicons/react/outline'

const IconWrapper = tw.div`p-2 border duration-300 cursor-pointer rounded-md`
const TrashIconWrapper = tw(IconWrapper)`transition-property[] hover:bg-red-500`
const PencilIconWrapper = tw(
  IconWrapper
)`transition-property[] hover:bg-yellow-500`
const DownloadIconWrapper = tw(
  IconWrapper
)`transition-property[] hover:bg-green-500`

export const TrashIcon = (props: { onClick: () => void }) => {
  const { onClick } = props
  return (
    <TrashIconWrapper onClick={onClick}>
      <TrashIconExt className='w-5 h-5' />
    </TrashIconWrapper>
  )
}

export const PencilIcon = (props: { onClick: () => void }) => {
  const { onClick } = props
  return (
    <PencilIconWrapper onClick={onClick}>
      <PencilIconExt className='w-5 h-5' />
    </PencilIconWrapper>
  )
}

// export const DocumentIcon = (props: {onClick: () => void}) => {
//   const {onClick} = props
//   return (
//     <DocumentIconWrapper onClick={onClick}>
//       <DocumentIconExt className='w-5 h-5' />
//     </DocumentIconWrapper>
//   )
// }

export const DownloadIcon = (props: { onClick: () => void }) => {
  const { onClick } = props
  return (
    <DownloadIconWrapper onClick={onClick}>
      <DownloadIconExt className='w-5 h-5' />
    </DownloadIconWrapper>
  )
}
