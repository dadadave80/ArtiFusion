// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {IShapeNFT} from "@shape-nft/IShapeNFT.sol";

contract Factory {
    using Clones for address;
    using EnumerableSet for EnumerableSet.AddressSet;

    //*//////////////////////////////////////////////////////////////////////////
    //                                  STORAGE
    //////////////////////////////////////////////////////////////////////////*//

    address private _shapeNFTBeacon;
    EnumerableSet.AddressSet private _shapeNFTs;
    mapping(address => EnumerableSet.AddressSet) private _shapeNFTsByOwner;

    //*//////////////////////////////////////////////////////////////////////////
    //                             EXTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*//

    function createShapeNFT(string calldata _name, string calldata _symbol) public {
        address nft = _shapeNFTBeacon.clone();
        IShapeNFT(nft).initialize(msg.sender, _name, _symbol);
        _shapeNFTs.add(nft);
        _shapeNFTsByOwner[msg.sender].add(nft);
    }

    //*//////////////////////////////////////////////////////////////////////////
    //                             VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*//

    function getShapeNFTsByOwner(address _owner) public view returns (address[] memory) {
        return _shapeNFTsByOwner[_owner].values();
    }

    function getShapeNFTs() public view returns (address[] memory) {
        return _shapeNFTs.values();
    }
}
