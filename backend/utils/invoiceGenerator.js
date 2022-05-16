const pdfMake = require('pdfmake/build/pdfmake')
const pdfFonts = require('pdfmake/build/vfs_fonts')
// import { save } from '@tauri-apps/api/dialog'
// import { invoke } from '@tauri-apps/api/tauri'
// import { homeDir } from '@tauri-apps/api/path'
// import {IInvoice, IInvoiceProduct} from '../interfaces'

pdfMake.vfs = pdfFonts.pdfMake.vfs

const fillColor = '#d0d2d6'

const format = (number) => {
  return Number(number).toLocaleString("pl-PL", {minimumFractionDigits: 2})
}

const partyHeader = (text) => {
  return [
    {
      text,
      fontSize: 15,
      fillColor,
      border: [false, false, false, true],
      alignment: 'center'
    },
  ]
}

const partyRow = (text) => {
  return [
    {
      text,
      fontSize: 12,
      border: [false, false, false, false],
    },
  ]
}

const productTableHeaders = () => {
  const headers = [
    'Nr.',
    'Name',
    'Quantity',
    'Net price',
    'Net value',
    'Tax',
    'Tax value',
    'Gross value',
  ]
  const tableHeader = (text) => {
    return {
      text,
      style: 'tableHeader',
      alignment: 'center',
      fillColor: '#d0d2d6',
    }
  }

  return [...headers.map((header) => tableHeader(header))]
}


const productTableRow = (id, product) => {
  const netValue = product.quantity * product.price
  const taxValue = netValue * product.tax
  return [
    {text: id, alignment: 'center'},
    {text: product.name, alignment: 'left'},
    {text: product.quantity, alignment: 'right'},
    {text: format(product.price.toFixed(2)), alignment: 'right'},
    {text: format(netValue.toFixed(2)), alignment: 'right'},
    {text: `${product.tax * 100}%`, alignment: 'right'},
    {text: format(taxValue.toFixed(2)), alignment: 'right'},
    {text: format((netValue + taxValue).toFixed(2)), alignment: 'right'},
  ]
}

const generatePdf = (invoice) => {
  const netValueSum = invoice.products
    .map((product) => product.quantity * product.price)
    .reduce((sum, product) => sum + product)
  const taxValueSum = invoice.products
    .map(
      (product) => product.quantity * product.price * Number(product.tax)
    )
    .reduce((sum, product) => sum + product)

  const grossValueSum = (netValueSum + taxValueSum)

  let docDefinition = {
    content: [
      {
        table: {
          widths: ['auto', 'auto'],
          headerRows: 0,
          body: [
            ['Issue place', invoice.issuePlace],
            ['Issue date', invoice.issueDate],
            ['Sell date', invoice.sellDate],
            ['Payment type', invoice.paymentType],
            ['Payment due', invoice.paymentDue],
          ],
        },
        layout: 'noBorders',
        style: {
          fontSize: 10,
          alignment: 'left',
        },
      },
      {
        style: 'tableExample',
        color: '#444',
        table: {
          widths: ['*', 200, '*'],
          headerRows: 0,
          body: [
            [
              {
                table: {
                  widths: ['*'],
                  headerRows: 1,
                  body: [
                    partyHeader('Buyer'),
                    partyRow(invoice.contractor.entityName),
                    partyRow(
                      invoice.contractor.name + ' ' + invoice.contractor.surname
                    ),
                    partyRow(invoice.contractor.nip),
                    partyRow(invoice.contractor.street),
                    partyRow(
                      invoice.contractor.postalCode +
                        ', ' +
                        invoice.contractor.city
                    ),
                    partyRow(invoice.contractor.phoneNumber),
                  ],
                },
              },
              '',
              {
                table: {
                  widths: ['*'],
                  headerRows: 1,
                  body: [
                    partyHeader('Seller'),
                    partyRow(invoice.profile.entityName),
                    partyRow(
                      invoice.profile.name + ' ' + invoice.profile.surname
                    ),
                    partyRow(invoice.profile.nip),
                    partyRow(invoice.profile.street),
                    partyRow(
                      invoice.profile.postalCode + ', ' + invoice.profile.city
                    ),
                    partyRow(invoice.profile.phoneNumber),
                  ],
                },
              },
            ],
          ],
        },
        layout: 'noBorders',
      },
      {
        text: invoice.name,
        style: { fontSize: 20, alignment: 'center', margin: [0, 20, 0, 0] },
      },
      {
        style: 'tableExample',
        color: '#444',
        table: {
          widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          headerRows: 1,
          body: [
            productTableHeaders(),
            ...invoice.products.map((product, index) =>
              productTableRow(index+1, product)
            ),
          ],
        },
      },
      { text: 'Summary', style: { alignment: 'right', margin: [0, 5, 0, 5] } },
      {
        style: 'summaryTable',
        color: '#444',
        table: {
          widths: ['*', 'auto', 'auto', 'auto'],
          headerRows: 1,
          body: [
            [
              { text: '', border: [false, false, false, false] },
              {
                text: 'Net value',
                style: 'tableHeader',
                alignment: 'center',
                fillColor: '#d0d2d6',
              },
              {
                text: 'Tax value',
                style: 'tableHeader',
                alignment: 'center',
                fillColor: '#d0d2d6',
              },
              {
                text: 'Gross value',
                style: 'tableHeader',
                alignment: 'center',
                fillColor: '#d0d2d6',
              },
            ],
            [
              { text: '', border: [false, false, false, false] },
              format(netValueSum.toFixed(2)),
              format(taxValueSum.toFixed(2)),
              format(grossValueSum.toFixed(2)),
            ],
          ],
        },
      },
      {
        table: {
          widths: ['auto', 'auto'],
          headerRows: 0,
          body: [
            ['Net value', format(netValueSum.toFixed(2)) + ' PLN'],
            ['TAX', format(taxValueSum.toFixed(2)) + ' PLN'],
            ['Gross value', format(grossValueSum.toFixed(2)) + ' PLN'],
          ],
        },
        layout: 'noBorders',
        style: {
          fontSize: 10,
          alignment: 'left',
        },
      },
      {
        style: 'signatureTable',
        color: '#444',
        table: {
          widths: ['*', 200, '*'],
          headerRows: 0,
          body: [
            [
              {
                table: {
                  widths: ['*'],
                  headerRows: 1,
                  body: [
                    [{ text: '', border: [false, false, false, true] }],
                    [
                      {
                        text: 'Seller signature',
                        fontSize: 6,
                        alignment: 'center',
                        border: [false, false, false, false],
                      },
                    ],
                  ],
                },
              },
              '',
              {
                table: {
                  widths: ['*'],
                  headerRows: 1,
                  body: [
                    [{ text: '', border: [false, false, false, true] }],
                    [
                      {
                        text: 'Buyer signature',
                        fontSize: 6,
                        alignment: 'center',
                        border: [false, false, false, false],
                      },
                    ],
                  ],
                },
              },
            ],
          ],
        },
        layout: 'noBorders',
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      signatureTable: {
        margin: [0, 50, 0, 10],
      },
      tableExample: {
        margin: [0, 10, 0, 15],
      },
      summaryTable: {
        margin: [0, 0, 0, 0],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black',
      },
    },
  }
  const pdf = pdfMake.createPdf(docDefinition)


  return pdf
}

const savePdf = async (invoice) => {
  const pdf = generatePdf(invoice)
  let blob
  pdf.getStream((b) => {
    blob = b
  })
  return blob 
}

module.exports = {
  savePdf,
  generatePdf
}