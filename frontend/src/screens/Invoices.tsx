import { IInvoice } from '../interfaces'
import { useNavigate } from 'react-router'
import { usePagination, PageIndicator } from '../components'
import { getInvoices, deleteInvoice } from '../actions/invoice'
import { useQuery, useMutation } from 'react-query'
import { TrashIcon, DownloadIcon, PencilIcon } from '../components/styled/Icon'
import { PageHeader } from '../components/styled/Header'
import { downloadInvoice } from '../actions/invoice'
import { SearchInput } from '../components/SearchInput'
import {
  DocumentTextIcon,
  CalendarIcon,
  UserIcon,
  DocumentReportIcon,
} from '@heroicons/react/outline'
import tw from 'twin.macro'
import { useTranslation } from 'react-i18next'

const Invoices = () => {
  const navigate = useNavigate()

  const { t } = useTranslation()
  const { mutate } = useMutation((invoice_id: string) =>
    deleteInvoice(invoice_id)
  )

  const { data: invoices, isLoading } = useQuery('invoices', getInvoices)
  const { page, controls, search } = usePagination(10, invoices)

  return (
    <div className='container mx-auto'>
      <PageHeader>{t('invoices.pageHeader')}</PageHeader>
      <SearchInput
        label={t('invoices.search')}
        name='filter'
        value={search.filter}
        onChange={(e) => search.setFilter(e.target.value)}
      />
      <PageIndicator {...controls} />
      <div className='my-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-3 font-light'>
        {isLoading ? (
          <h1 className='text-xl tracking-tighter font-thiner'>
            {t('loading')}
          </h1>
        ) : page.length === 0 ? (
          <h1 className='text-xl tracking-tighter font-thiner'>
            {t('invoices.notFound')}
          </h1>
        ) : (
          page.map((invoice: IInvoice) => (
            <div
              key={invoice._id}
              className='p-2 w-full border rounded-md flex flex-col gap-2 shadow even:bg-gray-100'
            >
              <div className='flex flex-col border-b-2'>
                <FieldDescription>
                  <DocumentTextIcon className='w-5 h-5 text-gray-600 inline-block' />
                  {t('invoices.item.name')}
                </FieldDescription>
                <div className='text-xl'>{invoice.name}</div>
              </div>
              <div className='flex flex-col border-b-2'>
                <FieldDescription>
                  <UserIcon className='w-5 h-5 text-gray-600 inline-block' />
                  {t('invoices.item.contractor')}
                </FieldDescription>
                <span>{invoice.contractor.entityName}</span>
                <span>
                  {invoice.contractor.street}, {invoice.contractor.postalCode}{' '}
                  {invoice.contractor.city}
                </span>
              </div>
              <div className='flex flex-col border-b-2'>
                <FieldDescription>
                  <DocumentReportIcon className='w-5 h-5 text-gray-600 inline-block' />
                  {t('invoices.item.summary')}
                </FieldDescription>
                <span>Invoice entries: Z</span>
                <span>Net value: X</span>
                <span>Gross value: Y</span>
              </div>
              <div className='flex flex-col'>
                <FieldDescription>
                  <CalendarIcon className='w-5 h-5 text-gray-600 inline-block' />
                  {t('invoices.item.dates')}
                </FieldDescription>
                <span>Issue date: {invoice.issueDate}</span>
                <span>Payment due: {invoice.paymentDue}</span>
              </div>
              <div className='flex flex-row gap-2 self-end'>
                <DownloadIcon onClick={() => downloadInvoice(invoice)} />
                <PencilIcon
                  onClick={() => {
                    navigate('/create-invoice', { state: { invoice } })
                  }}
                />
                <TrashIcon onClick={() => mutate(invoice._id!)} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const FieldDescription = tw.div`flex flex-row items-center tracking-tight font-light`

export default Invoices
