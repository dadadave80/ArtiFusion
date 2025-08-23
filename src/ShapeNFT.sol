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

    constructor() {
        _disableInitializers();
    }

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

    function tokenURI(uint256 _tokenId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return ERC721URIStorageUpgradeable.tokenURI(_tokenId);
    }

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
    //                               INTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*//

    function _increaseBalance(address _account, uint128 _amount)
        internal
        virtual
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    {
        ERC721EnumerableUpgradeable._increaseBalance(_account, _amount);
    }

    function _update(address _to, uint256 _tokenId, address _auth)
        internal
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (address)
    {
        return ERC721EnumerableUpgradeable._update(_to, _tokenId, _auth);
    }
}
