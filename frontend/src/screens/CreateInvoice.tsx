import { useState, useContext, useCallback, useEffect } from 'react'
import { Button, MyModal as Modal, TextField } from '../components'
import { IInvoice, IInvoiceProduct } from '../interfaces'
import { useNavigate, useLocation } from 'react-router'
import '../styles/CreateInvoice.styles.css'
import { InputField } from '../components/InputField'
import { Fieldset } from '../components/Fieldset'
import { SubmitButton } from '../components/SubmitButton'
import tw from 'twin.macro'
import { useForm } from 'react-hook-form'
import { IProduct } from '../interfaces'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'
import { addInvoice, updateInvoice } from '../actions/invoice'
import { HeaderCell, Cell } from '../components/styled/Table'
import { TrashIcon } from '../components/styled/Icon'
import { UserContext } from '../context/userContext'
import { ChooseContractorModal } from '../components/ChooseContractorModal'
import { ChooseProductModal } from '../components/ChooseProductModal'
import { useTranslation } from 'react-i18next'
import { table } from 'console'

const Span = tw.span`tracking-tight font-light`

const ProductRow = (props: any) => {
  const {
    product,
    index,
    onChange: onChangeProduct,
    onDelete: onDeleteProduct,
  } = props

  const [productData, setProductData] = useState({
    price: product.price,
    quantity: product.quantity || '',
    tax: product.tax,
    unit: product.unit,
  })
  const { t } = useTranslation()
  const { price, quantity, tax, unit } = productData

  const onChange = (e: any) => {
    setProductData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

    onChangeProduct(index, e.target.name, e.target.value)
  }

  return (
    <tr>
      <Cell data-label='Name'>{product.name}</Cell>
      <Cell data-label='Price'>
        <TextField
          placeholder={t('createInvoice.pages.products.table.name')}
          name='price'
          value={price}
          onChange={onChange}
        />
      </Cell>

      <Cell data-label='Quantity'>
        <TextField
          placeholder={t('createInvoice.pages.products.table.quantity')}
          name='quantity'
          value={quantity}
          onChange={onChange}
        />
      </Cell>

      <Cell data-label='Tax'>
        <TextField
          placeholder={t('createInvoice.products.table.tax')}
          name='tax'
          value={tax}
          onChange={onChange}
        />
      </Cell>

      <Cell data-label='Unit'>
        <TextField
          placeholder={t('createInvoice.products.table.unit')}
          name='unit'
          value={unit}
          onChange={onChange}
        />
      </Cell>
      <Cell data-label='Net sum'>
        {(Number(quantity) * Number(price)).toFixed(2)}
      </Cell>
      <Cell>
        <TrashIcon onClick={() => onDeleteProduct(product._id)} />
      </Cell>
    </tr>
  )
}

interface IState {
  invoice: IInvoice
}

