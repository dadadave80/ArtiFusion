// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {ERC721EnumerableUpgradeable} from
    "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import {ERC721URIStorageUpgradeable} from
    "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import {ERC721RoyaltyUpgradeable} from
    "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721RoyaltyUpgradeable.sol";

/// @title ShapeNFT
/// @author ShapeNFT Team
/// @notice ERC721 token x AI
contract ShapeNFT is
    ERC721Upgradeable,
    ERC721RoyaltyUpgradeable,
    ERC721EnumerableUpgradeable,
    ERC721URIStorageUpgradeable,
    AccessControlUpgradeable
{
    //*//////////////////////////////////////////////////////////////////////////
    //                         CONSTRUCTOR & INITIALIZER
    //////////////////////////////////////////////////////////////////////////*//

    /// @notice Disables initializers
    constructor() {
        _disableInitializers();
    }

    /// @notice Initializes the contract
    /// @param _defaultAdmin Default admin address
    /// @param _name ERC721 name
    /// @param _symbol ERC721 symbol
    function initialize(address _defaultAdmin, string calldata _name, string calldata _symbol) public initializer {
        __ERC721_init(_name, _symbol);
        __ERC721Enumerable_init();
        __ERC721URIStorage_init();
        __ERC721Royalty_init();
        __AccessControl_init();
        _setDefaultRoyalty(_defaultAdmin, 5000); // 0.5%
        _grantRole(DEFAULT_ADMIN_ROLE, _defaultAdmin);
    }

    //*//////////////////////////////////////////////////////////////////////////
    //                               VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*//

    /// @notice Returns the token URI
    /// @param _tokenId Token ID
    /// @return Token URI
    function tokenURI(uint256 _tokenId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return ERC721URIStorageUpgradeable.tokenURI(_tokenId);
    }

    /// @notice Returns whether the contract supports the interface
    /// @param _interfaceId Interface ID
    /// @return Whether the contract supports the interface
    function supportsInterface(bytes4 _interfaceId)
        public
        view
        override(
            ERC721Upgradeable,
            ERC721RoyaltyUpgradeable,
            ERC721EnumerableUpgradeable,
            ERC721URIStorageUpgradeable,
            AccessControlUpgradeable
        )
        returns (bool)
    {
        return super.supportsInterface(_interfaceId);
    }

    //*//////////////////////////////////////////////////////////////////////////
    //                             INTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*//

    /// @notice Increases the balance of an account
    /// @param _account Account address
    /// @param _amount Amount to increase
    function _increaseBalance(address _account, uint128 _amount)
        internal
        virtual
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    {
        ERC721EnumerableUpgradeable._increaseBalance(_account, _amount);
    }

    /// @notice Updates the token owner
    /// @param _to New owner address
    /// @param _tokenId Token ID
    /// @param _auth Authorization address
    /// @return New owner address
    function _update(address _to, uint256 _tokenId, address _auth)
        internal
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (address)
    {
        return ERC721EnumerableUpgradeable._update(_to, _tokenId, _auth);
    }
}
