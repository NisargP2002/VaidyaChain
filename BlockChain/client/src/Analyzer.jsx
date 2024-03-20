import { useEffect, useState } from "react";
import useEth from "./contexts/EthContext/useEth";
import Fuse from "fuse.js";

const options = {
    includeScore: true,
    keys: ["name"]
};




const tags = [
    { id: 1, name: 'itching' },
    { id: 2, name: 'skin_rash' },
    { id: 3, name: 'nodal_skin_eruptions' },
    { id: 4, name: 'continuous_sneezing' },
    { id: 5, name: 'shivering' },
    { id: 6, name: 'chills' },
    { id: 7, name: 'joint_pain' },
    { id: 8, name: 'stomach_pain' },
    { id: 9, name: 'acidity' },
    { id: 10, name: 'ulcers_on_tongue' },
    { id: 11, name: 'muscle_wasting' },
    { id: 12, name: 'vomiting' },
    { id: 13, name: 'burning_micturition' },
    { id: 14, name: 'spotting_ urination' },
    { id: 15, name: 'fatigue' },
    { id: 16, name: 'weight_gain' },
    { id: 17, name: 'anxiety' },
    { id: 18, name: 'cold_hands_and_feets' },
    { id: 19, name: 'mood_swings' },
    { id: 20, name: 'weight_loss' },
    { id: 21, name: 'restlessness' },
    { id: 22, name: 'lethargy' },
    { id: 23, name: 'patches_in_throat' },
    { id: 24, name: 'irregular_sugar_level' },
    { id: 25, name: 'cough' },
    { id: 26, name: 'high_fever' },
    { id: 27, name: 'sunken_eyes' },
    { id: 28, name: 'breathlessness' },
    { id: 29, name: 'sweating' },
    { id: 30, name: 'dehydration' },
    { id: 31, name: 'indigestion' },
    { id: 32, name: 'headache' },
    { id: 33, name: 'yellowish_skin' },
    { id: 34, name: 'dark_urine' },
    { id: 35, name: 'nausea' },
    { id: 36, name: 'loss_of_appetite' },
    { id: 37, name: 'pain_behind_the_eyes' },
    { id: 38, name: 'back_pain' },
    { id: 39, name: 'constipation' },
    { id: 40, name: 'abdominal_pain' },
    { id: 41, name: 'diarrhoea' },
    { id: 42, name: 'mild_fever' },
    { id: 43, name: 'yellow_urine' },
    { id: 44, name: 'yellowing_of_eyes' },
    { id: 45, name: 'acute_liver_failure' },
    { id: 46, name: 'fluid_overload' },
    { id: 47, name: 'swelling_of_stomach' },
    { id: 48, name: 'swelled_lymph_nodes' },
    { id: 49, name: 'malaise' },
    { id: 50, name: 'blurred_and_distorted_vision' },
    { id: 51, name: 'phlegm' },
    { id: 52, name: 'throat_irritation' },
    { id: 53, name: 'redness_of_eyes' },
    { id: 54, name: 'sinus_pressure' },
    { id: 55, name: 'runny_nose' },
    { id: 56, name: 'congestion' },
    { id: 57, name: 'chest_pain' },
    { id: 58, name: 'weakness_in_limbs' },
    { id: 59, name: 'fast_heart_rate' },
    { id: 60, name: 'pain_during_bowel_movements' },
    { id: 61, name: 'pain_in_anal_region' },
    { id: 62, name: 'bloody_stool' },
    { id: 63, name: 'irritation_in_anus' },
    { id: 64, name: 'neck_pain' },
    { id: 65, name: 'dizziness' },
    { id: 66, name: 'cramps' },
    { id: 67, name: 'bruising' },
    { id: 68, name: 'obesity' },
    { id: 69, name: 'swollen_legs' },
    { id: 70, name: 'swollen_blood_vessels' },
    { id: 71, name: 'puffy_face_and_eyes' },
    { id: 72, name: 'enlarged_thyroid' },
    { id: 73, name: 'brittle_nails' },
    { id: 74, name: 'swollen_extremeties' },
    { id: 75, name: 'excessive_hunger' },
    { id: 76, name: 'extra_marital_contacts' },
    { id: 77, name: 'drying_and_tingling_lips' },
    { id: 78, name: 'slurred_speech' },
    { id: 79, name: 'knee_pain' },
    { id: 80, name: 'hip_joint_pain' },
    { id: 81, name: 'muscle_weakness' },
    { id: 82, name: 'stiff_neck' },
    { id: 83, name: 'swelling_joints' },
    { id: 84, name: 'movement_stiffness' },
    { id: 85, name: 'spinning_movements' },
    { id: 86, name: 'loss_of_balance' },
    { id: 87, name: 'unsteadiness' },
    { id: 88, name: 'weakness_of_one_body_side' },
    { id: 89, name: 'loss_of_smell' },
    { id: 90, name: 'bladder_discomfort' },
    { id: 91, name: 'foul_smell_of urine' },
    { id: 92, name: 'continuous_feel_of_urine' },
    { id: 93, name: 'passage_of_gases' },
    { id: 94, name: 'internal_itching' },
    { id: 95, name: 'toxic_look_(typhos)' },
    { id: 96, name: 'depression' },
    { id: 97, name: 'irritability' },
    { id: 98, name: 'muscle_pain' },
    { id: 99, name: 'altered_sensorium' },
    { id: 100, name: 'red_spots_over_body' },
    { id: 101, name: 'belly_pain' },
    { id: 102, name: 'abnormal_menstruation' },
    { id: 103, name: 'dischromic _patches' },
    { id: 104, name: 'watering_from_eyes' },
    { id: 105, name: 'increased_appetite' },
    { id: 106, name: 'polyuria' },
    { id: 107, name: 'family_history' },
    { id: 108, name: 'mucoid_sputum' },
    { id: 109, name: 'rusty_sputum' },
    { id: 110, name: 'lack_of_concentration' },
    { id: 111, name: 'visual_disturbances' },
    { id: 112, name: 'receiving_blood_transfusion' },
    { id: 113, name: 'receiving_unsterile_injections' },
    { id: 114, name: 'coma' },
    { id: 115, name: 'stomach_bleeding' },
    { id: 116, name: 'distention_of_abdomen' },
    { id: 117, name: 'history_of_alcohol_consumption' },
    { id: 118, name: 'fluid_overload' },
    { id: 119, name: 'blood_in_sputum' },
    { id: 120, name: 'prominent_veins_on_calf' },
    { id: 121, name: 'palpitations' },
    { id: 122, name: 'painful_walking' },
    { id: 123, name: 'pus_filled_pimples' },
    { id: 124, name: 'blackheads' },
    { id: 125, name: 'scurring' },
    { id: 126, name: 'skin_peeling' },
    { id: 127, name: 'silver_like_dusting' },
    { id: 128, name: 'small_dents_in_nails' },
    { id: 129, name: 'inflammatory_nails' },
    { id: 130, name: 'blister' },
    { id: 131, name: 'red_sore_around_nose' },
    { id: 132, name: 'yellow_crust_ooze' }]

