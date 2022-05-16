import { Suspense, lazy } from 'react'
import Debug from './screens/Debug'
import { createBrowserHistory } from 'history'
import {
  unstable_HistoryRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import './App.css'
import { Nav } from './components/Nav'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { UserProvider } from './context/userContext'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from './resources'

const withSuspense =
  (WrappedComponent: React.FunctionComponent, fallback: any) => (props: any) =>
    (
      <Suspense fallback={fallback}>
        <WrappedComponent {...props} />
      </Suspense>
    )

const HomeWithSuspense = withSuspense(
  lazy(() => import('./screens/Home')),
  <div>Loading...</div>
)
const AddProductWithSuspense = withSuspense(
  lazy(() => import('./screens/AddProduct')),
  <div>Loading...</div>
)
const ProductsWithSuspense = withSuspense(
  lazy(() => import('./screens/Products')),
  <div>Loading...</div>
)
const ContractorsWithSuspense = withSuspense(
  lazy(() => import('./screens/Contractors')),
  <div>Loading...</div>
)
const AddProfileWithSuspense = withSuspense(
  lazy(() => import('./screens/AddProfile')),
  <div>Loading...</div>
)
const CreateInvoiceWithSuspense = withSuspense(
  lazy(() => import('./screens/CreateInvoice')),
  <div>Loading...</div>
)
const ProfileWithSuspense = withSuspense(
  lazy(() => import('./screens/Profile')),
  <div>Loading...</div>
)
const SettingsWithSuspense = withSuspense(
  lazy(() => import('./screens/Settings')),
  <div>Loading...</div>
)
const InvoicesWithSuspense = withSuspense(
  lazy(() => import('./screens/Invoices')),
  <div>Loading...</div>
)
const AddContractorWithSuspense = withSuspense(
  lazy(() => import('./screens/AddContractor')),
  <div>Loading...</div>
)
const LoginWithSuspense = withSuspense(
  lazy(() => import('./screens/Login')),
  <div>Loading...</div>
)
const SignupWithSuspense = withSuspense(
  lazy(() => import('./screens/Signup')),
  <div>Loading...</div>
)

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources,
    lng: 'pl', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })

export const history = createBrowserHistory()
// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <> */}
      <UserProvider>
        <Router history={history}>
          <div className='flex flex-row'>
            <nav className='nav flex'>
              <Nav />
            </nav>
            <main className='main p-5 flex w-full h-screen overflow-y-auto'>
              <ToastContainer />
              <Routes>
                <Route path='/*'>
                  <Route index element={<HomeWithSuspense />} />
                  <Route path='login' element={<LoginWithSuspense />} />
                  <Route path='signup' element={<SignupWithSuspense />} />
                  <Route path='debug' element={<Debug />} />
                  <Route path='products' element={<ProductsWithSuspense />} />
                  <Route
                    path='add-product'
                    element={<AddProductWithSuspense />}
                  />
                  <Route path='profile' element={<ProfileWithSuspense />} />
                  <Route
                    path='add-profile'
                    element={<AddProfileWithSuspense />}
                  />
                  <Route
                    path='add-contractor'
                    element={<AddContractorWithSuspense />}
                  />
                  <Route path='settings' element={<SettingsWithSuspense />} />
                  <Route
                    path='contractors'
                    element={<ContractorsWithSuspense />}
                  />
                  <Route path='invoices' element={<InvoicesWithSuspense />} />
                  <Route
                    path='create-invoice'
                    element={<CreateInvoiceWithSuspense />}
                  />
                </Route>
              </Routes>
            </main>
          </div>
        </Router>

        <ReactQueryDevtools initialIsOpen={false} />
      </UserProvider>
    </QueryClientProvider>
    // </>
  )
}

export default App
