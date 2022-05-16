export interface IToast {
  id?: string
  message: string
  type: 'success' | 'error' | 'warning'
}