import { IProduct } from '../interfaces'
import { useNavigate } from 'react-router'
import { Button, PageIndicator, usePagination } from '../components'
import { getProducts, deleteProduct } from '../actions/products'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { TrashIcon, PencilIcon } from '../components/styled/Icon'
import { PageHeader } from '../components/styled/Header'
import { PlusIcon } from '@heroicons/react/outline'
import { Cell, HeaderCell } from '../components/styled/Table'
import { SearchInput } from '../components/SearchInput'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const Products = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: products, isLoading } = useQuery('products', getProducts)
  const { page, controls, search } = usePagination(10, products)

  const { mutate } = useMutation(
    (product_id: string) => deleteProduct(product_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products')
        toast.success(t('products.alerts.delete.success'), { autoClose: 1000 })
      },
      onError: () => {
        toast.error(t('products.alerts.delete.error'), { autoClose: 1000 })
      },
    }
  )

  const { t } = useTranslation()

  return (
    <div className='container mx-auto'>
      <PageHeader>{t('products.header')}</PageHeader>
      <div className='flex flex-col gap-2'>
        <SearchInput
          label={t('products.search')}
          name='filter'
          value={search.filter}
          onChange={(e) => search.setFilter(e.target.value)}
        />
        <div className='flex flex-row justify-between w-full'>
          <PageIndicator {...controls} />
          <div className='h-3/5'>
            <Button onClick={() => navigate('/add-product')}>
              <PlusIcon className='w-5 h-5 mr-2' />
              <div>{t('products.add')}</div>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <h1 className='text-xl tracking-tighter font-thiner'>
            {t('loading')}
          </h1>
        ) : page.length === 0 ? (
          <h1 className='text-xl tracking-tighter font-thiner'>
            {t('products.alerts.notFound')}
          </h1>
        ) : (
          <table className='w-full'>
            <thead className='bg-gray-100'>
              <tr>
                <HeaderCell>{t('products.table.name')}</HeaderCell>
                <HeaderCell>{t('products.table.price')}</HeaderCell>
                <HeaderCell>{t('products.table.unit')}</HeaderCell>
                <HeaderCell>{t('products.table.tax')}</HeaderCell>
                <HeaderCell />
              </tr>
            </thead>
            <tbody>
              {page.map((product: IProduct, index: number) => (
                <tr key={index} className=''>
                  <Cell>{product.name}</Cell>
                  <Cell>{product.price}</Cell>
                  <Cell>{product.unit}</Cell>
                  <Cell>{product.tax}%</Cell>
                  <Cell className='w-1'>
                    <div className='ml-2 flex flex-row gap-2 justify-end'>
                      <PencilIcon
                        onClick={() => {
                          navigate('/add-product', { state: { product } })
                        }}
                      />
                      <TrashIcon onClick={() => mutate(product._id!)} />
                    </div>
                  </Cell>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
export default Products
