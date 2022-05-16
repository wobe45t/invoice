export {}
// import pdfMake from 'pdfmake/build/pdfmake'
// import pdfFonts from 'pdfmake/build/vfs_fonts'
// import {IInvoice, IInvoiceProduct} from '../interfaces'

// // pdfMake.vfs = pdfFonts.pdfMake.vfs

// const fillColor = '#d0d2d6'


// const partyHeader = (text: string) => {
//   return [
//     {
//       text,
//       fontSize: 15,
//       fillColor,
//       border: [false, false, false, true],
//     },
//   ]
// }

// const partyRow = (text: string) => {
//   return [
//     {
//       text,
//       fontSize: 12,
//       border: [false, false, false, false],
//     },
//   ]
// }

// const productTableHeaders = () => {
//   const headers: string[] = [
//     'Nr.',
//     'Name',
//     'Amount',
//     'Net price',
//     'Net value',
//     'Tax',
//     'Tax value',
//     'Gross value',
//   ]
//   const tableHeader = (text: string) => {
//     return {
//       text,
//       style: 'tableHeader',
//       alignment: 'center',
//       fillColor: '#d0d2d6',
//     }
//   }

//   return [...headers.map((header: string) => tableHeader(header))]
// }

// const productTableRow = (id: number, product: IInvoiceProduct) => {
//   const netValue = product.amount * product.price
//   const taxValue = netValue * product.tax
//   return [
//     id,
//     product.name,
//     product.amount,
//     product.price.toFixed(2),
//     netValue.toFixed(2),
//     product.tax.toFixed(2),
//     taxValue.toFixed(2),
//     (netValue + taxValue).toFixed(2),
//   ]
// }

// const generatePdf = (invoice: IInvoice) => {
//   const netValueSum = invoice.products
//     .map((product: IInvoiceProduct) => product.amount * product.price)
//     .reduce((sum, product) => sum + product)
//   const taxValueSum = invoice.products
//     .map(
//       (product: IInvoiceProduct) => product.amount * product.price * product.tax
//     )
//     .reduce((sum, product) => sum + product)
//   const grossValueSum = (netValueSum + taxValueSum)

