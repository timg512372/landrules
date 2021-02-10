pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/AccessControl.sol";

contract DeedFactory is AccessControl {
    struct Deed {
        uint256 deedId;
        string name;
        /* like an ENUM:
            P = Pending
            C = Confirmed
            R = Rejected
            D = Disputed

            Testing this will be annoying since we'd need multiple different metamask accounts with 
            different permissions to be able to edit different things.
            */
        string status;
        
        string comments;
        string jsonHash;
        string coordinates;
    }

    Deed[] public deedArray;

    mapping(uint256 => address) internal _balances;
    mapping(address => uint256) internal ownerTokenCount;

    //mapping of user address to Deed
    mapping(address => Deed) internal userDeeds;
    //mapping of deedID to user address
    mapping(uint256 => address) internal _users;
    
    bytes32 public constant ADMINS = keccak256('ADMINS');
    
    modifier ownsDeed(uint256 _deedId) {
        require(
            (_balances[_deedId] == msg.sender),
            "You don't own the deed!"
        );
        _;
    }

    modifier onlyOwners() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not The Owner");
        _;
    }

    modifier onlyAdmins() {
        require(
            hasRole(ADMINS, msg.sender) ||
                hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Not An Admin"
        );
        _;
    }

    constructor() public {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function setAdminAuthorization(address _minter, bool status) external onlyOwners {
        if (status == true) {
            grantRole(ADMINS, _minter);
        } else {
            revokeRole(ADMINS, _minter);
        }
    }

    function getAdminAuthorization(address _minter) external view returns (bool) {
        return hasRole(ADMINS, _minter);
    }

    function getDeedByOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](ownerTokenCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < deedArray.length; i++) {
            if (_balances[i] == msg.sender) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // Make a new deed
     function newDeed(string calldata _name, string calldata _jsonHash, string calldata _coordinates) external {
            //where to get deed ID? 
            //what to do with name
            //not sure what balances and ownerTokenCount do, but we should have a mapping of deedID to address
            Deed newDeed = Deed(123, '', 'P', '', _jsonHash, _coordinates);
            deedArray.push(newDeed);
            uint256 id = deedArray.length - 1;
            balances[id][msg.sender] = 1;
            userDeeds[msg.sender] = newDeed;
            _users[newDeed.deedId] = msg.sender;
     }
    
    // Tranfer a deed from one person to another
     //function transferDeed(uint _deedId, address _newOwner) external ownsDeed(_deedId) {
        
    // }
    
    // For admins to set the status of a deed
    function setStatus(string calldata _status, uint _deedId) onlyAdmins {
        deed = deedArray[deedId];
        deed.status = _status;
     }
}
