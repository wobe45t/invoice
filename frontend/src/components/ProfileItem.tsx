import {Box, Modal} from '../components'
import {IProfile} from '../interfaces'
import {useState} from 'react'
import {classNames} from '../utils'
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/outline'

export const ProfileItem = (props: {
  profile: IProfile
  onSelect?: () => void
  onDelete: () => void
  onEdit: () => void
}) => {
  const { profile } = props
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <Box className="w-4/5">
      <div
        className={classNames('flex flex-row border')}
      >
        <div
          onClick={props.onSelect}
          className='p-2 flex-grow flex-col hover:bg-slate-200/75 cursor-pointer transition'
        >
          <div className='tracking-wide text-lg font-semibold'>
            {profile.entityName}
          </div>
          <div className='tracking-tighter text-sm'>
            {profile.street}, {profile.postalCode} {profile.city}
          </div>
          <div>
            {profile.email}
          </div>
        </div>
        <div className='h-30 border-black border' />
        <div className='flex flex-col justify-between'>
          <div
            onClick={() => {
              setShowModal(true)
            }}
            className='p-2 pb-1 hover:bg-red-200/75 cursor-pointer transition'
          >
            <TrashIcon className='w-5 h-5' />
          </div>
          <div
            onClick={props.onEdit}
            className='p-2 pt-1 hover:bg-slate-200/75 cursor-pointer transition'
          >
            <PencilIcon className='w-5 h-5' />
          </div>
        </div>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          onConfirm={() => {
            props.onDelete()
          }}
        >
          Do you want to delete the profile and all associated data?
        </Modal>
      </div>
    </Box>
  )
}