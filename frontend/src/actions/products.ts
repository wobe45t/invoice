import { useState } from 'react'
import { userAtom } from '../state/userState'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import axios, { AxiosResponse } from 'axios'
import { IProduct } from '../interfaces'
import { productsAtom } from '../state/productState'

export const useGetProducts = () => {
  const user = useRecoilValue(userAtom)
  const setProducts = useSetRecoilState(productsAtom)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const getProducts = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    setLoading(true)
    axios
      .get('/api/products', config)
      .then((response: AxiosResponse) => {
        setSuccess(true)
        setProducts(response.data)
        return response.data as IProduct[]
      })
      .catch((error) => {
        setError(error)
        setSuccess(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    loading,
    success,
    error,
    getProducts,
  }
}

export const useAddProduct = () => {
  const user = useRecoilValue(userAtom)
  const setProducts = useSetRecoilState(productsAtom)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const addProduct = async (productData: IProduct) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    setLoading(true)
    axios
      .post('/api/products', productData, config)
      .then((response: AxiosResponse) => {
        setProducts((prevState) => [...prevState, response.data])
        setSuccess(true)
        return response.data
      })
      .catch((error) => {
        setError(error)
        setSuccess(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    loading,
    success,
    error,
    addProduct,
  }
}

export const useUpdateProduct = () => {
  const user = useRecoilValue(userAtom)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const setProducts = useSetRecoilState(productsAtom)

  const updateProduct = async (productData: IProduct) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    setLoading(true)
    axios
      .put(`/api/products/${productData._id}`, productData, config)
      .then((response) => {
        //TODO update state

        setSuccess(false)
        return response.data
      })
      .catch((error) => {
        setError(true)
        setSuccess(false)
      })
      .finally(() => {
        setSuccess(true)
        setLoading(false)
      })
  }

  return {
    loading,
    success,
    error,
    updateProduct,
  }
}

export const addProduct = (productData: IProduct) => {
  const token = localStorage.getItem('token')?.replaceAll('"', '')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios
    .post('/api/products', productData, config)
    .then((response) => response.data)
}

export const updateProduct = (productData: IProduct) => {
  const token = localStorage.getItem('token')?.replaceAll('"', '')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios
    .put(`/api/products/${productData._id}`, productData, config)
    .then((response) => response.data)
}

export const deleteProduct = (product_id: string) => {
  const token = localStorage.getItem('token')?.replaceAll('"', '')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios
    .delete(`/api/products/${product_id}`, config)
    .then((response) => response.data)
}

export const getProducts = () => {
  const token = localStorage.getItem('token')?.replaceAll('"', '')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.get('/api/products', config).then((response) => response.data)
}
