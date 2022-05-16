import { useState } from 'react'
import { MyModal as Modal } from '../components'
import { useQuery } from 'react-query'
import { getContractors } from '../actions/contractor'
import { SearchInput } from '../components/SearchInput'
import {usePagination, PageIndicator} from './pagination'
import {PageHeader} from '../components/styled/Header'

interface Props {
  show: boolean
  setShow: (arg0: boolean) => void
  onSelect: Function
}
export const ChooseContractorModal = (props: Props) => {
  const { show, setShow, onSelect } = props
  const { data: contractors } = useQuery('contractors', getContractors)
  const {search, controls, page} = usePagination(5, contractors)


  return (
    <Modal show={show} setShow={setShow}>
      <PageHeader>Choose contractor</PageHeader>
      <SearchInput
        label='Search contarctor'
        value={search.filter}
        name='filter'
        onChange={(e) => search.setFilter(e.target.value)}
      />
      <div className='my-2 flex flex-col gap-2'>
        {page?.map((contractor: any) => (
          <Contractor
            key={contractor._id}
            contractor={contractor}
            onClick={onSelect}
          />
        ))}
      </div>
      <PageIndicator {...controls} />
    </Modal>
  )
}

const Contractor = (props: any) => {
  const { contractor, onClick } = props
  return (
    <div
      className='border p-2 shadow-md rounded-md transition duration-200 hover:bg-slate-200'
      onClick={() => onClick(contractor)}
    >
      <div className='tracking-wide uppercase'>{contractor.entityName}</div>
      <div className='font-light text-md text-slate-600 tracking-wide'>
        {contractor.street}, {contractor.postalCode} {contractor.city}
      </div>
      <div className='font-light text-md text-slate-600 tracking-wide'>
        NIP: {contractor.nip}
      </div>
    </div>
  )
}

