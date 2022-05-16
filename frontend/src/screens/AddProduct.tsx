import { useState, useEffect } from 'react'
import { IProduct } from '../interfaces'
import { useNavigate, useLocation } from 'react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { InputField, SelectField, Option } from '../components/InputField'
import { SubmitButton } from '../components/SubmitButton'
import { Fieldset } from '../components/Fieldset'
import { useMutation, useQueryClient } from 'react-query'
import { updateProduct, addProduct } from '../actions/products'
import { PageHeader } from '../components/styled/Header'

interface IState {
  product: IProduct
}

const AddProduct = () => {
  const navigate = useNavigate()
  const state: IState = useLocation().state as IState
  const [edit, setEdit] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProduct>()
  const queryClient = useQueryClient()

  const {
    mutate: addProductMutate,
    isSuccess: addSuccess,
    isError: addError,
  } = useMutation((productData: IProduct) => addProduct(productData), {
    onSuccess: () => {
      // queryClient.invalidateQueries('products')
    },
  })

  const {
    mutate: updateProductMutate,
    isSuccess: updateSuccess,
    isError: updateError,
  } = useMutation((productData: IProduct) => updateProduct(productData), {
    onSuccess: () => {
      // queryClient.invalidateQueries('products')
    },
  })

  useEffect(() => {
    if (state?.product) {
      setEdit(true)
      Object.entries(state.product).forEach(([name, value]: any) =>
        setValue(name, value)
      )
    }
  }, [state])

  const handleSubmitForm = (productData: IProduct) =>
    edit ? updateProductMutate(productData) : addProductMutate(productData)

  useEffect(() => {
    if (addSuccess) {
      toast.success('Product added', { autoClose: 1000 })
    }
    if (updateSuccess) {
      toast.success('Product updated', { autoClose: 1000 })
    }
    if (addSuccess || updateSuccess) {
      navigate('/products')
    }
  }, [addSuccess, updateSuccess, navigate])

  useEffect(() => {
    if (addError || updateError) {
      toast.error('Invalid data', { autoClose: 1000 })
    }
  }, [addError, updateError])

  const fillDebug = () => {
    setValue('name', `Porzeczka ${~~Math.random() * 10}`)
    setValue('price', `2.30`)
    setValue('unit', 'kg')
    setValue('tax', '0.23')
  }

  return (
    <div className='container mx-auto'>
      <PageHeader>{edit ? 'Update product' : 'Add product'}</PageHeader>
      <button className='border rounded-md' onClick={fillDebug}>
        Fill debug
      </button>
      <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
        <Fieldset label='Product data'>
          <div className='flex flex-col gap-2'>
            <InputField
              label='Name'
              {...register('name', { required: 'Field is required' })}
              error={errors?.name}
            />
            <InputField
              label='Price'
              {...register('price', {
                required: 'Field is required',
                valueAsNumber: true,
                // pattern: {
                //   value: /^[+-]?([0-9]*[.,])?[0-9]+$/,
                //   message: 'Please enter a valid number',
                // },
              })}
              error={errors?.price}
            />
            <InputField
              label='Tax'
              // lang={navigator.language}
              // pattern='[0-9]+([,][0-9]{1,2})?'
              {...register('tax', {
                required: 'Field is required',
                // valueAsNumber: true,
                // setValueAs: (v) => {
                //   v = Number(v.replace(/\,/, "."))
                //   return v
                // }
              })}
              error={errors?.tax}
            />
            <SelectField label='Unit' {...register('unit')}>
              <Option value='kg'>kg.</Option>
              <Option value='szt'>szt.</Option>
            </SelectField>
            <SubmitButton>{edit ? 'Edit product' : 'Add product'}</SubmitButton>
          </div>
        </Fieldset>
      </form>
    </div>
  )
}
export default AddProduct
