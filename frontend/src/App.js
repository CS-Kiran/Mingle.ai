import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home';
import UploadPDF from './Components/UploadPDF';
import QApdf from './Components/QA';
import QAtext from './Components/QAtext';

const App = () => {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/uploadPDF' element={<UploadPDF/>}/>
      <Route exact path='/QApdf' element={<QApdf/>}/>
      <Route exact path='/QAtext' element={<QAtext/>}/>
    </Routes>
    </>
  )
}

export default App