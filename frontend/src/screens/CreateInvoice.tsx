import { useState, useContext, useCallback, useEffect } from 'react'
import { Button, MyModal as Modal, TextField } from '../components'
import { userAtom } from '../state/userState'
import { IInvoice, IInvoiceProduct } from '../interfaces'
import { useRecoilValue } from 'recoil'
import { useNavigate, useLocation } from 'react-router'
import '../styles/CreateInvoice.styles.css'
import { InputField } from '../components/InputField'
import { Fieldset } from '../components/Fieldset'
import { SubmitButton } from '../components/SubmitButton'
import tw from 'twin.macro'
import { useForm } from 'react-hook-form'
import { IProduct } from '../interfaces'
import { toast } from 'react-toastify'
import { useMutation, QueryCache, useQuery } from 'react-query'
import { getContractors } from '../actions/contractor'
import { getProducts } from '../actions/products'
import { addInvoice, updateInvoice } from '../actions/invoice'
import { HeaderCell, Cell } from '../components/styled/Table'
import { TrashIcon } from '../components/styled/Icon'
import { UserContext } from '../context/userContext'
import { ChooseContractorModal } from '../components/ChooseContractorModal'
import { ChooseProductModal } from '../components/ChooseProductModal'

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
          placeholder='price'
          name='price'
          value={price}
          onChange={onChange}
        />
      </Cell>

      <Cell data-label='Quantity'>
        <TextField
          placeholder='quantity'
          name='quantity'
          value={quantity}
          onChange={onChange}
        />
      </Cell>

      <Cell data-label='Tax'>
        <TextField
          placeholder='tax'
          name='tax'
          value={tax}
          onChange={onChange}
        />
      </Cell>

      <Cell data-label='Unit'>
        <TextField
          placeholder='unit'
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

  const {
    mutate: addInvoiceMutate,
    isSuccess: addSuccess,
    isError: addError,
  } = useMutation((invoiceData: IInvoice) => addInvoice(invoiceData))

  const {
    mutate: updateInvoiceMutate,
    isSuccess: updateSuccess,
    isError: updateError,
  } = useMutation((invoiceData: IInvoice) => updateInvoice(invoiceData))

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
    console.log('can Add ', canAdd)
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
      toast.warning('Product already added', { autoClose: 1000 })
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

  useEffect(() => {
    if (addSuccess) {
      toast.success('Invoice created', { autoClose: 1000 })
    }
    if (updateSuccess) {
      toast.success('Invoice updated', { autoClose: 1000 })
    }
    if (addSuccess || updateSuccess) {
      navigate('/invoices')
    }
  }, [addSuccess, updateSuccess, navigate])

  useEffect(() => {
    if (addError) {
      toast.error('Couldnt create invoice', { autoClose: 1000 })
    }
    if (updateError) {
      toast.error('Couldnt update invoice', { autoClose: 1000 })
    }
    if (addError || updateError) {
      navigate('/invoices')
    }
  }, [addError, updateError, navigate])

  const [page, setPage] = useState<number>(1)
  const [pageDescription, setPageDescription] = useState<string>('test')

  useEffect(() => {
    switch (page) {
      case 1:
        setPageDescription('Overall invoice data')
        break
      case 2:
        setPageDescription('Contractor')
        break
      case 3:
        setPageDescription('Products')
        break
      case 4:
        setPageDescription('Invoice summary')
        break
    }
  }, [page])

  return (
    <div className='container mx-auto'>
      <Button onClick={() => fillDebug()}>Fill debug</Button>
      <div className='w-full flex flex-col'>
        <div className='flex flex-col my-2'>
          <span className='text-2xl'>Step {page}</span>
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
            <Fieldset label='Invoice data'>
              <InputField
                label='Invoice name'
                {...registerInvoiceForm('name', {
                  required: 'Field is required',
                })}
                error={errorsInvoiceForm?.name}
              />
              <InputField
                label='Payment type'
                {...registerInvoiceForm('paymentType', {
                  required: 'Field is required',
                })}
                error={errorsInvoiceForm?.paymentType}
              />
              <InputField
                label='Payment due'
                type='date'
                {...registerInvoiceForm('paymentDue', {
                  required: 'Field is required',
                })}
                error={errorsInvoiceForm?.paymentDue}
              />
              <InputField
                label='Issue place'
                {...registerInvoiceForm('issuePlace', {
                  required: 'Field is required',
                })}
                error={errorsInvoiceForm?.issuePlace}
              />
              <InputField
                label='Issue date'
                type='date'
                {...registerInvoiceForm('issueDate', {
                  required: 'Field is required',
                })}
                error={errorsInvoiceForm?.issueDate}
              />
              <InputField
                label='Sell date'
                type='date'
                {...registerInvoiceForm('sellDate', {
                  required: 'Field is required',
                })}
                error={errorsInvoiceForm?.sellDate}
              />
              <ButtonWrapper>
                <SubmitButton>Next</SubmitButton>
              </ButtonWrapper>
            </Fieldset>
          </form>
        )}
        {/* PAGE 2 */}
        {page === 2 && (
          <form
            onSubmit={handleSubmitContractorForm((data) => {
              console.log('current submit: ', data)
              setInvoiceForm((prevState: any) => ({
                ...prevState,
                contractor: data,
              }))
              setPage(3)
            })}
          >
            <Fieldset label='Contractor'>
              <div className='flex flex-col md:flex-row gap-1 md:gap-5'>
                <div className='w-full'>
                  <InputField
                    label='Name'
                    {...registerContractorForm('name', {
                      required: 'Field is required',
                    })}
                    error={errorsContractorForm?.name}
                  />
                  <InputField
                    label='Surname'
                    {...registerContractorForm('surname', {
                      required: 'Field is required',
                    })}
                    error={errorsContractorForm?.surname}
                  />
                  <InputField
                    label='Entity name'
                    {...registerContractorForm('entityName', {
                      required: 'Field is required',
                    })}
                    error={errorsContractorForm?.entityName}
                  />
                  <InputField
                    label='NIP'
                    {...registerContractorForm('nip', {
                      required: 'Field is required',
                    })}
                    error={errorsContractorForm?.nip}
                  />
                </div>
                <div className='w-full'>
                  <InputField
                    label='Street'
                    {...registerContractorForm('street', {
                      required: 'Field is required',
                    })}
                    error={errorsContractorForm?.street}
                  />
                  <InputField
                    label='Postal code'
                    {...registerContractorForm('postalCode', {
                      required: 'Field is required',
                    })}
                    error={errorsContractorForm?.postalCode}
                  />
                  <InputField
                    label='City'
                    {...registerContractorForm('city', {
                      required: 'Field is required',
                    })}
                    error={errorsContractorForm?.city}
                  />
                  <InputField
                    label='Phone number'
                    {...registerContractorForm('phoneNumber', {
                      required: 'Field is required',
                    })}
                    error={errorsContractorForm?.phoneNumber}
                  />
                  <InputField
                    label='Email'
                    {...registerContractorForm('email', {
                      required: 'Field is required',
                    })}
                    error={errorsContractorForm?.email}
                  />
                  <InputField
                    label='Bank account number'
                    {...registerContractorForm('bankAccountNumber', {
                      required: 'Field is required',
                    })}
                    error={errorsContractorForm?.bankAccountNumber}
                  />
                  <InputField
                    label='Bank name'
                    {...registerContractorForm('bankName', {
                      required: 'Field is required',
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
                Select contractor
              </Span>
            </div>
            {getFieldStateContractorForm('name').isDirty && (
              <div className='block border border-slate-200 p-2'>
                <div className='flex flex-col'>
                  <span className='text-lg font-thin'>Contractor</span>
                  <span className='text-xl font-thiner'>
                    {/* {contractorData?.entityName} */}
                  </span>
                </div>
                <div
                  className='text-slate-400 cursor-pointer'
                  onClick={() => setEditContractor(!editContractor)}
                >
                  Edit contractor data
                </div>
              </div>
            )}

            <ButtonWrapper>
              <Button onClick={() => setPage(1)}>Previous</Button>
              <SubmitButton>Next</SubmitButton>
            </ButtonWrapper>
          </form>
        )}
        {/* PAGE 3  */}
        {page === 3 && (
          <>
            <div className='self-end my-2'>
              <Button onClick={handleAddProduct}>Add product</Button>
            </div>

            {invoiceProducts.length === 0 ? (
              <div
                className='my-3 text-blue-900 text-xl text-center'
                onClick={() => {}}
              >
                Add products to your invoice
              </div>
            ) : (
              <>
                {/* BIG SCREEN */}
                <table className='hidden md:table rounded-md'>
                  <thead className='rounded-md'>
                    <tr>
                      <HeaderCell>Name</HeaderCell>
                      <HeaderCell>Price</HeaderCell>
                      <HeaderCell>Quantity</HeaderCell>
                      <HeaderCell>Tax</HeaderCell>
                      <HeaderCell>Unit</HeaderCell>
                      <HeaderCell>Net sum</HeaderCell>
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
                <div className='flex flex-col gap-2 md:hidden'>
                  {invoiceProducts.map((product: IProduct) => (
                    <div key={product._id}>{product.name}</div>
                  ))}
                </div>

                <div className='flex flex-col w-1/5 self-end border p-2 my-2 border-slate-200'>
                  <div className='flex flex-row justify-between'>
                    <div>Net value</div>
                    <div>{invoiceSummary.netSum.toFixed(2)} PLN</div>
                  </div>
                  <div className='flex flex-row justify-between'>
                    <div>Gross value</div>
                    <div>{invoiceSummary.grossSum.toFixed(2)} PLN</div>
                  </div>
                  <div className='flex flex-row justify-between'>
                    <div>Tax value</div>
                    <div>{invoiceSummary.taxSum.toFixed(2)} PLN</div>
                  </div>
                </div>
              </>
            )}
            <ButtonWrapper>
              <Button onClick={() => setPage(2)}>Previous</Button>
              <Button
                onClick={() => {
                  const invalid = invoiceProducts.some(
                    (product: IInvoiceProduct) => {
                      return Object.values(product).includes('')
                    }
                  )
                  console.log(invalid)
                  if (!invalid) {
                    setInvoiceForm((prevState: any) => ({
                      ...prevState,
                      products: invoiceProducts,
                    }))
                    setPage(4)
                  } else {
                    toast.warning('Each field must be filled')
                  }
                }}
              >
                Next
              </Button>
            </ButtonWrapper>
          </>
        )}
        {/* PAGE 4 SUMMARY */}
        {page === 4 && (
          <>
            <div className='grid grid-cols-2 gap-2 my-2'>
              <div className='border rounded-md'>
                <div className='bg-gray-100 p-1'>Invoice data</div>
                <div className='p-2 flex flex-row gap-5 '>
                  <div className='flex flex-col'>
                    <Span>Name:</Span>
                    <Span>Issue date:</Span>
                    <Span>Sell date:</Span>
                    <Span>Issue place:</Span>
                    <Span>Payment due:</Span>
                    <Span>Payment type:</Span>
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
                <div className='bg-gray-100 p-1'>Contractor</div>
                <div className='p-2 flex flex-row gap-5 '>
                  <div className='flex flex-col'>
                    <Span>Name</Span>
                    <Span>NIP</Span>
                    <Span>Address</Span>
                    <Span>Contact</Span>
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
                <div className='bg-gray-100 p-1'>Profile</div>
                <div className='p-2 flex flex-row gap-5 '>
                  <div className='flex flex-col'>
                    <Span>Name</Span>
                    <Span>NIP</Span>
                    <Span>Address</Span>
                    <Span>Contact</Span>
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
                <table className='hidden md:table rounded-md'>
                  <thead className='rounded-md bg-gray-100'>
                    <tr>
                      <HeaderCell>Name</HeaderCell>
                      <HeaderCell>Price</HeaderCell>
                      <HeaderCell>Quantity</HeaderCell>
                      <HeaderCell>Tax</HeaderCell>
                      <HeaderCell>Unit</HeaderCell>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceProducts.map((product: any, index: number) => (
                      <tr>
                        <Cell>{product.name}</Cell>
                        <Cell>{product.price}</Cell>
                        <Cell>{product.quantity}</Cell>
                        <Cell>{product.unit}</Cell>
                        <Cell>{product.tax}</Cell>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* SMALL SCREEN */}
                <div className='flex flex-col gap-2 md:hidden'>
                  {invoiceProducts.map((product: IProduct) => (
                    <div>{product.name}</div>
                  ))}
                </div>

                <div className='flex flex-col w-1/5 self-end border p-2 my-2 border-slate-200'>
                  <div className='flex flex-row justify-between'>
                    <div>Net value</div>
                    <div>{invoiceSummary.netSum.toFixed(2)} PLN</div>
                  </div>
                  <div className='flex flex-row justify-between'>
                    <div>Gross value</div>
                    <div>{invoiceSummary.grossSum.toFixed(2)} PLN</div>
                  </div>
                  <div className='flex flex-row justify-between'>
                    <div>Tax value</div>
                    <div>{invoiceSummary.taxSum.toFixed(2)} PLN</div>
                  </div>
                </div>
              </>
            )}
            <ButtonWrapper>
              <Button onClick={() => setPage(3)}>Previous</Button>
              <Button onClick={handleSubmitInvoice}>
                {edit ? 'Update invoice' : 'Create invoice'}
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