function TagsInput() {
    const { state: { contract, accounts } } = useEth();
    const [docs, setDocs] = useState([])
    const [inputValue, setInputValue] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [showOpts, setShowOpts] = useState(false)
    const [analysis, setAnalysis] = useState([])
    const fuse = new Fuse(tags, options);
  const [check, setcheck] = useState(false)

    useEffect(() => {
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
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleTagClick = (tag) => {
        if (!selectedTags.some((t) => t.id === tag.id)) {
            setSelectedTags([...selectedTags, tag]);
            setInputValue("");
            console.log(selectedTags)
        }
    };

    const handleRemoveTag = (tag) => {
        setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    };

    const Analyze = async () => {
        const matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // const NewMatrix=[]
        for (let tag in selectedTags) {
            matrix[selectedTags[tag].id - 1] = 1
        }
        fetch('http://127.0.0.1:5000/predict/' + matrix.join(''))
            .then((response) => {
                return response.json();
            }).then(async (data) => {
                setAnalysis(data)
                const num = await contract.methods.nextDoctorId().call({ from: accounts[0] })
                var doctors = []
                for (let i = 0; i < num; i++) {
                    const val = await contract.methods.doctors(i).call({ from: accounts[0] })
                    // console.log(val)
                    doctors.push(val)
                }
                setDocs(doctors)
            })
            .catch((error) => {
                console.error(error);
            });


    }
    const filteredTags = inputValue
        ? fuse.search(inputValue).map((result) => result.item)
        : tags;

    return (
        check?
        <>
        <div class="w-full flex justify-center">

            <form class="bg-white shadow-md  rounded px-8 pt-6 pb-8 mb-4">
                <div class="">
                    <div className="w-full max-w-md">
                        <div className="relative">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="symp">
                                Symptoms
                            </label>
                            <input
                                id="symp"
                                type="text"
                                placeholder="Search Symptoms..."
                                value={inputValue}
                                onFocus={() => setShowOpts(true)}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                            {showOpts && <ul className="absolute top-full left-0 right-0 bg-white border-2 border-gray-300 rounded-b-lg overflow-hidden">
                                {filteredTags.map((tag) => (
                                    (<li
                                        key={tag.id}
                                        onClick={() => { handleTagClick(tag); setShowOpts(false) }}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        {tag.name}
                                    </li>)
                                ))}
                            </ul>
                            }
                        </div>

                        <div className="flex flex-wrap w-full mt-2">
                            {selectedTags.map((tag) => (
                                <div key={tag.id} className="flex items-center mr-1 mb-1">
                                    <div className="px-3 py-2 bg-blue-500 text-white rounded-lg">
                                        {tag.name}
                                        <button
                                            className="ml-2 text-white-500"
                                            onClick={() => handleRemoveTag(tag)}
                                        >
                                            x
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => { Analyze() }} type="button">
                        Analyze the Disease
                    </button>
                </div>
            </form>
        </div>
        <div class="w-full flex justify-center">
            <div class="bg-white shadow-md  rounded px-8 pt-6 pb-8 mb-4">
                <div className="w-full ">
                    <div className="">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="symp">
                            Analysis Result
                        </label>
                        <input value={analysis.final_prediction} disabled></input>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="symp">
                            Concerned Specialist
                        </label>
                        <input value={analysis.specialist} disabled></input>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="symp">
                            Available Specialists
                        </label>
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
                                        Specialty
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {docs.map((doc, index) => (
                                    doc.id !== 0 && doc.specialty===analysis.specialist &&
                                    <tr key={index} className="border-[#0E8388] duration-300 text-black hover:text-[#2E4F4F] hover:bg-gray-50">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap ">
                                            {doc.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {doc.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {doc.specialty}
                                        </td>
                                        {/* <td className="px-6 py-4 text-right">
                                            <button href="#" onClick={(event) => { setShowHealthModal(true); getPatientDetalis(patient.patientId) }} className="px-3 py-1 rounded-full font-medium  bg-[#05445E] text-white hover:bg-[#75E6DA] hover:text-white duration-300">Health Record</button>
                                        </td> */}
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </>:<>
  <div className="brandName text-2xl font-extrabold justify-center flex content-center cursor-pointer text-[#f66e1a]">तव क्रिप्टो वॉलेट् बंधनं कुरुतम्।</div>
      <div className="brandName text-2xl font-extrabold justify-center flex content-center cursor-pointer text-[#f66e1a]">Please link your crpto wallet </div>
     <div className="text-2xl font-extrabold mt-5 justify-center flex content-center cursor-pointer"><button onClick={()=>window.ethereum.request({method:'eth_requestAccounts'})} className='flex rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm'>Connect to metamask</button></div>

      </>
    );
}

export default TagsInput;
