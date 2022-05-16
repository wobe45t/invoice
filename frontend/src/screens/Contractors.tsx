import { IProfile } from '../interfaces'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { deleteContractor } from '../actions/contractor'
import { PlusIcon, MailIcon, PhoneIcon } from '@heroicons/react/outline'
import { TrashIcon, PencilIcon } from '../components/styled/Icon'
import tw from 'twin.macro'
import { usePagination, PageIndicator } from '../components'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getContractors } from '../actions/contractor'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { PageHeader } from '../components/styled/Header'
import { SearchInput } from '../components/SearchInput'
import { Cell, HeaderCell } from '../components/styled/Table'
import { useTranslation } from 'react-i18next'

// const Cell = tw.td`border px-3 py-2`
// const HeaderCell = tw.th`border px-3 py-2`
const HiddenHeaderCell = tw(HeaderCell)`hidden md:table-cell`
const HiddenCell = tw(Cell)`hidden md:table-cell`

const Contractors = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { t } = useTranslation()

  const { data: contractors, isLoading } = useQuery(
    'contractors',
    getContractors
  )
  const { page, controls, search } = usePagination(5, contractors)

  const {
    mutate: deleteContractorMutate,
    isSuccess: deleteSuccess,
    isError: deleteError,
  } = useMutation((contractor_id: string) => deleteContractor(contractor_id), {
    onSuccess: () => {
      queryClient.invalidateQueries('contractors')
      toast.success(t('contractors.deleteSuccess'), { autoClose: 1000 })
    },
    onError: () => {
      toast.success(t('contractors.deleteError'), { autoClose: 1000 })
    },
  })

  return (
    <div className='container mx-auto'>
      <PageHeader>{t('contractors.pageHeader')}</PageHeader>
      <div className='w-full flex flex-col'>
        <Button
          onClick={() => {
            navigate('/add-contractor')
          }}
        >
          <PlusIcon className='w-5 h-5 mr-2' />
          <div>{t('contractors.add')}</div>
        </Button>

        <SearchInput
          label={t('contractors.search')}
          name='filter'
          value={search.filter}
          onChange={(e) => search.setFilter(e.target.value)}
        />
        <PageIndicator {...controls} />
        {/* medium screen > display table */}

        {isLoading ? (
          <h1 className='text-xl tracking-tighter font-thiner'>
            {t('loading')}
          </h1>
        ) : page.length === 0 ? (
          <h1 className='text-xl tracking-tighter font-thiner'>
            {t('contractors.notFound')}
          </h1>
        ) : (
          <table className='w-full hidden sm:table'>
            <thead className='bg-gray-100 '>
              <tr className='border'>
                <HeaderCell>{t('contractors.table.name')}</HeaderCell>
                <HeaderCell>{t('contractors.table.address')}</HeaderCell>
                <HiddenHeaderCell>
                  {t('contractors.table.info')}
                </HiddenHeaderCell>
                <HiddenHeaderCell>
                  {t('contractors.table.contact')}
                </HiddenHeaderCell>
                <th />
              </tr>
            </thead>
            <tbody>
              {page.map((contractor: IProfile, index: number) => (
                <tr key={index}>
                  <Cell>{contractor.entityName}</Cell>
                  <Cell>
                    <div className='flex flex-col items-center'>
                      <span>{contractor.street}</span>
                      <span>
                        {contractor.postalCode}, {contractor.city}
                      </span>
                    </div>
                  </Cell>
                  <HiddenCell>
                    <div className='flex flex-row gap-5'>
                      <div className='flex flex-col gap-1'>
                        <span>{t('contractors.nip')}</span>
                        <span>{t('contractors.bankNumber')}</span>
                        <span>{t('contractors.bankName')}</span>
                      </div>
                      <div className='flex flex-col gap-1'>
                        <span>{contractor.nip}</span>
                        <span>{contractor.bankAccountNumber}</span>
                        <span>{contractor.bankName}</span>
                      </div>
                    </div>
                  </HiddenCell>
                  <HiddenCell>
                    <div className='flex flex-col gap-1'>
                      <span>
                        <PhoneIcon className='w-5 h-5 mx-1 text-gray-600 inline-block' />
                        {contractor.phoneNumber}
                      </span>
                      <span>
                        <MailIcon className='w-5 h-5 mx-1 text-gray-600 inline-block' />{' '}
                        {contractor.email}
                      </span>
                    </div>
                  </HiddenCell>
                  <Cell>
                    <div className='flex flex-row gap-1'>
                      <PencilIcon
                        onClick={() =>
                          navigate('/add-contractor', { state: { contractor } })
                        }
                      />
                      <TrashIcon
                        onClick={() => deleteContractorMutate(contractor._id!)}
                      />
                    </div>
                  </Cell>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* small screen display cards */}
        <div className='sm:hidden w-full flex flex-col gap-2'>
          {page.map((contractor: IProfile, index: number) => (
            <div
              key={index}
              className='p-2 w-full border rounded-md flex flex-col gap-2 shadow even:bg-gray-100'
            >
              <div className='flex flex-col border-b-2'>
                <span className='tracking-tight font-thin'>
                  {t('contractors.entityName')}
                </span>
                <span>{contractor.entityName}</span>
              </div>
              <div className='flex flex-col border-b-2'>
                <span className='tracking-tight font-thin'>
                  {t('contractors.address')}
                </span>
                <span>
                  {contractor.street}, {contractor.postalCode} {contractor.city}
                </span>
              </div>
              <div className='flex flex-col border-b-2'>
                <span className='tracking-tight font-thin'>
                  {t('contractors.nip')}
                </span>
                <span>{contractor.nip}</span>
              </div>
              <div className='flex flex-col'>
                <span className='tracking-tight font-thin'>
                  {t('contractors.contact')}
                </span>
                <span>
                  <PhoneIcon className='w-5 h-5 mr-1 text-gray-600 inline-block' />
                  {contractor.phoneNumber}
                </span>
                <span>
                  <MailIcon className='w-5 h-5 mr-1 text-gray-600 inline-block' />{' '}
                  {contractor.email}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Contractors
