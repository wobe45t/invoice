import { useState } from 'react'
import { IProfile } from '../interfaces'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { userAtom } from '../state/userState'
import { contractorsAtom } from '../state/contractorState'
import axios from 'axios'
import { contractors } from '../constants'

export const useGetContractors = () => {
  const user = useRecoilValue(userAtom)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const setContractors = useSetRecoilState(contractorsAtom)

  const getContractors = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    setLoading(true)
    axios
      .get('/api/contractors', config)
      .then((response) => {
        setContractors(response.data)
        return response.data
      })
      .catch((error) => {
        setError(error)
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
    getContractors,
  }
}

export const useAddContractor = () => {
  const user = useRecoilValue(userAtom)
  const [contractors, setContractors] = useRecoilState(contractorsAtom)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const addContractor = async (contractorData: IProfile) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    setLoading(true)
    axios
      .post('/api/contractors', contractorData, config)
      .then((response) => {
        setContractors((prevState) => [...prevState, response.data])
        return response.data
      })
      .catch((error) => {
        setSuccess(false)
        setError(error)
      })
      .finally(() => {
        setLoading(false)
        setSuccess(true)
      })
  }

  return {
    loading,
    success,
    error,
    addContractor,
  }
}

export const useDeleteContractor = () => {
  const user = useRecoilValue(userAtom)
  const [contractors, setContractors] = useRecoilState(contractorsAtom)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const deleteContractor = async (contractor: IProfile) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    setLoading(true)
    axios
      .delete(`/api/contractors/${contractor._id}`, config)
      .then((response) => {
        setContractors(
          contractors.filter((c: IProfile) => c._id != contractor._id)
        )
        return response.data
      })
      .catch((error) => {
        setSuccess(false)
        setError(error)
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
    deleteContractor,
  }
}

export const useUpdateContractor = () => {
  const user = useRecoilValue(userAtom)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const updateContractor = async (contractorData: IProfile) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    setLoading(true)
    axios
      .put(`/api/contractors/${contractorData._id}`, contractorData, config)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        setSuccess(false)
        setError(error)
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
    updateContractor,
  }
}

export const addContractor = (contractorData: IProfile) => {
  const token = localStorage.getItem('token')?.replaceAll('"', '')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios
    .post('/api/contractors', contractorData, config)
    .then((response) => response.data)
}

export const updateContractor = (contractorData: IProfile) => {
  const token = localStorage.getItem('token')?.replaceAll('"', '')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios
    .put(`/api/contractors/${contractorData._id}`, contractorData, config)
    .then((response) => response.data)
}

export const deleteContractor = (contractor_id: string) => {
  const token = localStorage.getItem('token')?.replaceAll('"', '')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios
    .delete(`/api/contractors/${contractor_id}`, config)
    .then((response) => response.data)
}

export const getContractors = () => {
  const token = localStorage.getItem('token')?.replaceAll('"', '')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios.get('/api/contractors', config).then((response) => response.data)
}
