//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.21 <8.10.0;
pragma experimental ABIEncoderV2;

contract Aadhar {


    address admin;
       address[] public verifiersArr;
    mapping(address => bool) verifiers;
    uint public verifierCount = 0;
    mapping(address => uint) public upvoteCount;
    mapping(address => uint) public downvoteCount;
  
    mapping( address => mapping( address => bool ) ) public voteStatus;
    


    constructor()  
    {
        admin = msg.sender;
    }

    modifier isAdmin {
        require(
            admin == msg.sender,
            "only admin is allowed to operate this functionality"
        );
        _;
    }

   
    modifier isVerifier {
         require(
            verifiers[msg.sender]==true,
            "Only verifier is allowed to operate this functionality"
        );
        _;
        
    }

    address[] public activeRequests;
    uint public activeRequestsLength =0;
    struct Organization {
        uint type_org;
        address orgAddress;
        string pic_hash;
        string name;
        string contactNo;
        bool isVerified;
        bool isRejected;
        string about;
        string phyAdd;
        string email;
    }



    struct Person_data {
         address org_address;
        uint org_type;
        string org_name;
        string doc_title;
        string Description;
        string Hash; //hash of the doc
        uint256 timeStamp; //use "now" to store current time
    }


    struct Person {
         string name;
        string pic_hash;
        string AadharNo;
        string dob;
        string contactNo;
        string Gender;
        string phyAddress;
        address ethAddress;
        Person_data[] Edu_data;
        Person_data[] Crime_data;
        Person_data[] Med_data;
    }

    mapping(address => Person) public address_person_map;
    mapping(address => Organization) public address_edu_map;
    mapping(address => Organization) public address_crime_map;
    mapping(address => Organization) public address_med_map;

    mapping(address => bool) public exists_address_person_map;
    mapping(address => bool) public exists_address_edu_map;
    mapping(address => bool) public exists_address_crime_map;
    mapping(address => bool) public exists_address_med_map;

    mapping(address => bool) public verified_address_edu_map;
    mapping(address => bool) public verified_address_crime_map;
    mapping(address => bool) public verified_address_med_map;


    function addVerifier(address verifier) public isAdmin returns(bool){
         if(verifiers[verifier]){
            revert(" Already exists");
        }
         verifierCount +=1;
        verifiers[verifier]=true;
        verifiersArr.push(verifier);
        return true;

    }
    function removeVerifier(address verifier) public isAdmin returns(bool){

         if(!verifiers[verifier]){
            revert(" Not exists");
        }
        verifiers[verifier]  = false;
        delete verifiers[verifier];
         verifierCount -=1;
            uint256 ind = 1000000;
        for (uint256 i = 0; i < verifiersArr.length; i++) {
            if (verifiersArr[i] == verifier) {
                ind = i;
                break;
            }
        }
        if (ind == 1000000) revert("Verifier not present");
        verifiersArr[ind] = verifiersArr[verifiersArr.length - 1];
        verifiersArr.pop();
    
        return true;

    }


    function registerOrg (
        address org_address,
        string memory name,
        uint type_org,
        string memory pic_hash,
        string memory contactNo,
        string memory about,
        string memory phyAdd,
        string memory email
) public {
    if (exists_address_edu_map[org_address]  || exists_address_med_map[org_address] || exists_address_crime_map[org_address] ){
            revert("Org Already Exists");
        }
            Organization memory org = Organization(type_org,org_address, pic_hash, name, contactNo, false, false, about, phyAdd, email);
        
            if(type_org == 0){
                
                upvoteCount[org_address] = 0;
                downvoteCount[org_address]=0;
                address_edu_map[org_address] = org;
                exists_address_edu_map[org_address] = true;
                activeRequests.push(org_address);
                activeRequestsLength +=1;
               
            } else if (type_org == 1){
               
                  upvoteCount[org_address] = 0;
                downvoteCount[org_address]=0;
                address_crime_map[org_address] = org;
                exists_address_crime_map[org_address] = true;
                 activeRequests.push(org_address);
                 activeRequestsLength +=1;
               
            } else if(type_org==2){
               
                  upvoteCount[org_address] = 0;
                downvoteCount[org_address]=0;
                address_med_map[org_address] = org;
                exists_address_med_map[org_address] = true;
                 activeRequests.push(org_address);
                activeRequestsLength +=1;
            }else{
                revert("Wrong Type!");
            }

          
        }

  
    function removeRequest(address org) internal {
    
        for(uint i=0;i<activeRequests.length;i++)
        {
            if(activeRequests[i]==org)
            {
                activeRequests[i]=activeRequests[activeRequests.length-1];
                activeRequests.pop();
                activeRequestsLength -=1;
                break;
            }
        }
        return;

    }

    function registerPerson(
      address person_address,
        string memory pic_hash,
        string memory name,
        string memory Gender,
        string memory AadharNo,
        string memory phyAddress,
        string memory dob,
        string memory contactNo
    ) public {
        Person storage per = address_person_map[person_address];
        per.name = name;
        per.pic_hash = pic_hash;
        per.Gender = Gender;
        per.AadharNo = AadharNo;
        per.dob = dob;
        per.ethAddress = person_address;
        per.phyAddress = phyAddress;
        per.contactNo = contactNo;

        exists_address_person_map[person_address] = true;
    }

    function getPerson(address person_address) public view returns (Person memory){
        return address_person_map[person_address];
    }

    function getOrg(address org_address) public view returns (Organization memory){
        if(exists_address_edu_map[org_address]){ return address_edu_map[org_address]; }
        else if(exists_address_med_map[org_address]){ return address_med_map[org_address]; }
        else if(exists_address_crime_map[org_address]){ return address_crime_map[org_address]; }
        return address_edu_map[org_address];
    }

    function getDocsList(address user_address, uint org_type) public view returns (Person_data [] memory){
        Person memory user = address_person_map[user_address];
        if(org_type == 0){ return user.Edu_data; }
        else if(org_type == 1){ return user.Crime_data; }
        else{ return user.Med_data; }
    }

    function checkRole(address my_address) public view returns (uint256) {
        if(my_address == admin) {return 1;}
        if(exists_address_person_map[my_address] == true){ return 2; }
        if(exists_address_edu_map[my_address] == true){ return 3; }
        if(exists_address_med_map[my_address] == true){ return 4; }
        if(exists_address_crime_map[my_address] == true){ return 5; }
        if(verifiers[my_address]){return 6;}
        return 0;
    }

    function addPersonDoc(
        address person_address,
        uint org_type,
        address org_address,
        string memory doc_hash,
        string memory doc_title,
        string memory Description
    ) public {
        require(
            verified_address_edu_map[org_address] ||
                verified_address_crime_map[org_address] ||
                verified_address_med_map[org_address],
            "ORGANISATION NOT VERIFIED!"
        );
        require(
            exists_address_person_map[person_address],
            "PERSON DOES NOT EXIST!"
        );
        Person storage per = address_person_map[person_address];
        string memory org_name = "";
        if(org_type == 0){ org_name = address_edu_map[org_address].name; }
        else if(org_type == 1){ org_name = address_crime_map[org_address].name; }
        else if(org_type == 2){ org_name = address_med_map[org_address].name; }
        Person_data memory tempData = Person_data(
                org_address,
                org_type,
                org_name,
                doc_title,
                Description,
                doc_hash,
                block.timestamp
        );
        if(org_type == 0){ per.Edu_data.push(tempData); }
        else if(org_type == 1){ per.Crime_data.push(tempData); }
        else if(org_type == 2){ per.Med_data.push(tempData); }
        
    }

  
     function upvoteRequest(address org) public isVerifier returns(bool){
        
        if (!(exists_address_edu_map[org]  || exists_address_med_map[org] || exists_address_crime_map[org]) ){
            revert("Org not found");
        }
        if(voteStatus[msg.sender][org]){
            revert("Already Voted");
        }
        
        voteStatus[msg.sender][org]=true;
        upvoteCount[org]+=1;
        if(upvoteCount[org]>verifierCount/2)
            verifyOrg(org);
        return true;


    }

    function downvoteRequest(address org) public isVerifier returns(bool){
       if (!(exists_address_edu_map[org]  || exists_address_med_map[org] || exists_address_crime_map[org]) ){
            revert("Org not found");
        }
        if(voteStatus[msg.sender][org]){
            revert("Already Voted");
        }
        voteStatus[msg.sender][org]=true;
        downvoteCount[org]+=1;
        if( (verifierCount%2==0 &&  downvoteCount[org]>= verifierCount/2 ) || (verifierCount%2==1 &&  downvoteCount[org]> verifierCount/2 )  )
            unverifyOrg(org);
        return true;

    }


    function verifyOrg(address org_address) internal {
        removeRequest(org_address);
        if(exists_address_edu_map[org_address]){ verifyEduOrg(org_address); }
        else if(exists_address_med_map[org_address]){ verifyMedOrg(org_address); }
        else if(exists_address_crime_map[org_address]){ verifyCrimeOrg(org_address); }
        else{
            revert("No org found");
        }
    }

    function unverifyOrg(address org_address) internal {
        removeRequest(org_address);
        if(exists_address_edu_map[org_address]){ unverifyEduOrg(org_address); }
        else if(exists_address_med_map[org_address]){ unverifyMedOrg(org_address); }
        else if(exists_address_crime_map[org_address]){ unverifyCrimeOrg(org_address); }
        else{
            revert("No org found");
        }
    }

    function verifyEduOrg(address org_address) internal {
        require(
            exists_address_edu_map[org_address],
            "ORGANISATION DOES NOT EXIST!"
        );
        Organization storage temporg = address_edu_map[org_address];
        temporg.isVerified = true;
        verified_address_edu_map[org_address] = true;
    }

    function unverifyEduOrg(address org_address) internal {
        require(
            exists_address_edu_map[org_address],
            "ORGANISATION DOES NOT EXIST!"
        );
        Organization storage temporg = address_edu_map[org_address];
        temporg.isRejected = true;
        verified_address_edu_map[org_address] = false;
    }

    function verifyCrimeOrg(address org_address) internal {
        require(
            exists_address_crime_map[org_address],
            "ORGANISATION DOES NOT EXIST!"
        );
        Organization storage temporg = address_crime_map[org_address];
        temporg.isVerified = true;
        verified_address_crime_map[org_address] = true;
    }

    function unverifyCrimeOrg(address org_address)internal {
        require(
            exists_address_crime_map[org_address],
            "ORGANISATION DOES NOT EXIST!"
        );
        Organization storage temporg = address_crime_map[org_address];
        temporg.isRejected = true;
        verified_address_crime_map[org_address] = false;
    }

    function verifyMedOrg(address org_address) internal {
        require(
            exists_address_med_map[org_address],
            "ORGANISATION DOES NOT EXIST!"
        );
        Organization storage temporg = address_med_map[org_address];
        temporg.isVerified = true;
        verified_address_med_map[org_address] = true;
    }

    function unverifyMedOrg(address org_address) internal {
        require(
            exists_address_med_map[org_address],
            "ORGANISATION DOES NOT EXIST!"
        );
        Organization storage temporg = address_med_map[org_address];
        temporg.isRejected = true;
        verified_address_med_map[org_address] = true;
    }

   
}