const CreateInvoice = () => {
  const navigate = useNavigate()
  const state: IState = useLocation().state as IState
  const { user } = useContext(UserContext)
  const [invoiceProducts, setInvoiceProducts] = useState<IInvoiceProduct[]>([])
  const [showContractorModal, setShowContractorModal] = useState<boolean>(false)
  const [showProductModal, setShowProductModal] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)

  const { t } = useTranslation()

  const { mutate: addInvoiceMutate } = useMutation(
    (invoiceData: IInvoice) => addInvoice(invoiceData),
    {
      onSuccess: () => {
        toast.success(t('add.success'), { autoClose: 1000 })
        navigate('/invoices')
      },
      onError: () => {
        toast.error(t('add.error'), { autoClose: 1000 })
      },
    }
  )

  const { mutate: updateInvoiceMutate } = useMutation(
    (invoiceData: IInvoice) => updateInvoice(invoiceData),
    {
      onSuccess: () => {
        toast.success(t('update.success'), { autoClose: 1000 })
        navigate('/invoices')
      },
      onError: () => {
        toast.error('update.error', { autoClose: 1000 })
      },
    }
  )

  const {
    register: registerInvoiceForm,
    handleSubmit: handleSubmitInvoiceForm,
    setValue: setValueInvoiceForm,
    getFieldState: getFieldStateInvoiceForm,
    formState: { errors: errorsInvoiceForm },
  } = useForm()

  const {
    register: registerContractorForm,
    handleSubmit: handleSubmitContractorForm,
    setValue: setValueContractorForm,
    getFieldState: getFieldStateContractorForm,
    formState: { errors: errorsContractorForm },
  } = useForm()

  const [invoiceSummary, setInvoiceSummary] = useState({
    netSum: 0,
    grossSum: 0,
    taxSum: 0,
  })

  const onChangeProduct = useCallback(
    (index: number, name: string, value: string) => {
      if (name === 'quantity') {
        let grossSum = 0
        let netSum = 0
        let val = value === '' ? '0' : value
        invoiceProducts.forEach((product: any) => {
          if (parseFloat(val) !== 0) {
            let grossValue = parseFloat(product.price) * parseFloat(val)
            grossSum += grossValue
            let netValue = grossValue - parseFloat(product.tax) * grossValue
            netSum += netValue
          }
        })
        setInvoiceSummary({
          netSum,
          grossSum,
          taxSum: grossSum - netSum,
        })
      }
      let product = {
        ...invoiceProducts[index],
        [name]: value,
      }
      let newProducts = invoiceProducts
      newProducts[index] = product
      setInvoiceProducts(newProducts)
    },
    [invoiceProducts]
  )

  const onDeleteProduct = useCallback(
    (id: string) => {
      setInvoiceProducts(
        invoiceProducts.filter((product: IProduct) => product._id !== id)
      )
    },
    [invoiceProducts]
  )

  const [invoiceForm, setInvoiceForm] = useState<any>({})

  const onClickContractorHandler = (contractor: any) => {
    Object.entries(contractor).forEach(([name, value]: any) =>
      setValueContractorForm(name, value)
    )
    setShowContractorModal(false)
  }

  const onClickProductHandler = (product: IProduct) => {
    const canAdd = invoiceProducts
      .map((product: IProduct) => product._id)
      .includes(product._id)
    if (!canAdd) {
      setInvoiceProducts((prevState) => [
        ...prevState,
        {
          ...product,
          quantity: '',
        },
      ])
      setShowProductModal(false)
    } else {
      toast.warning(t('createInvoice.addProductError'), { autoClose: 1000 })
    }
  }

  const fillDebug = () => {
    setValueInvoiceForm('name', 'invoice')
    setValueInvoiceForm('issuePlace', 'Zamch')
    setValueInvoiceForm('issueDate', '2022-02-02')
    setValueInvoiceForm('sellDate', '2022-02-02')
    setValueInvoiceForm('paymentType', 'bank transfer')
    setValueInvoiceForm('paymentDue', '2022-02-02')
  }
  const handleSubmitInvoice = () => {
    const invoice = {
      ...invoiceForm,
      profile: user.profile,
    }
    let valid = true
    invoiceProducts.forEach((product) => {
      if (parseInt(product.quantity) === 0) {
        valid = false
      }
    })
    if (!valid) return
    edit ? updateInvoiceMutate(invoice) : addInvoiceMutate(invoice)
  }

  const [editContractor, setEditContractor] = useState(false)

  const handleAddContractor = () => {
    setShowContractorModal(true)
  }

  const handleAddProduct = () => {
    setShowProductModal(true)
  }

  useEffect(() => {
    if (state?.invoice) {
      setEdit(true)
      Object.entries(state.invoice).forEach(([name, value]: any) => {
        if (typeof value !== 'object') {
          setValueInvoiceForm(name, value)
        }
      })
      Object.entries(state.invoice.contractor).forEach(([name, value]: any) => {
        setValueContractorForm(name, value)
      })
      setInvoiceProducts(state.invoice.products)
    }
  }, [state])

  const [page, setPage] = useState<number>(1)
  const [pageDescription, setPageDescription] = useState<string>('test')

  useEffect(() => {
    switch (page) {
      case 1:
        setPageDescription(t('createInvoice.pages.general.header'))
        break
      case 2:
        setPageDescription(t('createInvoice.pages.contractor.header'))
        break
      case 3:
        setPageDescription(t('createInvoice.pages.products.header'))
        break
      case 4:
        setPageDescription(t('createInvoice.pages.summary.header'))
        break
    }
  }, [page, t])

  return (
    <div className='container mx-auto'>
      <div className='w-full flex flex-col'>
        <div className='flex flex-col my-2'>
          <span className='text-2xl'>
            {t('createInvoice.step')} {page}
          </span>
          <span className='text-2xl font-thin'>{pageDescription}</span>
          <div className='border-2 border-gray-500' />
        </div>
        {/* PAGE 1 */}
        {page === 1 && (
          <form
            onSubmit={handleSubmitInvoiceForm((data) => {
              setInvoiceForm((prevState: any) => ({ ...prevState, ...data }))
              setPage(2)
            })}
          >
            <Fieldset label={t('createInvoice.pages.general.fieldset')}>
              <InputField
                label={t('createInvoice.pages.general.fields.name')}
                {...registerInvoiceForm('name', {
                  required: t('required'),
                })}
                error={errorsInvoiceForm?.name}
              />
              <InputField
                label={t('createInvoice.pages.general.fields.paymentType')}
                {...registerInvoiceForm('paymentType', {
                  required: t('required'),
                })}
                error={errorsInvoiceForm?.paymentType}
              />
              <InputField
                label={t('createInvoice.pages.general.fields.paymentDue')}
                type='date'
                {...registerInvoiceForm('paymentDue', {
                  required: t('required'),
                })}
                error={errorsInvoiceForm?.paymentDue}
              />
              <InputField
                label={t('createInvoice.pages.general.fields.issuePlace')}
                {...registerInvoiceForm('issuePlace', {
                  required: t('required'),
                })}
                error={errorsInvoiceForm?.issuePlace}
              />
              <InputField
                label={t('createInvoice.pages.general.fields.issueDate')}
                type='date'
                {...registerInvoiceForm('issueDate', {
                  required: t('required'),
                })}
                error={errorsInvoiceForm?.issueDate}
              />
              <InputField
                label={t('createInvoice.pages.general.fields.sellDate')}
                type='date'
                {...registerInvoiceForm('sellDate', {
                  required: t('required'),
                })}
                error={errorsInvoiceForm?.sellDate}
              />
              <ButtonWrapper>
                <SubmitButton>{t('createInvoice.next')}</SubmitButton>
              </ButtonWrapper>
            </Fieldset>
          </form>
        )}
        {/* PAGE 2 */}
        {page === 2 && (
          <form
            onSubmit={handleSubmitContractorForm((data) => {
              setInvoiceForm((prevState: any) => ({
                ...prevState,
                contractor: data,
              }))
              setPage(3)
            })}
          >
            <Fieldset label={t('createInvoice.pages.contractor.fieldset')}>
              <div className='flex flex-col md:flex-row gap-1 md:gap-5'>
                <div className='w-full'>
                  <InputField
                    label={t('createInvoice.pages.contractor.fields.name')}
                    {...registerContractorForm('name', {
                      required: t('required'),
                    })}
                    error={errorsContractorForm?.name}
                  />
                  <InputField
                    label={t('createInvoice.pages.contractor.fields.surname')}
                    {...registerContractorForm('surname', {
                      required: t('required'),
                    })}
                    error={errorsContractorForm?.surname}
                  />
                  <InputField
                    label={t(
                      'createInvoice.pages.contractor.fields.entityName'
                    )}
                    {...registerContractorForm('entityName', {
                      required: t('required'),
                    })}
                    error={errorsContractorForm?.entityName}
                  />
                  <InputField
                    label={t('createInvoice.pages.contractor.fields.nip')}
                    {...registerContractorForm('nip', {
                      required: t('required'),
                    })}
                    error={errorsContractorForm?.nip}
                  />
                </div>
                <div className='w-full'>
                  <InputField
                    label={t('createInvoice.pages.contractor.fields.street')}
                    {...registerContractorForm('street', {
                      required: t('required'),
                    })}
                    error={errorsContractorForm?.street}
                  />
                  <InputField
                    label={t(
                      'createInvoice.pages.contractor.fields.postalCode'
                    )}
                    {...registerContractorForm('postalCode', {
                      required: t('required'),
                    })}
                    error={errorsContractorForm?.postalCode}
                  />
                  <InputField
                    label={t('createInvoice.pages.contractor.fields.city')}
                    {...registerContractorForm('city', {
                      required: t('required'),
                    })}
                    error={errorsContractorForm?.city}
                  />
                  <InputField
                    label={t(
                      'createInvoice.pages.contractor.fields.phoneNumber'
                    )}
                    {...registerContractorForm('phoneNumber', {
                      required: t('required'),
                    })}
                    error={errorsContractorForm?.phoneNumber}
                  />
                  <InputField
                    label={t('createInvoice.pages.contractor.fields.email')}
                    {...registerContractorForm('email', {
                      required: t('required'),
                    })}
                    error={errorsContractorForm?.email}
                  />
                  <InputField
                    label={t(
                      'createInvoice.pages.contractor.fields.bankAccountNumber'
                    )}
                    {...registerContractorForm('bankAccountNumber', {
                      required: t('required'),
                    })}
                    error={errorsContractorForm?.bankAccountNumber}
                  />
                  <InputField
                    label={t('createInvoice.pages.contractor.fields.bankName')}
                    {...registerContractorForm('bankName', {
                      required: t('required'),
                    })}
                    error={errorsContractorForm?.bankName}
                  />
                </div>
              </div>
            </Fieldset>
            <div className='w-64 my-2'>
              <Span
                className='font-light text-xl cursor-pointer text-blue-900 hover:text-blue-700'
                onClick={handleAddContractor}
              >
                {t('createInvoice.pages.contractor.select')}
              </Span>
            </div>
            <ButtonWrapper>
              <Button onClick={() => setPage(1)}>
                {t('createInvoice.previous')}
              </Button>
              <SubmitButton>{t('createInvoice.next')}</SubmitButton>
            </ButtonWrapper>
          </form>
        )}
        {/* PAGE 3  */}
        {page === 3 && (
          <>
            <div className='self-end my-2'>
              <Button onClick={handleAddProduct}>
                {t('createInvoice.pages.products.add')}
              </Button>
            </div>

            {invoiceProducts.length === 0 ? (
              <div
                className='my-3 text-blue-900 text-xl text-center'
                onClick={() => {}}
              >
                {t('createInvoice.pages.products.prompt')}
              </div>
            ) : (
              <>
                {/* BIG SCREEN */}
                <table className='rounded-md'>
                  <thead className='rounded-md'>
                    <tr>
                      <HeaderCell>
                        {t('createInvoice.pages.products.table.name')}
                      </HeaderCell>
                      <HeaderCell>
                        {t('createInvoice.pages.products.table.price')}
                      </HeaderCell>
                      <HeaderCell>
                        {t('createInvoice.pages.products.table.quantity')}
                      </HeaderCell>
                      <HeaderCell>
                        {t('createInvoice.pages.products.table.tax')}
                      </HeaderCell>
                      <HeaderCell>
                        {t('createInvoice.pages.products.table.unit')}
                      </HeaderCell>
                      <HeaderCell>
                        {t('createInvoice.pages.products.table.netSum')}
                      </HeaderCell>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceProducts.map((product: any, index: number) => (
                      <ProductRow
                        key={product._id + index}
                        index={index}
                        onChange={onChangeProduct}
                        onDelete={onDeleteProduct}
                        product={product}
                      />
                    ))}
                  </tbody>
                </table>
                {/* SMALL SCREEN */}
                {/* <div className='flex flex-col gap-2 md:hidden'>
                  {invoiceProducts.map((product: IProduct) => (
                    <div key={product._id}>{product.name}</div>
                  ))}
                </div> */}

                <div className='flex flex-col self-end border p-2 my-2 border-slate-200'>
                  <div className='flex flex-row gap-3 justify-between'>
                    <div>
                      {t('createInvoice.pages.products.table.summary.netValue')}
                    </div>
                    <div>{invoiceSummary.netSum.toFixed(2)} PLN</div>
                  </div>
                  <div className='flex flex-row gap-3 justify-between'>
                    <div>
                      {t(
                        'createInvoice.pages.products.table.summary.grossValue'
                      )}
                    </div>
                    <div>{invoiceSummary.grossSum.toFixed(2)} PLN</div>
                  </div>
                  <div className='flex flex-row gap-3 justify-between'>
                    <div>
                      {t('createInvoice.pages.products.table.summary.taxValue')}
                    </div>
                    <div>{invoiceSummary.taxSum.toFixed(2)} PLN</div>
                  </div>
                </div>
              </>
            )}
            <ButtonWrapper>
              <Button onClick={() => setPage(2)}>
                {t('createInvoice.previous')}
              </Button>
              <Button
                onClick={() => {
                  if (invoiceProducts.length === 0) {
                    toast.warning(
                      t('createInvoice.pages.products.alerts.noProductsAdded'),
                      { autoClose: 1000 }
                    )
                    return
                  }
                  if (
                    invoiceProducts.some((product: IInvoiceProduct) => {
                      return Object.values(product).includes('')
                    })
                  ) {
                    toast.warning(
                      t('createInvoice.pages.products.alerts.fillFields'),
                      { autoClose: 1000 }
                    )
                    return
                  }

                  setInvoiceForm((prevState: any) => ({
                    ...prevState,
                    products: invoiceProducts,
                  }))
                  setPage(4)
                }}
              >
                {t('createInvoice.next')}
              </Button>
            </ButtonWrapper>
          </>
        )}
        {/* PAGE 4 SUMMARY */}
        {page === 4 && (
          <>
            <div className='grid grid-cols-2 gap-2 my-2'>
              <div className='border rounded-md'>
                <div className='bg-gray-100 p-1'>
                  {t('createInvoice.pages.summary.fieldsets.general')}
                </div>
                <div className='p-2 flex flex-row gap-5 '>
                  <div className='flex flex-col'>
                    <Span>{t('createInvoice.pages.general.fields.name')}</Span>
                    <Span>
                      {t('createInvoice.pages.general.fields.issueDate')}
                    </Span>
                    <Span>
                      {t('createInvoice.pages.general.fields.sellDate')}
                    </Span>
                    <Span>
                      {t('createInvoice.pages.general.fields.issuePlace')}
                    </Span>
                    <Span>
                      {t('createInvoice.pages.general.fields.paymentDue')}
                    </Span>
                    <Span>
                      {t('createInvoice.pages.general.fields.paymentType')}
                    </Span>
                  </div>
                  <div className='flex flex-col'>
                    <Span>{invoiceForm.name}</Span>
                    <Span>{invoiceForm.issueDate}</Span>
                    <Span>{invoiceForm.sellDate}</Span>
                    <Span>{invoiceForm.issuePlace}</Span>
                    <Span>{invoiceForm.paymentDue}</Span>
                    <Span>{invoiceForm.paymentType}</Span>
                  </div>
                </div>
              </div>
              <div className='border rounded-md'>
                <div className='bg-gray-100 p-1'>
                  {t('createInvoice.pages.summary.fieldsets.contractor')}
                </div>
                <div className='p-2 flex flex-row gap-5 '>
                  <div className='flex flex-col'>
                    <Span>{t('createInvoice.pages.summary.fields.name')}</Span>
                    <Span>{t('createInvoice.pages.summary.fields.nip')}</Span>
                    <Span>
                      {t('createInvoice.pages.summary.fields.address')}
                    </Span>
                    <Span>
                      {t('createInvoice.pages.summary.fields.contact')}
                    </Span>
                  </div>
                  <div className='flex flex-col'>
                    <Span>{invoiceForm.contractor.entityName}</Span>
                    <Span>{invoiceForm.contractor.nip}</Span>
                    <Span>
                      {invoiceForm.contractor.street},{' '}
                      {invoiceForm.contractor.postalCode}{' '}
                      {invoiceForm.contractor.city}
                    </Span>
                    <Span>
                      {invoiceForm.contractor.phoneNumber},{' '}
                      {invoiceForm.contractor.email}
                    </Span>
                  </div>
                </div>
              </div>
              <div className='border rounded-md'>
                <div className='bg-gray-100 p-1'>
                  {t('createInvoice.pages.summary.fieldsets.profile')}
                </div>
                <div className='p-2 flex flex-row gap-5 '>
                  <div className='flex flex-col'>
                    <Span>{t('createInvoice.pages.summary.fields.name')}</Span>
                    <Span>{t('createInvoice.pages.summary.fields.nip')}</Span>
                    <Span>
                      {t('createInvoice.pages.summary.fields.address')}
                    </Span>
                    <Span>
                      {t('createInvoice.pages.summary.fields.contact')}
                    </Span>
                  </div>
                  <div className='flex flex-col'>
                    <Span>{user.profile?.entityName}</Span>
                    <Span>{user.profile?.nip}</Span>
                    <Span>
                      {user.profile?.street}, {user.profile?.postalCode}{' '}
                      {user.profile?.city}
                    </Span>
                    <Span>
                      {user.profile?.phoneNumber}, {user.profile?.email}
                    </Span>
                  </div>
                </div>
              </div>
            </div>
            {invoiceProducts.length !== 0 && (
              <>
                {/* BIG SCREEN */}
                <table className='rounded-md'>
                  <thead className='rounded-md bg-gray-100'>
                    <tr>
                      <HeaderCell>
                        {t('createInvoice.pages.products.table.name')}
                      </HeaderCell>
                      <HeaderCell>
                        {t('createInvoice.pages.products.table.price')}
                      </HeaderCell>
                      <HeaderCell>
                        {t('createInvoice.pages.products.table.quantity')}
                      </HeaderCell>
                      <HeaderCell>
                        {t('createInvoice.pages.products.table.unit')}
                      </HeaderCell>
                      <HeaderCell>
                        {t('createInvoice.pages.products.table.tax')}
                      </HeaderCell>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceProducts.map((product: any, index: number) => (
                      <tr>
                        <Cell>{product.name}</Cell>
                        <Cell>{product.price}</Cell>
                        <Cell>{product.quantity}</Cell>
                        <Cell>{product.unit}</Cell>
                        <Cell>{product.tax * 100}%</Cell>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className='flex flex-col self-end border p-2 my-2 border-slate-200'>
                  <div className='flex flex-row gap-3 justify-between'>
                    <div>
                      {t('createInvoice.pages.products.table.summary.netValue')}
                    </div>
                    <div>{invoiceSummary.netSum.toFixed(2)} PLN</div>
                  </div>
                  <div className='flex flex-row gap-3 justify-between'>
                    <div>
                      {t(
                        'createInvoice.pages.products.table.summary.grossValue'
                      )}
                    </div>
                    <div>{invoiceSummary.grossSum.toFixed(2)} PLN</div>
                  </div>
                  <div className='flex flex-row gap-3 justify-between'>
                    <div>
                      {t('createInvoice.pages.products.table.summary.taxValue')}
                    </div>
                    <div>{invoiceSummary.taxSum.toFixed(2)} PLN</div>
                  </div>
                </div>
              </>
            )}
            <ButtonWrapper>
              <Button onClick={() => setPage(3)}>
                {t('createInvoice.previous')}
              </Button>
              <Button onClick={handleSubmitInvoice}>
                {edit
                  ? t('createInvoice.pages.summary.update')
                  : t('createInvoice.pages.summary.add')}
              </Button>
            </ButtonWrapper>
          </>
        )}
        <ChooseContractorModal
          show={showContractorModal}
          setShow={setShowContractorModal}
          onSelect={onClickContractorHandler}
        />

        {/* product modal */}
        <ChooseProductModal
          show={showProductModal}
          setShow={setShowProductModal}
          onSelect={onClickProductHandler}
        />
      </div>
    </div>
  )
}

const ButtonWrapper = (props: { children: any }) => {
  return (
    <div className='my-2 w-full flex justify-center'>
      <div className='w-1/3 flex flex-row gap-2 justify-around'>
        {props.children}
      </div>
    </div>
  )
}
export default CreateInvoice
