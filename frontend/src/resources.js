const address = {
  en: {
    street: 'Street',
    postalCode: 'Postal code',
    city: 'City',
  },
  pl: {
    street: 'Ulica',
    postalCode: 'Kod pocztowy',
    city: 'Miasto',
  },
}

const product = {
  en: {
    name: 'Name',
    tax: 'Tax',
    unit: 'Unit',
    price: 'Price',
  },
  pl: {
    name: 'Nazwa',
    tax: 'VAT',
    unit: 'Jednostka',
    price: 'Cena',
  },
}

const profile = {
  en: {
    name: 'Name',
    surname: 'Surname',
    entityName: 'Entity name',
    nip: 'NIP',
    ...address.en,
    phoneNumber: 'Phone number',
    email: 'Email',
    bankAccountNumber: 'Bank account number',
    bankName: 'Bank name',
  },
  pl: {
    name: 'Imię',
    surname: 'Nazwisko',
    entityName: 'Nazwa jednostki',
    nip: 'NIP',
    ...address.pl,
    phoneNumber: 'Numer tel.',
    email: 'Email',
    bankAccountNumber: 'Numer konta bankowego',
    bankName: 'Nazwa banku',
  },
}

export const resources = {
  en: {
    translation: {
      loading: 'Loading...',
      required: 'Field is required',
      pagination: {
        page: 'Page',
      },
      products: {
        header: 'Products',
        add: 'Add new product',
        search: 'Search products',
        alerts: {
          notFound: 'No products found',
          delete: {
            success: 'Product deleted',
            error: "Coulnt't delete product",
          },
        },
        table: {
          name: 'Name',
          tax: 'Tax',
          unit: 'Unit',
          price: 'Price',
        },
      },
      contractors: {
        header: 'Contractors',
        search: 'Search contractors',
        alerts: {
          delete: {
            success: 'Contractor deleted',
            error: "Couldn't delete contractor",
          },
          notFound: 'Contractors not found',
        },
        add: 'Add new contractor',
        nip: 'NIP',
        bankNumber: 'Bank account number',
        bankName: 'Bank name',
        entityName: 'Entity name',
        address: 'Address',
        contact: 'Contact',
        table: {
          name: 'Name',
          address: 'Address',
          contact: 'Contact',
          info: 'Info',
        },
      },
      invoices: {
        pageHeader: 'Invoices',
        search: 'Search invoices',
        notFound: 'Invoices not found',
        item: {
          name: 'Name',
          summary: 'Summary',
          dates: 'Dates',
          contractor: 'Contractor',
        },
      },
      nav: {
        expand: 'Expand',
        home: 'Home',
        createInvoice: 'Create invoice',
        contractors: 'Contractors',
        invoices: 'Invoices',
        products: 'Products',
        debug: 'Debug',
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Logout',
      },
      createInvoice: {
        step: 'Step',
        next: 'Next',
        previous: 'Previous',
        summary: {
          create: 'Create invoice',
          update: 'Update invocie',
        },
        pages: {
          general: {
            header: 'General information',
            fieldset: 'Invoice data',
            fields: {
              name: 'Name',
              paymentType: 'Payment type',
              paymentDue: 'Payment due',
              issuePlace: 'Issue place',
              issueDate: 'Issue date',
              sellDate: 'Sell date',
            },
          },
          contractor: {
            header: 'Contractor',
            fieldset: 'Contractor data',
            fields: profile.en,
            select: 'Select contractor from your collection',
          },
          products: {
            header: 'Products',
            add: 'Add product',
            prompt: 'Add products to the invoice',
            table: {
              name: 'Name',
              price: 'Price',
              quantity: 'Quantity',
              tax: 'Tax',
              unit: 'Unit',
              netSum: 'Net sum',
              summary: {
                netValue: 'Net value',
                grossValue: 'Gross value',
                taxValue: 'Tax value',
              },
            },
            alerts: {
              fillFields: 'Please fill all fields',
              noProductsAdded: 'Add products to continue',
            },
          },
          summary: {
            header: 'Summary',
            fields: {
              name: 'Name',
              nip: 'NIP',
              address: 'Address',
              contact: 'Contact',
            },
            update: 'Update invoice',
            add: 'Create invoice',
            fieldsets: {
              general: 'General data',
              profile: 'Profile',
              contractor: 'Contractor',
            },
          },
        },
      },
      contractorModal: {
        header: 'Choose contractor',
        search: 'Search contractors',
      },
      productModal: {
        header: 'Choose product',
        search: 'Search products',
        add: 'Add products here',
      },
      addContractor: {
        fields: profile.en,
        fieldsets: {
          contact: 'Contact',
          general: 'General',
          address: 'Address',
          bank: 'Bank',
        },
        header: {
          add: 'Add contractor',
          update: 'Update contracotr',
        },
        alerts: {
          add: {
            success: 'Contractor added',
            error: "Couldn't add contractor",
          },
          update: {
            success: 'Contractor updated',
            error: "Couldn't update contractor",
          },
        },
        errors: {
          nipLength: 'NIP length has to be equal to 10',
          nipDigit: 'NIP has to be digit only',
        },
      },
      addProduct: {
        fields: {
          ...product.en,
          unitOptions: {
            kg: 'kg.',
            szt: 'pcs.',
          },
        },
        fieldsets: {
          general: 'Product data',
        },
        header: {
          add: 'Add product',
          update: 'Update product',
        },
        alerts: {
          add: {
            success: 'Product added',
            error: "Couldn't add product",
          },
          update: {
            success: 'Product updated',
            error: "Couldn't update product",
          },
        },
      },
      signup: {
        header: 'Signup',
        alerts: {
          success: 'Account created',
        },
        fields: {
          email: 'Email',
          password: 'Password',
        },
        errors: {
          email: 'Please provide valid email',
        },
      },
      login: {
        header: 'Login',
        prompt: "Don't have an account? Signup!",
        alerts: {
          success: 'Logged in',
        },
        fields: {
          email: 'Email',
          password: 'Password',
        },
        errors: {
          email: 'Please provide valid email',
        },
      },
      profile: {
        header: 'Profile',
        update: 'Update profile',
        edit: {
          enable: 'Enable edit',
          disable: 'Disable edit',
        },
        alerts: {
          update: {
            success: 'Profile updated',
          },
        },
      },
    },
  },
  pl: {
    translation: {
      loading: 'Ładowanie...',
      required: 'Pole jest wymagane',
      pagination: {
        page: 'Strona',
      },
      products: {
        header: 'Produkty',
        add: 'Dodaj nowy produkt',
        search: 'Szukaj produktu',
        alerts: {
          notFound: 'Nie znaleziono produktów',
          delete: {
            success: 'Produkt usunięty',
            error: 'Usunięcie produktu nie powiodło się',
          },
        },
        table: {
          name: 'Nazwa',
          tax: 'VAT',
          unit: 'J.m.',
          price: 'Cena',
        },
      },
      contractors: {
        header: 'Kontahenci',
        search: 'Szukaj kontrahentów',
        alerts: {
          delete: {
            success: 'Kontrahent usunięty',
            error: 'Usunięcie kontrahenta nie powiodło się',
          },
          notFound: 'Nie znaleziono kontrahentów',
        },
        add: 'Dodaj nowego kontrahenta',
        nip: 'NIP',
        bankNumber: 'Numer konta bankowego',
        bankName: 'Nazwa banku',
        entityName: 'Nazwa jednostki',
        address: 'Adres',
        contact: 'Kontakt',
        table: {
          name: 'Nazwa',
          address: 'Adres',
          contact: 'Kontakt',
          info: 'Dodatkowe',
        },
      },
      invoices: {
        pageHeader: 'Faktury',
        search: 'Szukaj faktur',
        notFound: 'Nie znaleziono faktur',
        item: {
          name: 'Nazwa',
          summary: 'Podsumowanie',
          dates: 'Daty',
          contractor: 'Kontrahent',
        },
      },
      nav: {
        expand: 'Rozwiń',
        home: '',
        createInvoice: 'Stwórz fakturę',
        contractors: 'Kontrahenci',
        invoices: 'Faktury',
        products: 'Produkty',
        debug: 'Debug',
        profile: 'Profil',
        settings: 'Ustawienia',
        logout: 'Wyloguj',
      },
      createInvoice: {
        step: 'Krok',
        next: 'Kontynuuj',
        previous: 'Powrót',
        summary: {
          create: 'Stwórz fakturę',
          update: 'Aktualizuj fakturę',
        },
        pages: {
          general: {
            header: 'Informacje ogólne',
            fieldset: 'Dane faktury',
            fields: {
              name: 'Nazwa',
              paymentType: 'Rodzaj płatności',
              paymentDue: 'Termin zapłaty',
              issuePlace: 'Miejsce wystawienia',
              issueDate: 'Data wystawienia',
              sellDate: 'Data sprzedaży',
            },
          },
          contractor: {
            header: 'Kontrahent',
            fields: profile.pl,
            fieldset: 'Dane kontrahenta',
            select: 'Wybierz kontrahenta z listy zapisanych',
          },
          products: {
            header: 'Produkty',
            add: 'Dodaj produkt',
            prompt: 'Dodaj wpisy do faktury',
            table: {
              name: 'Nazwa',
              price: 'Cena',
              quantity: 'Ilość',
              tax: 'VAT',
              unit: 'J.m.',
              netSum: 'Suma netto',
              summary: {
                netValue: 'Wartość netto',
                grossValue: 'Wartość brutto',
                taxValue: 'Wartość VAT',
              },
            },
            alerts: {
              fillFields: 'Wszystkie pola muszą być wypełnione',
              noProductsAdded: 'Dodaj produkty aby kontynuować',
            },
          },
          summary: {
            header: 'Podsumowanie',
            fields: {
              name: 'Nazwa',
              nip: 'NIP',
              address: 'Adres',
              contact: 'Kontakt',
            },
            update: 'Aktualizuj fakturę',
            add: 'Dodaj fakturę',
            fieldsets: {
              general: 'Dane ogólne',
              profile: 'Profil',
              contractor: 'Kontrahent',
            },
          },
        },
      },
      contractorModal: {
        header: 'Wybierz kontrahenta',
        search: 'Szukaj kontrahenta',
      },
      productModal: {
        header: 'Wybierz produkt',
        search: 'Wyszukaj produkt',
        add: 'Dodaj produkty tutaj',
      },
      addContractor: {
        fields: profile.pl,
        fieldsets: {
          contact: 'Kontakt',
          general: 'Inforamcje ogólne',
          address: 'Adres',
          bank: 'Bank',
        },
        header: {
          add: 'Dodaj kontrahenta',
          update: 'Aktualizuj kontrahenta',
        },
        alerts: {
          add: {
            success: 'Dodano kontrahenta',
            error: 'Nie udało się dodać kontrahenta',
          },
          update: {
            success: 'Zaktualizowano kontrahenta',
            error: 'Nie udało się zaktualizować kontahenta',
          },
        },
        errors: {
          nipLength: 'Długość NIP musi być równa 10',
          nipDigit: 'NIP musi składać się tylko z cyfer',
        },
      },
      addProduct: {
        fields: {
          ...product.pl,
          unitOptions: {
            kg: 'kg.',
            szt: 'szt.',
          },
        },
        fieldsets: {
          general: 'Dane produktu',
        },
        header: {
          add: 'Dodaj produkt',
          update: 'Zaktualizowano produkt',
        },
        alerts: {
          add: {
            success: 'Dodano produkt',
            error: 'Nie udało się dodać produktu',
          },
          update: {
            success: 'Zaktualizowano produkt',
            error: 'Nie udało się zaktualizować produktu',
          },
        },
      },
      signup: {
        header: 'Rejestracja',
        alerts: {
          success: 'Konto utworzone',
        },
        fields: {
          email: 'Email',
          password: 'Hasło',
        },
        errors: {
          email: 'Email nie jest poprawny',
        },
      },
      login: {
        header: 'Logowanie',
        prompt: 'Nie masz konta? Zaloguj się',
        alerts: {
          success: 'Zalogowano',
        },
        fields: {
          email: 'Email',
          password: 'Hasło',
        },
        errors: {
          email: 'Email nie jest poprawny',
        },
      },
      profile: {
        header: 'Profil',
        update: 'Zaktualizuj profil',
        edit: {
          enable: 'Włącz edycje',
          disable: 'Wyłącz edycje',
        },
        alerts: {
          update: {
            success: 'Zaktualizowano profil',
          },
        },
      },
    },
  },
}
