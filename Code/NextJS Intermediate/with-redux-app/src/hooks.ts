import type { ChangeEvent } from 'react'
import { useEffect, useRef } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, AppState } from './store'

// # Typescript
// Hook khá hay sẽ lọc tất cả trường form lấy được từ event và biến nó thành 1 object {name: "value", ...} và gọi 1 hàm truyền nó
export const useForm =
  <TContent>(defaultValues: TContent) =>
  (handler: (content: TContent) => void) =>
  async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.persist() // giải quyết vấn đề event gán null khi tự động xoá sau khi thực hiện xong nhưng vẫn muốn truy cập lại, nó sẽ cản việc gán null.

    const form = event.target as HTMLFormElement
    const elements = Array.from(form.elements) as HTMLInputElement[]
    const data = elements
      .filter((element) => element.hasAttribute('name'))
      .reduce(
        (object, element) => ({
          ...object,
          [`${element.getAttribute('name')}`]: element.value,
        }),
        defaultValues
      )
    await handler(data)
    form.reset() // reset form từ đầu, set lại mọi giá trị các trường về default value có khi mới tải
  }

// Hook useInterval sẽ thực hiện hàm call back sau mỗi khoảng delay. Nhưng nó khác setInterval là nếu callback or delay thay đổi, nó
// sẽ update thực hiện theo cái mới ngay lập tức
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: Function, delay: number) => {
  const savedCallback = useRef<Function>()
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  useEffect(() => {
    const handler = (...args: any) => savedCallback.current?.(...args)

    if (delay !== null) {
      const id = setInterval(handler, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
