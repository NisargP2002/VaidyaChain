import React, { useState } from 'react';
import Fuse from 'fuse.js';

const options=[{
    label:'Dermatologist',
    value:'Dermatologist'
    },
    {
    label:'Immunologist',
    value:'Immunologist'
    },
    {
    label:'Gastroenterologist',
    value:'Gastroenterologist'
    },
    {
    label:'Hepatologist',
    value:'Hepatologist'
    },
    {
    label:'Internal Medicine Specialist',
    value:'Internal Medicine Specialist'
    },
    {
    label:'Infectious Disease Specialist',
    value:'Infectious Disease Specialist'
    },
    {
    label:'Endocrinologist',
    value:'Endocrinologist'
    },
    {
    label:'Pulmonologist',
    value:'Pulmonologist'
    },
    {
    label:'Cardiologist',
    value:'Cardiologist'
    },
    {
    label:'Neurologist',
    value:'Neurologist'
    },
    {
    label:'Orthopedic Surgeon',
    value:'Orthopedic Surgeon'
    },
    {
    label:'General Practitioner',
    value:'General Practitioner'
    },
    {
    label:'General Surgeon',
    value:'General Surgeon'
    },
    {
    label:'Vascular Surgeon',
    value:'Vascular Surgeon'
    },
    {
    label:'Otolaryngologist',
    value:'Otolaryngologist'
    },
    {
    label:'Urologist',
    value:'Urologist'
    }]

// const options = [
//     {
//         label: 'Anatomical Pathology',
//         value: 'Anatomical Pathology',
//     },
//     {
//         label: 'Anesthesiology',
//         value: 'Anesthesiology',
//     },
//     {
//         value: 'Cardiology',
//         label: 'Cardiology',
//     },
//     {
//         value: 'Cardiovascular/Thoracic Surgery',
//         label: 'Cardiovascular/Thoracic Surgery',
//     },
//     {
//         value: 'Clinical Immunology/Allergy',
//         label: 'Clinical Immunology/Allergy',
//     },
//     {
//         value: 'Critical Care Medicine',
//         label: 'Critical Care Medicine',
//     },
//     {
//         value: 'Diagnostic Radiology',
//         label: 'Diagnostic Radiology',
//     },
//     {
//         value: 'Medical Radiation Physics',
//         label: 'Medical Radiation Physics',
//     },
//     {
//         value: 'Medical Microbiology',
//         label: 'Medical Microbiology',
//     },
//     {
//         value: 'Medical Genetics and Genomics',
//         label: 'Medical Genetics and Genomics',
//     },
//     {
//         value: 'Medical Biochemistry',
//         label: 'Medical Biochemistry',
//     },
//     {
//         value: 'Medical Oncology and Hematology',
//         label: 'Medical Oncology and Hematology',
//     },
//     {
//         value: 'Neonatology',
//         label: 'Neonatology',
//     },
//     {
//         value: 'Palliative Medicine',
//         label: 'Palliative Medicine',
//     },
//     {
//         value: 'Physical Medicine and Rehabilitation',
//         label: 'Physical Medicine and Rehabilitation',
//     },
//     {
//         value: 'Public Health and Preventive Medicine',
//         label: 'Public Health and Preventive Medicine',
//     },
//     {
//         value: 'Sleep Medicine',
//         label: 'Sleep Medicine',
//     },
//     {
//         value: 'Sports Medicine',
//         label: 'Sports Medicine'
//     },
//     {
//         value: 'Transfusion Medicine',
//         label: 'Transfusion Medicine'
//     },
//     { 
//         value: 'Vascular Surgery',
//         label: 'Vascular Surgery'
//  }
// ];


const SmartSearchDropdown = ({handler,value}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    // const [showOpts, setShowOpts] = useState(true);

    const fuse = new Fuse(options, {
        keys: ["label"],
    });

    const filteredOptions = fuse.search(searchTerm).map((option) => option.item);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setSearchTerm(option.label);
        handler(option.value);
        // setShowOpts(false)
    };

    return (
        <div>
            <input
                className='mt-1 mb-4 p-2 block w-full border-gray-300 rounded-md'
                type="text"
                placeholder="Search for an option..."
                value={searchTerm}
                onChange={(event) =>{ setSearchTerm(event.target.value)}}
            />
            {filteredOptions.map((option) => (
                !selectedOption && <div    
                    key={option.value}
                    onClick={() => handleOptionClick(option)}
                    style={{
                        background: option.value === selectedOption?.value ? "gray" : "white",
                        cursor: "pointer",
                    }}
                >
                    {option.label}
                </div>
            ))}
        </div>
    );
};

export default SmartSearchDropdown;