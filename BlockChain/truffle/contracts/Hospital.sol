// pragma solidity ^0.8.0;

// contract Hospital {
//     struct Doctor {
//         uint256 id;
//         string name;
//         string specialty;
//     }
    
//     struct Patient {
//         uint256 id;
//         string name;
//         uint256 age;
//     }
    
//     struct HealthRecord {
//         uint256 patientId;
//         string xray;
//         string format;
//     }
    
//     mapping (uint256 => Doctor) public doctors;
//     mapping (uint256 => Patient) public patients;
//     mapping (uint256 => HealthRecord) public healthRecords;
    
//     uint256 public nextDoctorId=1;
//     uint256 public nextPatientId=1;
//     uint256 public nextHealthRecordId=1;
    
//     function createDoctor(string memory name, string memory specialty) public {
//         doctors[nextDoctorId] = Doctor(nextDoctorId, name, specialty);
//         nextDoctorId++;
//     }
    
//     function createPatient(string memory name, uint256 age) public {
//         patients[nextPatientId] = Patient(nextPatientId, name, age);
//         createHealthRecord(nextPatientId,'','');
//         nextPatientId++;
//     }
    
//     function createHealthRecord(uint256 patientId, string memory xray,string memory format) public {
//         healthRecords[patientId] = HealthRecord(patientId,xray,format);
//         // nextHealthRecordId++;
//     }
    
//     function updateDoctor(uint256 id, string memory name, string memory specialty) public {
//         doctors[id] = Doctor(id, name, specialty);
//     }
    
//     function updatePatient(uint256 id, string memory name, uint256 age) public {
//         patients[id] = Patient(id, name, age);
//     }
    
//     function updateHealthRecord(uint256 patientId,string memory xray, string memory format) public {
//         healthRecords[patientId] = HealthRecord(patientId, xray,format);
//     }
    
//     function deleteDoctor(uint256 id) public {
//         delete doctors[id];
//     }
    
//     function deletePatient(uint256 id) public {
//         delete patients[id];
//         delete healthRecords[id];
//     }
    
//     function deleteHealthRecord(uint256 id) public {
//         delete healthRecords[id];
//     }
    
//     function getXray(uint256 id) public view returns (string memory) {
//         return healthRecords[id].xray;
//     }
    
//     function updateXray(uint256 id, string memory xray) public {
//         healthRecords[id].xray = xray;
//     }
// }

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InsurancePlatform {
    address public owner;
    uint256 public premiumAmount;
    uint256 public coverageAmount;
    uint256 public policyDuration;
    mapping(address => uint256) public policyHolders;
    mapping(address => bool) public hasClaimed;

    event PolicyPurchased(address indexed buyer, uint256 amount, uint256 expiration);
    event ClaimFiled(address indexed claimant, uint256 amount);
    event TransferToPolicyHolder(address indexed policyHolder, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyPolicyHolder() {
        require(policyHolders[msg.sender] > 0, "Only policyholder can call this function");
        _;
    }

    modifier hasNotClaimed() {
        require(!hasClaimed[msg.sender], "Claim already filed");
        _;
    }

    constructor(
        uint256 _premiumAmount,
        uint256 _coverageAmount,
        uint256 _policyDurationDays
    ) {
        owner = msg.sender;
        premiumAmount = _premiumAmount;
        coverageAmount = _coverageAmount;
        policyDuration = _policyDurationDays * 1 minutes;
    }

    receive() external payable {
        // This function is called when Ether is sent directly to the contract
        // It transfers the received Ether to the owner and deducts it from the owner's balance
        payable(owner).transfer(msg.value);
    }

    function purchasePolicy() external payable {
        require(msg.value == premiumAmount * 1 ether, "Incorrect premium amount sent");
        require(policyHolders[msg.sender] == 0, "Policy already purchased");

        // Transfer the premium amount in Ether to the owner
        payable(owner).transfer(msg.value);

        uint256 expirationTimestamp = block.timestamp + policyDuration;
        policyHolders[msg.sender] = expirationTimestamp;

        emit PolicyPurchased(msg.sender, msg.value, expirationTimestamp);
    }

    function transferToPolicyHolder(address policyHolder) external onlyOwner payable {
        require(policyHolders[policyHolder] > 0, "Invalid policyholder address");

        // Deduct the coverageAmount in Ether from the owner's external wallet
        // require(owner.balance >= coverageAmount * 1 ether, "Insufficient funds in owner's wallet");

        // Transfer the coverageAmount in Ether to the policyholder
        payable(policyHolder).transfer(2 ether);

        emit TransferToPolicyHolder(policyHolder, 2 ether);
    }

}
