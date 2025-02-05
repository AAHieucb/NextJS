import { useState } from 'react'
import './App.css'
import Test1 from './Test1'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from "react-router-dom";
import Test2 from './Test2'
import { Route, Routes } from "react-router-dom";
import Test3 from './Test3'
import Test4 from './Test4'
import Test5 from './Test5'

function App() {
  const [queryClient] = useState(() => new QueryClient({
    // defaultOptions: {
    //   queries: {
    //     refetchOnWindowFocus: false, 
    //     refetchOnMount: false, 
    //     refetchIntervalInBackground: false
    //   },
    // }
  }));
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Test1 />} />
          <Route path="1" element={<Test2 />} />
          <Route path="2" element={<Test3 />} />
          <Route path="3" element={<Test4 />} />
          <Route path="4" element={<Test5 />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
