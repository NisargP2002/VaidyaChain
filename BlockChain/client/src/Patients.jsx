import React, { useEffect } from 'react'
import { useState } from "react";
import useEth from "./contexts/EthContext/useEth";
import { Link } from 'react-router-dom';
import { Buffer } from 'buffer';
import NoMeta from './NoMeta';
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
// import Modal from './Modal';


function Patients() {
  // use like this
  const { state: { contract, accounts } } = useEth();
  const [showModal, setShowModal] = useState(false);
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [patientData, setPatientData] = useState([])
  const [props, setProps] = useState([])
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [fileType, setFileType] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [imageBlob, setImageBlob] = useState('');

  function handleFileInputChange(event) {
    const reader = new window.FileReader();
    const file = event.target.files[0];
    setFileType(file.type);
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const buffer = new Buffer(reader.result);
      setFileType(file.type)
      const blob = new Blob([buffer], { type: file.type });
      const imageUrl = URL.createObjectURL(blob);
      const hexString = '0x' + buffer.toString('hex');

      setImageSrc(hexString);
      setImageBlob(imageUrl);
    };
  }

  const handleImageLoad = (hex, filet) => {
    const newString = hex.substring(2);
    // const blob = handleFileSelect(hex);
    let input = newString.replace(/[^A-Fa-f0-9]/g, "");
    if (input.length % 2) {
      console.log("cleaned hex string length is odd.");
      return;
    }

    let binary = new Array([]);
    for (let i = 0; i < input.length / 2; i++) {
      let h = input.substr(i * 2, 2);
      binary[i] = parseInt(h, 16);
    }

    let byteArray = new Uint8Array(binary);
    setImageBlob(URL.createObjectURL(new Blob([byteArray], { type: 'application/octet-stream' })));
  };


  const handleDeleteXray = async (id) => {
    await contract.methods.deleteHealthRecord(id).send({ from: accounts[0] })
    setImageBlob('')
  }
  const handleNameChange = (event) => {
    setName(event.target.value);
    console.log(patientData)
  }
  const handleAgeChange = (event) => {
    setAge(event.target.value);
  }
  const handleDeletePatient=async (id)=>{
    await contract.methods.deletePatient(id).send({ from: accounts[0] })
    fetchData()
  
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await contract.methods.createPatient(name, age).send({ from: accounts[0] });
    setShowModal(false);
    fetchData()
  }
  const handleUpdate = async (event) => {
    event.preventDefault();
    console.log((imageSrc))

    await contract.methods.updateHealthRecord(props.patientId, imageSrc, fileType).send({ from: accounts[0] });
    setShowModal(false);
    fetchData()
  }
  const read = async () => {
    const num = await contract.methods.nextPatientId().call({ from: accounts[0] })
    var patients = []
    for (let i = 0; i < num; i++) {
      const val = await contract.methods.patients(i).call({ from: accounts[0] })
      // console.log(val)
      patients.push(val)
    }
    return patients
  };

  const getPatientDetalis = async (id) => {
    const val = await contract.methods.healthRecords(id).call({ from: accounts[0] })
    // console.log(val)
    setProps(val)
    handleImageLoad(val.xray, val.format)
  }
  const fetchData = async () => {
    const data = await read();
    const patientArray = Object.values(data).map((patient) => ({
      patientId: patient.id,
      patientName: patient.name,
      patientAge: patient.age
    }))
    // console.log(data)
    setPatientData(patientArray);
  };

  const [check, setcheck] = useState(false)
  // const web3 = new Web3(window.web3.currentProvider);
  useEffect(() => {
    if (accounts) {
      fetchData();
    }
    const getAccounts = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts.length > 0) {
        setcheck(true)
      }
    }

    getAccounts()
    window.ethereum.on('accountsChanged', function (newAccounts) {
      if (newAccounts.length > 0) {
        setcheck(true)
      }
      else {
        setcheck(false)
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      window.ethereum.removeAllListeners('accountsChanged');
    };
  })


  return (<>

    <NoMeta />

    {showModal &&
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Create Insurance</h3>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" id="name" className="mt-1 mb-4 p-2 block w-full border-gray-300 rounded-md" onChange={handleNameChange} value={name} required />
                      </div>
                      <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                        <input type="number" name="age" id="age" className="mt-1 mb-4 p-2 block w-full border-gray-300 rounded-md" onChange={handleAgeChange} value={age} required />
                      </div>


                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button type='submit' className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                          Create 
                        </button>
                        <button onClick={() => { setShowModal(false) }} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    }
    {showHealthModal &&
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Health Care</h3>
                  <div className="mt-2">
                    <form onSubmit={handleUpdate}>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Patient ID</label>
                        <input type="text" name="name" id="name" className="mt-1 mb-4 p-2 block w-full border-gray-300 rounded-md" onChange={handleNameChange} value={props.patientId} required disabled />
                      </div>
                      <div>
                        {props.xray && imageSrc !== '' ? <><label htmlFor="xray" className="block text-sm font-medium text-gray-700">X Ray</label>
                          <img src={imageBlob} alt="blob" /><button className='text-[red]' onClick={() => { handleDeleteXray(props.patientId) }}>Delete Xray</button></> : <div>
                          <input type="file" accept="image/*" onChange={handleFileInputChange} />
                          {imageSrc !== '' && <img src={imageBlob} alt="Uploaded" />}
                          {/* {console.log(imageBlob)} */}
                        </div>}




                      </div>
                      {/* <div>
                      <Link htmlFor="phone"  path='/analyze' className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">Analyze Disease</Link>
                      <input type="number" name="phone" id="age" className="mt-1 mb-4 p-2 block w-full border-gray-300 rounded-md" onChange={handlePhoneChange} value={phone} required />
                    </div> */}

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <Link to='/analyzer' className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                          Disease Analyzer
                        </Link>

                        <button type="submit" className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm'>Update Patient</button>
                      </div>
                      <button onClick={() => { setShowHealthModal(false) }} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    }
    {check ?
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-3">
        <div className="flex justify-between bg-[#189AB4] p-3">
          <div className="text-xl md:text-3xl px-4 text-white">Insurances</div>
          <div>
            <button className="px-3 py-1 rounded font-medium text-white md:hidden hover:bg-[#05445E]  duration-300">+</button>
            <button className="px-3 py-1 rounded font-medium text-white hidden md:block hover:bg-[#05445E] duration-300" onClick={() => { setShowModal(true); read() }}>+ </button>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-black uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Client Id
              </th>
              <th scope="col" className="px-6 py-3">
                Client Name
              </th>
              <th scope="col" className="px-6 py-3">
                Patient Age
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">View Patient</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {patientData.map((patient, index) => (
              patient.patientId > 0 &&
              <tr key={index} className="border-[#0E8388] duration-300 text-black hover:text-[#2E4F4F] hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                  {patient.patientId}
                </th>
                <td className="px-6 py-4">
                  {patient.patientName}
                </td>
                <td className="px-6 py-4">
                  {patient.patientAge}
                </td>
                <td className="px-6 py-4 text-right">
                  <button href="#" onClick={(event) => { setShowHealthModal(true); getPatientDetalis(patient.patientId) }} className="px-3 py-1 rounded-full font-medium  bg-[#05445E] text-white hover:bg-[#75E6DA] hover:text-white duration-300">Health Record</button>
                  <button id="deletePatient" onClick={(event) => { handleDeletePatient(patient.patientId) }} className="px-3 py-1 ml-2 rounded-full font-medium  bg-red-500 text-white hover:bg-red-700 hover:text-white duration-300">Delete Patient</button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div> : <>
        <div className="brandName text-2xl font-extrabold justify-center flex content-center cursor-pointer text-[#f66e1a]">तव क्रिप्टो वॉलेट् बंधनं कुरुतम्।</div>
        <div className="brandName text-2xl font-extrabold justify-center flex content-center cursor-pointer text-[#f66e1a]">Please link your crpto wallet </div>
        <div className="text-2xl font-extrabold mt-5 justify-center flex content-center cursor-pointer"><button onClick={()=>window.ethereum.request({method:'eth_requestAccounts'})} className='flex rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm'>Connect to metamask</button></div>

      </>

    }
    {/* <button onClick={read}>
          read()
        </button>
        <ChevronLeftIcon className="h-5 w-5 text-blue-500" />;
        <div onClick={write} className="input-btn">
          write(<input
            type="text"
            placeholder="uint"
            value={inputValue}
            onChange={handleInputChange}
            />)
        </div> */}
  </>
  );
}

export default Patients