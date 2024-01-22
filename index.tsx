import { ReactNode, createContext, useContext, useReducer } from "react"

// --- available loader action types --- //
enum LoaderActionType {
  START = "START",
  FINISH = "FINISH"
}


// --- loader state type --- //
interface ILoaderState {
  loading: boolean,
  message: string[]
}

// --- loader action type for start --- //
interface ILoaderActionStart {
  type: LoaderActionType.START,
  payload: string[]
}

// --- loader action type for finish --- //
interface ILoaderActionFinish {
  type: LoaderActionType.FINISH
}

// --- loader action type
type ILoaderAction = ILoaderActionStart | ILoaderActionFinish

// --- start loader method type
export type TStartLoader = (...args: string[]) => void

// --- loader context type --- //
interface ILoaderContext {
  loading: boolean,
  loaderMessages: string[],
  startLoader: TStartLoader,
  stopLoader: () => void
}

// --- loader context created --- // 
const LoaderContext = createContext<ILoaderContext>({
  loading: false,
  loaderMessages: ["Resolving Issues..."],
  startLoader: () => {},
  stopLoader: () => {}
})

// --- loader reducer method --- //
const LoaderReducer = (state: ILoaderState, action: ILoaderAction) => {
  switch(action.type) {
    case LoaderActionType.START:
      return { loading: true, message: action.payload }
      // return { loading: false, message: action.payload }
    case LoaderActionType.FINISH:
      return { loading: false, message: [""] }
    default:
      return state
  }
} 

// --- loader provider created --- //
export function LoaderProvider({ children }: { children: ReactNode }) {
    const [ state, dispatch ] = useReducer(LoaderReducer, { loading: false, message: ["Resolving Issues..."] })

    const startLoader = (...args: string[]) => {
      dispatch({ type: LoaderActionType.START, payload: args })
    }

    const stopLoader = () => {
      dispatch({ type: LoaderActionType.FINISH })
    }


  return (
    <LoaderContext.Provider value={{ loading: state.loading, loaderMessages: state.message, startLoader, stopLoader }}>
      {children}
    </LoaderContext.Provider>
  )
}


// --- useLoader hook --- //
export const useLoader = () => useContext(LoaderContext);
