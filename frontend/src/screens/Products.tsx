import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import { IProduct } from '../interfaces'
import { useNavigate } from 'react-router'
import { Button, PageIndicator, usePagination } from '../components'
import { getProducts, deleteProduct } from '../actions/products'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { TrashIcon, PencilIcon } from '../components/styled/Icon'
import { PageHeader } from '../components/styled/Header'
import { SearchIcon } from '@heroicons/react/outline'
import tw from 'twin.macro'
import { Cell, HeaderCell } from '../components/styled/Table'
import { SearchInput } from '../components/SearchInput'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const Products = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: products, isLoading } = useQuery('products', getProducts)
  const { page, controls, search } = usePagination(10, products)

  const { mutate } = useMutation(
    (product_id: string) => deleteProduct(product_id),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('products')
        toast.success(t('products.productDeleted'), { autoClose: 1000 }) //TODO could return object from DB and log the name
      },
    }
  )

  const { t } = useTranslation()

  return (
    <div className='container mx-auto'>
      <PageHeader>{t('products.products')}</PageHeader>
      <div className='flex flex-col gap-2'>
        <Button onClick={() => navigate('/add-product')}>
          {t('products.addNewProduct')}
        </Button>
        <SearchInput
          label={t('products.searchProducts')}
          name='filter'
          value={search.filter}
          onChange={(e) => search.setFilter(e.target.value)}
        />
        <PageIndicator {...controls} />

        {isLoading ? (
          <h1 className='text-xl tracking-tighter font-thiner'>
            {t('products.loading')}
          </h1>
        ) : page.length === 0 ? (
          <h1 className='text-xl tracking-tighter font-thiner'>
            {t('products.noProductsFound')}
          </h1>
        ) : (
          <table className='w-full'>
            <thead>
              <tr>
                <HeaderCell>{t('products.productsTable.name')}</HeaderCell>
                <HeaderCell>{t('products.productsTable.price')}</HeaderCell>
                <HeaderCell>{t('products.productsTable.unit')}</HeaderCell>
                <HeaderCell>{t('products.productsTable.tax')}</HeaderCell>
              </tr>
            </thead>
            <tbody>
              {page.map((product: IProduct, index: number) => (
                <tr key={index} className=''>
                  <Cell>{product.name}</Cell>
                  <Cell>{product.price}</Cell>
                  <Cell>{product.unit}</Cell>
                  <Cell>{product.tax}</Cell>
                  <td className='w-1'>
                    <div className='ml-2 flex flex-row gap-2 justify-end'>
                      <PencilIcon
                        onClick={() => {
                          navigate('/add-product', { state: { product } })
                        }}
                      />
                      <TrashIcon onClick={() => mutate(product._id!)} />
                    </div>
                  </td>
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
