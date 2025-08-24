// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {IShapeNFT} from "@shape-nft/interfaces/IShapeNFT.sol";

contract Launchpad {
    using Clones for address;
    using EnumerableSet for EnumerableSet.AddressSet;

    event CollectionCreated(address indexed collection, address indexed owner);
    event TokenMinted(address indexed collection, uint256 tokenId, address indexed owner, address indexed tbaAddress);

    //*//////////////////////////////////////////////////////////////////////////
    //                                  STORAGE
    //////////////////////////////////////////////////////////////////////////*//

    address private _shapeNFTBeacon;
    EnumerableSet.AddressSet private _shapeNFTs;
    mapping(address => EnumerableSet.AddressSet) private _shapeNFTsByOwner;

    //*//////////////////////////////////////////////////////////////////////////
    //                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////////////////*//

    /// @notice Initializes the contract
    /// @param _shapeNFTBeacon_ ShapeNFT beacon address
    constructor(address _shapeNFTBeacon_) {
        _shapeNFTBeacon = _shapeNFTBeacon_;
    }

    //*//////////////////////////////////////////////////////////////////////////
    //                             EXTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*//

    /// @notice Creates a new collection
    /// @param _name ERC721 name
    /// @param _symbol ERC721 symbol
    /// @param _uri Token URI
    /// @return collection_ Collection address
    function createCollection(string calldata _name, string calldata _symbol, string calldata _uri)
        external
        returns (address collection_)
    {
        collection_ = _shapeNFTBeacon.clone();
        IShapeNFT(collection_).initialize(msg.sender, _name, _symbol, _uri);
        _shapeNFTs.add(collection_);
        _shapeNFTsByOwner[msg.sender].add(collection_);
        emit CollectionCreated(collection_, msg.sender);
    }

    /// @notice Mints a new token from a collection
    /// @param _collection Collection address
    /// @param _to Address to mint the token to
    /// @param _uri Token URI
    /// @return tokenId_ Token ID
    /// @return tbaAddress_ Tokenbound Account address
    function mintFromCollection(address _collection, address _to, string calldata _uri)
        external
        returns (uint256 tokenId_, address tbaAddress_)
    {
        (tokenId_, tbaAddress_) = IShapeNFT(_collection).mint(_to, _uri);
        emit TokenMinted(_collection, tokenId_, _to, tbaAddress_);
    }

    //*//////////////////////////////////////////////////////////////////////////
    //                             VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*//

    /// @notice Returns the ShapeNFTs by owner
    /// @param _owner Owner address
    /// @return ShapeNFTs by owner
    function getShapeNFTsByOwner(address _owner) public view returns (address[] memory) {
        return _shapeNFTsByOwner[_owner].values();
    }

    /// @notice Returns the ShapeNFTs
    /// @return ShapeNFTs
    function getShapeNFTs() public view returns (address[] memory) {
        return _shapeNFTs.values();
    }
}
