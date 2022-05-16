import { IInvoice } from '../interfaces'
import axios, { AxiosRequestConfig } from 'axios'

export const downloadInvoice = (invoice: IInvoice) => {
  const token = localStorage.getItem('token')?.replaceAll('"', '')
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: 'arraybuffer',
    responseEncoding: 'binary',
  }
  axios.get(`/api/invoices/${invoice._id}`, config).then((response) => {
    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    window.open(url)
  })
}

export const deleteInvoice = (invoice_id: string) => {
  const token = localStorage.getItem('token')?.replaceAll('"', '')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  return axios
    .delete(`/api/invoices/${invoice_id}`, config)
    .then((response) => response.data)
}

export const getInvoices = () => {
  const token = localStorage.getItem('token')?.replaceAll('"', '')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.get('/api/invoices', config).then((response) => response.data)
}

export const addInvoice = (invoiceData: IInvoice) => {
  const token = localStorage.getItem('token')?.replaceAll('"', '')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios
    .post('/api/invoices', invoiceData, config)
    .then((response) => response.data)
}

export const updateInvoice = (invoiceData: IInvoice) => {
  const token = localStorage.getItem('token')?.replaceAll('"', '')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios
    .put(`/api/invoices/${invoiceData._id}`, invoiceData, config)
    .then((response) => response.data)
}
