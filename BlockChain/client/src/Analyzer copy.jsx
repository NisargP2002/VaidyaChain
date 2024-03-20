// import { useState } from "react";
// import Fuse from "fuse.js";

// const options = {
//     includeScore: true,
//     keys: ["name"]
// };

// const nums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

import React, { useState } from "react";
import Fuse from "fuse.js";

const TagInput = () => {
    
const [tags,setTags] = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue',
'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination', 'fatigue', 'weight_gain',
'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'fluid_overload', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze']
  const [inputValue, setInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showOpts, setShowOpts] = useState(false);
  const options = {
    keys: ["name"],
  };

  const fuse = new Fuse(tags, options);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (event.target.value === "") {
      setShowOpts(false);
    } else {
      setShowOpts(true);
    }
  };

  const handleTagSelect = (event) => {
    const selectedTag = event.target.innerText;
    setInputValue("");
    setSelectedTags([...selectedTags, selectedTag]);
    setTags([...selectedTags, selectedTag]);
    setShowOpts(false);
  };

  const handleTagDelete = (tag) => {
    const newTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
    setSelectedTags(newTags);
    setTags(newTags);
  };

  const searchResults = fuse.search(inputValue);

  return (
    <div>
      <div>
        {selectedTags.map((tag) => (
          <div key={tag}>
            {tag}{" "}
            <button onClick={() => handleTagDelete(tag)}>x</button>
          </div>
        ))}
      </div>
      <input value={inputValue} onChange={handleInputChange} />
      {showOpts && (
        <ul>
          {searchResults.map((result) => (
            <li key={result.item.name} onClick={handleTagSelect}>
              {result.item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagInput;





// const tags = [{value: 'itching', value: 'skin_rash', value: 'nodal_skin_eruptions', value: 'continuous_sneezing', value: 'shivering', value: 'chills', value: 'joint_pain', value: 'stomach_pain', value: 'acidity', value: 'ulcers_on_tongue',
// value:'muscle_wasting', value: 'vomiting', value: 'burning_micturition', value: 'spotting_ urination', value: 'fatigue', value: 'weight_gain',
//     value:'anxiety', value: 'cold_hands_and_feets', value: 'mood_swings', value: 'weight_loss', value: 'restlessness', value: 'lethargy', value: 'patches_in_throat', value: 'irregular_sugar_level', value: 'cough', value: 'high_fever', value: 'sunken_eyes', value: 'breathlessness', value: 'sweating', value: 'dehydration', value: 'indigestion', value: 'headache', value: 'yellowish_skin', value: 'dark_urine', value: 'nausea', value: 'loss_of_appetite', value: 'pain_behind_the_eyes', value: 'back_pain', value: 'constipation', value: 'abdominal_pain', value: 'diarrhoea', value: 'mild_fever', value: 'yellow_urine', value: 'yellowing_of_eyes', value: 'acute_liver_failure', value: 'fluid_overload', value: 'swelling_of_stomach', value: 'swelled_lymph_nodes', value: 'malaise', value: 'blurred_and_distorted_vision', value: 'phlegm', value: 'throat_irritation', value: 'redness_of_eyes', value: 'sinus_pressure', value: 'runny_nose', value: 'congestion', value: 'chest_pain', value: 'weakness_in_limbs', value: 'fast_heart_rate', value: 'pain_during_bowel_movements', value: 'pain_in_anal_region', value: 'bloody_stool', value: 'irritation_in_anus', value: 'neck_pain', value: 'dizziness', value: 'cramps', value: 'bruising', value: 'obesity', value: 'swollen_legs', value: 'swollen_blood_vessels', value: 'puffy_face_and_eyes', value: 'enlarged_thyroid', value: 'brittle_nails', value: 'swollen_extremeties', value: 'excessive_hunger', value: 'extra_marital_contacts', value: 'drying_and_tingling_lips', value: 'slurred_speech', value: 'knee_pain', value: 'hip_joint_pain', value: 'muscle_weakness', value: 'stiff_neck', value: 'swelling_joints', value: 'movement_stiffness', value: 'spinning_movements', value: 'loss_of_balance', value: 'unsteadiness', value: 'weakness_of_one_body_side', value: 'loss_of_smell', value: 'bladder_discomfort', value: 'foul_smell_of urine', value: 'continuous_feel_of_urine', value: 'passage_of_gases', value: 'internal_itching', value: 'toxic_look_(typhos)', value: 'depression', value: 'irritability', value: 'muscle_pain', value: 'altered_sensorium', value: 'red_spots_over_body', value: 'belly_pain', value: 'abnormal_menstruation', value: 'dischromic _patches', value: 'watering_from_eyes', value: 'increased_appetite', value: 'polyuria', value: 'family_history', value: 'mucoid_sputum', value: 'rusty_sputum', value: 'lack_of_concentration', value: 'visual_disturbances', value: 'receiving_blood_transfusion', value: 'receiving_unsterile_injections', value: 'coma', value: 'stomach_bleeding', value: 'distention_of_abdomen', value: 'history_of_alcohol_consumption', value: 'fluid_overload', value: 'blood_in_sputum', value: 'prominent_veins_on_calf', value: 'palpitations', value: 'painful_walking', value: 'pus_filled_pimples', value: 'blackheads', value: 'scurring', value: 'skin_peeling', value: 'silver_like_dusting', value: 'small_dents_in_nails', value: 'inflammatory_nails', value: 'blister', value: 'red_sore_around_nose', value: 'yellow_crust_ooze'}]
// const tags = [
//     { id: 1, name: "React" },
//     { id: 2, name: "Vue" },
//     { id: 3, name: "Angular" },
//     { id: 4, name: "Svelte" },
//     { id: 5, name: "Ember" },
//     { id: 6, name: "Backbone" },
//     { id: 7, name: "jQuery" },
// ];


// function TagsInput() {
//     const [inputValue, setInputValue] = useState("");
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [showOpts, setShowOpts] = useState(false)
//     const fuse = new Fuse(tags, options);

//     const handleInputChange = (event) => {
//         setInputValue(event.target.value);
//     };

//     const handleTagClick = (tag) => {
//         if (!selectedTags.some((t) => t.id === tag.id)) {
//             setSelectedTags([...selectedTags, tag]);
//             setInputValue("");
//             console.log(selectedTags)
//         }
//     };

//     const handleRemoveTag = (tag) => {
//         setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
//     };

//     const filteredTags = inputValue
//         ? fuse.search(inputValue).map((result) => result.item)
//         : tags;

//     return (
//         <div className="w-full max-w-md">
//             <div className="relative">
//                 <input
//                     type="text"
//                     placeholder="Type to search..."
//                     value={inputValue}
//                     onFocus={() => setShowOpts(true)}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
//                 />
//                 {showOpts && <ul className="absolute top-full left-0 right-0 bg-white border-2 border-gray-300 rounded-b-lg overflow-hidden">
//                     {filteredTags.map((tag) => (
//                         (<li
//                             key={tag.id}
//                             onClick={() => { handleTagClick(tag); setShowOpts(false) }}
//                             className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//                         >
//                             {tag.name}
//                         </li>)
//                     ))}
//                 </ul>
//                 }
//             </div>

//             <div className="flex flex-wrap mt-2">
//                 {selectedTags.map((tag) => (
//                     <div key={tag.id} className="flex items-center mr-2 mb-2">
//                         <div className="px-3 py-2 m-2 bg-blue-500 text-black rounded-lg">
//                             {tag.name}
//                         </div>
//                         <button
//                             className="ml-2 text-red-500"
//                             onClick={() => handleRemoveTag(tag)}
//                         >
//                             x
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default TagsInput;
