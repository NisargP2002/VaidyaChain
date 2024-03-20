// import { useEffect, useState } from "react";
import { EthProvider } from "./contexts/EthContext";
import Patients from "./Patients";
import './input.css'
import Navbar from "./Navbar";
import { Routes, Route,BrowserRouter} from "react-router-dom";
// import Analyzer from "./Analyzer";
// import Doctors from "./Doctors";
import { useEffect, useState } from "react";
// import Web3 from 'web3';

function App() {
  const [check,setcheck]=useState(false)
  // const web3 = new Web3(window.web3.currentProvider);
  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts.length>0) {
        setcheck(true)
      }
    }
    getAccounts()
    window.ethereum.on('accountsChanged', function (newAccounts) {
      if (newAccounts.length>0) {
        setcheck(true)
      }
      else{
        setcheck(false)
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      window.ethereum.removeAllListeners('accountsChanged');
    };})

  return (
    <EthProvider>
      <div id="App" className='m-9 font-poppins'>
        <BrowserRouter >
      {check&&<Navbar/>}
        <Routes>
          {check?<Route exact path='/' element={<Patients/>}/>:<Route exact path='/' element={<><div className="brandName text-2xl font-extrabold justify-center flex content-center cursor-pointer text-[#f66e1a]">तव क्रिप्टो वॉलेट् बंधनं कुरुतम्।</div>
      <div className="brandName text-2xl font-extrabold justify-center flex content-center cursor-pointer text-[#f66e1a]">Please link your crpto wallet </div>
      {/* <div className="text-2xl font-extrabold justify-center flex content-center cursor-pointer"><button onClick={()=>window.ethereum.request({method:'eth_requestAccounts'})} className='flex rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm'>Connect to metamask</button></div> */}
      <div className="text-2xl font-extrabold mt-5 justify-center flex content-center cursor-pointer"><button onClick={()=>window.ethereum.request({method:'eth_requestAccounts'})} className='flex rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm'>Connect to metamask</button></div>
      
      </>
      }/>}

          {/* <Route exact path='/analyzer' element={<Analyzer/>}/>
          <Route exact path='/doctors' element={<Doctors/>}/> */}
        </Routes>
        </BrowserRouter>
        {/* <Patients/> */}
      </div>
    </EthProvider>
  );
}

export default App;
