// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {IShapeNFT} from "@shape-nft/interfaces/IShapeNFT.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract Launchpad is AccessControl {
    using Clones for address;
    using EnumerableSet for EnumerableSet.AddressSet;

    //*//////////////////////////////////////////////////////////////////////////
    //                                   EVENTS
    //////////////////////////////////////////////////////////////////////////*//

    event CollectionCreated(address indexed collection, address indexed owner);
    event TokenMinted(address indexed collection, uint256 tokenId, address indexed owner, address indexed tbaAddress);

    //*//////////////////////////////////////////////////////////////////////////
    //                                  STORAGE
    //////////////////////////////////////////////////////////////////////////*//

    // keccak256("MINTER_ROLE")
    bytes32 public constant MINTER_ROLE = 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6;
    address private _shapeNFTBeacon;
    EnumerableSet.AddressSet private _shapeNFTs;
    mapping(address => EnumerableSet.AddressSet) private _shapeNFTsByOwner;

    //*//////////////////////////////////////////////////////////////////////////
    //                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////////////////*//

    /// @notice Initializes the contract
    /// @param _defaultAdmin Default admin address
    /// @param __shapeNFTBeacon ShapeNFT beacon address
    constructor(address _defaultAdmin, address __shapeNFTBeacon) {
        _shapeNFTBeacon = __shapeNFTBeacon;
        _grantRole(DEFAULT_ADMIN_ROLE, _defaultAdmin);
        _grantRole(MINTER_ROLE, _defaultAdmin);
    }

    //*//////////////////////////////////////////////////////////////////////////
    //                             EXTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*//

    /// @notice Creates a new collection
    /// @param _name ERC721 name
    /// @param _imageUri Token image URI
    /// @return collection_ Collection address
    function createCollection(string calldata _name, string calldata _imageUri)
        external
        returns (address collection_)
    {
        collection_ = _shapeNFTBeacon.clone();
        IShapeNFT(collection_).initialize(msg.sender, _name, _imageUri);
        _shapeNFTs.add(collection_);
        _shapeNFTsByOwner[msg.sender].add(collection_);
        emit CollectionCreated(collection_, msg.sender);
    }

    /// @notice Mints a new token from a collection
    /// @param _collection Collection address
    /// @param _to Address to mint the token to
    /// @param _imageUri Token image URI
    /// @return tokenId_ Token ID
    /// @return tbaAddress_ Tokenbound Account address
    function mintToCollection(address _collection, address _to, string calldata _imageUri)
        external
        onlyRole(MINTER_ROLE)
        returns (uint256 tokenId_, address tbaAddress_)
    {
        (tokenId_, tbaAddress_) = IShapeNFT(_collection).mint(_to, _imageUri);
        emit TokenMinted(_collection, tokenId_, _to, tbaAddress_);
    }

    //*//////////////////////////////////////////////////////////////////////////
    //                             VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*//

    /// @notice Returns the ShapeNFTs by owner
    /// @param _owner Owner address
    /// @return ShapeNFTs by owner
    function getShapeNFTsByOwner(address _owner) external view returns (address[] memory) {
        return _shapeNFTsByOwner[_owner].values();
    }

    /// @notice Returns the ShapeNFTs
    /// @return ShapeNFTs
    function getShapeNFTs() external view returns (address[] memory) {
        return _shapeNFTs.values();
    }

    /// @notice Returns the ShapeNFT beacon
    /// @return ShapeNFT beacon
    function getShapeNFTBeacon() external view returns (address) {
        return _shapeNFTBeacon;
    }
}
