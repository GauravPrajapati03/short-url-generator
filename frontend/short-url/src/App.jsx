// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import CreateShortUrl from './components/CreateShortUrl'
// import GetData from './components/GetData'
import GetDatawithDelete from './components/GetDatawithDelete'

function App() {


  return (
    <>
      <h1>Short Urls</h1>
      {/* <p><GetData/></p> */}
      <CreateShortUrl />
      <GetDatawithDelete/>

    </>
  )
}

export default App
