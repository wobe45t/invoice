import { useState } from 'react'
import { MyModal as Modal } from '../components'
import { useQuery } from 'react-query'
import { getProducts } from '../actions/products'
import { SearchInput } from '../components/SearchInput'
import { usePagination, PageIndicator } from './pagination'
import { IProduct } from '../interfaces'
import { useNavigate } from 'react-router'
import { PageHeader } from '../components/styled/Header'
import { Cell, HeaderCell } from '../components/styled/Table'

interface Props {
  show: boolean
  setShow: (arg0: boolean) => void
  onSelect: Function
}
export const ChooseProductModal = (props: Props) => {
  const { show, setShow, onSelect } = props
  const { data: products } = useQuery('products', getProducts)
  const { search, controls, page } = usePagination(5, products)
  const navigate = useNavigate()

  return (
    <Modal show={show} setShow={setShow}>
      <PageHeader>Choose product</PageHeader>
      <SearchInput
        label='Search product'
        value={search.filter}
        name='filter'
        onChange={(e) => search.setFilter(e.target.value)}
      />
      <div className='my-2 flex flex-col gap-2'>
        {page.length === 0 ? (
          <>
            <h1 className='tracking-tighter font-ligth text-lg'>
              Products not found.{' '}
              <span
                className='text-blue-900 cursor-pointer'
                onClick={() => navigate('/add-product')}
              >
                Add products here
              </span>
            </h1>
          </>
        ) : (
          <table className='w-full'>
            <thead>
              <tr>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Price</HeaderCell>
                <HeaderCell>Unit</HeaderCell>
                <HeaderCell>Tax</HeaderCell>
              </tr>
            </thead>
            <tbody>
              {page.map((product: IProduct, index: number) => (
                <tr
                  onClick={() => onSelect(product)}
                  key={index}
                  className='cursor-pointer hover:bg-gray-100'
                >
                  <Cell>{product.name}</Cell>
                  <Cell>{product.price}</Cell>
                  <Cell>{product.unit}</Cell>
                  <Cell>{product.tax}</Cell>
                </tr>
              ))}
            </tbody>
          </table>
          // page?.map((product: any) => (
          //   <Product key={product._id} product={product} onSelect={onSelect} />
          // ))
        )}
      </div>
      {page.length !== 0 && <PageIndicator {...controls} />}
    </Modal>
  )
}

const Product = (props: { product: IProduct; onSelect: Function }) => {
  const { product, onSelect } = props
  return (
    <div
      onClick={() => onSelect(product)}
      className='p-2 w-full border rounded-md flex flex-col gap-2 shadow transition cursor-pointer even:bg-gray-100 hover:bg-slate-100'
    >
      <div className='flex flex-row gap-5'>
        <div className='flex flex-col gap-2'>
          <span>Name</span>
          <span>Price</span>
          <span>tax</span>
          <span>unit</span>
        </div>
        <div className='flex flex-col gap-2'>
          <span>{product.name}</span>
          <span>{product.price}</span>
          <span>{product.tax}</span>
          <span>{product.unit}</span>
        </div>
      </div>
    </div>
  )
}