//   let docDefinition: any = {
//     content: [
//       {
//         table: {
//           widths: ['auto', 'auto'],
//           headerRows: 0,
//           body: [
//             ['Issue place', invoice.issuePlace],
//             ['Issue date', invoice.issueDate],
//             ['Sell date', invoice.sellDate],
//             ['Payment type', invoice.paymentType],
//             ['Payment due', invoice.paymentDue],
//           ],
//         },
//         layout: 'noBorders',
//         style: {
//           fontSize: 10,
//           alignment: 'left',
//         },
//       },
//       {
//         style: 'tableExample',
//         color: '#444',
//         table: {
//           widths: ['*', 200, '*'],
//           headerRows: 0,
//           body: [
//             [
//               {
//                 table: {
//                   widths: ['*'],
//                   headerRows: 1,
//                   body: [
//                     partyHeader('Buyer'),
//                     partyRow(invoice.contractor.entityName),
//                     partyRow(
//                       invoice.contractor.name + ' ' + invoice.contractor.surname
//                     ),
//                     partyRow(invoice.contractor.nip),
//                     partyRow(invoice.contractor.street),
//                     partyRow(
//                       invoice.contractor.postalCode +
//                         ', ' +
//                         invoice.contractor.city
//                     ),
//                     partyRow(invoice.contractor.phoneNumber),
//                   ],
//                 },
//               },
//               '',
//               {
//                 table: {
//                   widths: ['*'],
//                   headerRows: 1,
//                   body: [
//                     partyHeader('Seller'),
//                     partyRow(invoice.profile.entityName),
//                     partyRow(
//                       invoice.profile.name + ' ' + invoice.profile.surname
//                     ),
//                     partyRow(invoice.profile.nip),
//                     partyRow(invoice.profile.street),
//                     partyRow(
//                       invoice.profile.postalCode + ', ' + invoice.profile.city
//                     ),
//                     partyRow(invoice.profile.phoneNumber),
//                   ],
//                 },
//               },
//             ],
//           ],
//         },
//         layout: 'noBorders',
//       },
//       {
//         text: 'Invoice number xxdfksfjsd',
//         style: { fontSize: 20, alignment: 'center', margin: [0, 20, 0, 0] },
//       },
//       'Invoice entries:',
//       {
//         style: 'tableExample',
//         color: '#444',
//         table: {
//           widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
//           headerRows: 1,
//           body: [
//             productTableHeaders(),
//             ...invoice.products.map((product: IInvoiceProduct, index: number) =>
//               productTableRow(index, product)
//             ),
//           ],
//         },
//       },
//       { text: 'Summary', style: { alignment: 'right', margin: [0, 0, 0, 5] } },
//       {
//         style: 'summaryTable',
//         color: '#444',
//         table: {
//           widths: ['*', 'auto', 'auto', 'auto'],
//           headerRows: 1,
//           body: [
//             [
//               { text: '', border: [false, false, false, false] },
//               {
//                 text: 'Net value',
//                 style: 'tableHeader',
//                 alignment: 'center',
//                 fillColor: '#d0d2d6',
//               },
//               {
//                 text: 'Tax value',
//                 style: 'tableHeader',
//                 alignment: 'center',
//                 fillColor: '#d0d2d6',
//               },
//               {
//                 text: 'Gross value',
//                 style: 'tableHeader',
//                 alignment: 'center',
//                 fillColor: '#d0d2d6',
//               },
//             ],
//             [
//               { text: '', border: [false, false, false, false] },
//               netValueSum.toFixed(2),
//               taxValueSum.toFixed(2),
//               grossValueSum.toFixed(2),
//             ],
//           ],
//         },
//       },
//       {
//         table: {
//           widths: ['auto', 'auto'],
//           headerRows: 0,
//           body: [
//             ['Net value', netValueSum.toFixed(2) + ' PLN'],
//             ['TAX', taxValueSum.toFixed(2) + ' PLN'],
//             ['Gross value', grossValueSum.toFixed(2) + ' PLN'],
//           ],
//         },
//         layout: 'noBorders',
//         style: {
//           fontSize: 10,
//           alignment: 'left',
//         },
//       },
//       {
//         style: 'signatureTable',
//         color: '#444',
//         table: {
//           widths: ['*', 200, '*'],
//           headerRows: 0,
//           body: [
//             [
//               {
//                 table: {
//                   widths: ['*'],
//                   headerRows: 1,
//                   body: [
//                     [{ text: '', border: [false, false, false, true] }],
//                     [
//                       {
//                         text: 'Seller signature',
//                         fontSize: 6,
//                         alignment: 'center',
//                         border: [false, false, false, false],
//                       },
//                     ],
//                   ],
//                 },
//               },
//               '',
//               {
//                 table: {
//                   widths: ['*'],
//                   headerRows: 1,
//                   body: [
//                     [{ text: '', border: [false, false, false, true] }],
//                     [
//                       {
//                         text: 'Buyer signature',
//                         fontSize: 6,
//                         alignment: 'center',
//                         border: [false, false, false, false],
//                       },
//                     ],
//                   ],
//                 },
//               },
//             ],
//           ],
//         },
//         layout: 'noBorders',
//       },
//     ],
//     styles: {
//       header: {
//         fontSize: 18,
//         bold: true,
//         margin: [0, 0, 0, 10],
//       },
//       subheader: {
//         fontSize: 16,
//         bold: true,
//         margin: [0, 10, 0, 5],
//       },
//       signatureTable: {
//         margin: [0, 50, 0, 10],
//       },
//       tableExample: {
//         margin: [0, 10, 0, 15],
//       },
//       summaryTable: {
//         margin: [0, 0, 0, 0],
//       },
//       tableHeader: {
//         bold: true,
//         fontSize: 13,
//         color: 'black',
//       },
//     },
//   }
//   const pdf = pdfMake.createPdf(docDefinition)
//   return pdf
// }

// export const savePdf = async (invoice: IInvoice) => {
//   const pdf = generatePdf(invoice)
//   const home = await homeDir()
//   const path = await save({ title: 'test.pdf', defaultPath: home })
//   pdf.getBuffer((buffer) => {
//     const data = buffer.toJSON().data
//     invoke('write_pdf', { path, buffer: data })
//   })
// }
