import React from "react";

import './App.css';
import Header from "../src/Components/Header/Header";
import Home from './Home';
import {QueryClientProvider,QueryClient} from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient} >
        <Header/>
        <Home/>
    </QueryClientProvider>
  )
}

export default App