import { useState, useEffect } from 'react'
import { IProduct } from '../interfaces'
import { useNavigate, useLocation } from 'react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { InputField, SelectField, Option } from '../components/InputField'
import { SubmitButton } from '../components/SubmitButton'
import { Fieldset } from '../components/Fieldset'
import { useMutation } from 'react-query'
import { updateProduct, addProduct } from '../actions/products'
import { PageHeader } from '../components/styled/Header'
import { useTranslation } from 'react-i18next'

interface IState {
  product: IProduct
}

const AddProduct = () => {
  const navigate = useNavigate()
  const state: IState = useLocation().state as IState
  const [edit, setEdit] = useState<boolean>(false)
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProduct>()

  const { mutate: addProductMutate } = useMutation(
    (productData: IProduct) => addProduct(productData),
    {
      onSuccess: () => {
        toast.success(t('addProduct.alerts.add.success'), { autoClose: 1000 })
        navigate('/products')
      },
      onError: () => {
        toast.error(t('addProduct.alerts.add.error'), { autoClose: 1000 })
      },
    }
  )

  const { mutate: updateProductMutate } = useMutation(
    (productData: IProduct) => updateProduct(productData),
    {
      onSuccess: () => {
        toast.success(t('addProduct.alerts.update.success'), {
          autoClose: 1000,
        })
        navigate('/products')
      },
      onError: () => {
        toast.error(t('addProduct.alerts.update.error'), { autoClose: 1000 })
      },
    }
  )

  useEffect(() => {
    if (state?.product) {
      setEdit(true)
      Object.entries(state.product).forEach(([name, value]: any) =>
        setValue(name, value)
      )
    }
  }, [state, setValue])

  const handleSubmitForm = (productData: IProduct) =>
    edit ? updateProductMutate(productData) : addProductMutate(productData)

  return (
    <div className='container mx-auto'>
      <PageHeader>
        {edit ? t('addProduct.header.update') : t('addProduct.header.add')}
      </PageHeader>
      <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
        <Fieldset label={t('addProduct.fieldsets.general')}>
          <div className='flex flex-col gap-2'>
            <InputField
              label={t('addProduct.fields.name')}
              {...register('name', { required: t('required') })}
              error={errors?.name}
            />
            <InputField
              label={t('addProduct.fields.price')}
              {...register('price', {
                required: t('required'),
                valueAsNumber: true,
              })}
              error={errors?.price}
            />
            <InputField
              label={t('addProduct.fields.tax')}
              {...register('tax', {
                required: t('required'),
              })}
              error={errors?.tax}
            />
            <SelectField
              label={t('addProduct.fields.unit')}
              {...register('unit')}
            >
              <Option value='kg'>
                {t('addProduct.fields.unitOptions.kg')}
              </Option>
              <Option value='szt'>
                {t('addProduct.fields.unitOptions.szt')}
              </Option>
            </SelectField>
            <SubmitButton>
              {edit
                ? t('addProduct.header.update')
                : t('addProduct.header.add')}
            </SubmitButton>
          </div>
        </Fieldset>
      </form>
    </div>
  )
}
export default AddProduct
