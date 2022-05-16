export const debounced = (func: Function, milliseconds: number) => {
  const time = milliseconds || 400
  let timer: number

  return (v: string) => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(func, time, v)
  }
}
