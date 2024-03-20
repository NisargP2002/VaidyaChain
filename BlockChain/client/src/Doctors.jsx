import React, { useEffect } from 'react'
import { useState } from "react";
import useEth from "./contexts/EthContext/useEth";
import Dropdown from './Dropdown';
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
// import Modal from './Modal';


function Doctors() {
  // use like this
  const { state: { contract, accounts } } = useEth();
  // const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  // const handleInputChange = e => {
  //   if (/^\d+$|^$/.test(e.target.value)) {
  //     setInputValue(e.target.value);
  //   }
  // };
  const [doctorData, setDoctorData] = useState([])
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");


  const handleNameChange = (event) => {
    setName(event.target.value);
    console.log(doctorData)
  }

  const deleteDoctor = async (id) => {
    await contract.methods.deleteDoctor(id).send({ from: accounts[0] });
    fetchData()
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await contract.methods.createDoctor(name, specialty).send({ from: accounts[0] });
    // const num = await contract.methods.nextDoctorId().call({ from: accounts[0] })
    setShowModal(false);
    fetchData()
  }

  const read = async () => {
    const num = await contract.methods.nextDoctorId().call({ from: accounts[0] })
    var doctors = []
    for (let i = 0; i < num; i++) {
      const val = await contract.methods.doctors(i).call({ from: accounts[0] })
      console.log(val)
      doctors.push(val)
    }
    return doctors
  };

  const [check, setcheck] = useState(false)

  const fetchData = async () => {
    const data = await read();
    const doctorArray = Object.values(data).map((doctor) => ({
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty
    }))
    console.log(data)
    setDoctorData(doctorArray);
  };
  useEffect(() => {
    if (accounts) {
      fetchData();
    }
    const getAccounts = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      if(accounts.length>0){
        setcheck(true)
      }}
    
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
    };
  })

  const specialtySetter = (data) => setSpecialty(data);
  return (<>
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Add Doctor</h3>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" id="name" className="mt-1 mb-4 p-2 block w-full border-gray-300 rounded-md" onChange={handleNameChange} value={name} required />
                      </div>
                      <div>
                        <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Specialty</label>
                        {/* <input type="text" name="specialty" id="specialty" className="mt-1 mb-4 p-2 block w-full border-gray-300 rounded-md" onChange={handleSpecialtyChange} value={specialty} required /> */}
                        <Dropdown handler={specialtySetter} />
                      </div>
                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                          Add Doctor
                        </button>
                        <button onClick={() => setShowModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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

    {check ? <div onLoad={read} className="relative overflow-x-auto shadow-md sm:rounded-lg m-3">
      <div className="flex justify-between bg-[#189AB4] p-3">
        <div className="text-xl md:text-3xl text-white">Doctors</div>
        <div>
          <button className="px-3 py-1 rounded font-medium text-white md:hidden hover:bg-[#05445E]  duration-300">+</button>
          <button className="px-3 py-1 rounded font-medium text-white hidden md:block hover:bg-[#05445E] duration-300" onClick={() => { setShowModal(true); read() }}>+ Add Doctors</button>
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-black uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Doctor Id
            </th>
            <th scope="col" className="px-6 py-3">
              Doctor Name
            </th>
            <th scope="col" className="px-6 py-3">
              Doctor Specialty
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">View Doctor</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {doctorData.map((doctor, index) => (
            doctor.doctorId > 0 &&
            <tr key={index} className="border-[#0E8388] duration-300 text-black hover:text-[#2E4F4F] hover:bg-gray-50">
              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                {doctor.doctorId}
              </th>
              <td className="px-6 py-4">
                {doctor.doctorName}
              </td>
              <td className="px-6 py-4">
                {doctor.doctorSpecialty}
              </td>
              <td className="px-6 py-4 text-right">
                <button href="#" onClick={() => { deleteDoctor(doctor.doctorId) }} className="px-3 py-1 rounded-full font-medium  bg-[#05445E] text-white hover:bg-[#75E6DA] hover:text-white duration-300">Delete Doctor</button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </div> : <>
      <div className="brandName text-2xl font-extrabold justify-center flex content-center cursor-pointer text-[#f66e1a]">तव क्रिप्टो वॉलेट् बंधनं कुरुतम्।</div>
      <div className="brandName text-2xl font-extrabold justify-center flex content-center cursor-pointer text-[#f66e1a]">Please link your crpto wallet </div>
      {/* <div className="text-2xl font-extrabold justify-center flex content-center cursor-pointer"><button onClick={()=>window.ethereum.request({method:'eth_requestAccounts'})} className='flex rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm'>Connect to metamask</button></div> */}
      <div className="text-2xl font-extrabold mt-5 justify-center flex content-center cursor-pointer"><button onClick={()=>window.ethereum.request({method:'eth_requestAccounts'})} className='flex rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm'>Connect to metamask</button></div>

      </>}


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

export default Doctors