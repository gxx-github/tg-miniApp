

import { createContext, useContext, useState, type ReactNode } from "react"

interface LoadingContextType {
  isLoading: boolean
  setLoading: (loading: boolean, message?: string) => void
  loadingMessage: string
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setLoading: () => {},
  loadingMessage: "",
})

export const useLoading = () => useContext(LoadingContext)

interface LoadingProviderProps {
  children: ReactNode
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("")

  const setLoading = (loading: boolean, message = "加载中...") => {
    setIsLoading(loading)
    setLoadingMessage(message)
  }

  return <LoadingContext.Provider value={{ isLoading, setLoading, loadingMessage }}>{children}</LoadingContext.Provider>
}

