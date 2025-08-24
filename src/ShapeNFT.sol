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
import {IERC6551Registry} from "erc6551/src/interfaces/IERC6551Registry.sol";
import {ACCOUNT_V3_IMPLEMENTATION, ERC6551_REGISTRY} from "@shape-nft/libs/TokenAddresses.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

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
    using Strings for uint256;

    //*//////////////////////////////////////////////////////////////////////////
    //                                  STORAGE
    //////////////////////////////////////////////////////////////////////////*//

    // keccak256("MINTER_ROLE")
    bytes32 public constant MINTER_ROLE = 0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6;

    //*//////////////////////////////////////////////////////////////////////////
    //                         CONSTRUCTOR & INITIALIZER
    //////////////////////////////////////////////////////////////////////////*//

    /// @notice Disables initializers for the implementation contract
    constructor() {
        _disableInitializers();
    }

    /// @notice Initializes the contract
    /// @param _defaultAdmin Default admin address
    /// @param _name ERC721 name
    /// @param _imageUri Token image URI
    function initialize(address _defaultAdmin, string calldata _name, string calldata _imageUri)
        public
        initializer
        returns (address tbaAddress_)
    {
        __ERC721_init(_name, "ARTIFUSION");
        __ERC721Enumerable_init();
        __ERC721URIStorage_init();
        __ERC721Royalty_init();
        __AccessControl_init();
        _setDefaultRoyalty(_defaultAdmin, 50); // 0.5%
        _grantRole(DEFAULT_ADMIN_ROLE, _defaultAdmin);
        _grantRole(MINTER_ROLE, _defaultAdmin);
        _grantRole(MINTER_ROLE, msg.sender);

        _safeMint(_defaultAdmin, 1);
        _setTokenURI(1, _generateTokenURI(1, _imageUri));
        tbaAddress_ = IERC6551Registry(ERC6551_REGISTRY).createAccount(
            ACCOUNT_V3_IMPLEMENTATION, "", block.chainid, address(this), 1
        );
    }

    //*//////////////////////////////////////////////////////////////////////////
    //                             EXTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*//

    /// @notice Mints a new token
    /// @param _to Address to mint the token to
    /// @param _imageUri Token image URI
    /// @return tokenId_ Token ID
    /// @return tbaAddress_ Tokenbound Account address
    function mint(address _to, string calldata _imageUri)
        external
        onlyRole(MINTER_ROLE)
        returns (uint256 tokenId_, address tbaAddress_)
    {
        tokenId_ = totalSupply() + 1;
        _safeMint(_to, tokenId_);
        _setTokenURI(tokenId_, _generateTokenURI(tokenId_, _imageUri));
        tbaAddress_ = IERC6551Registry(ERC6551_REGISTRY).createAccount(
            ACCOUNT_V3_IMPLEMENTATION, "", block.chainid, address(this), tokenId_
        );
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
        _requireOwned(_tokenId);
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

    function _generateTokenURI(uint256 _tokenId, string calldata _imageUri) internal pure returns (string memory) {
        return string.concat(
            "{",
            '"name": "ArtiFusion #',
            _tokenId.toString(),
            '",',
            '"description": "ArtiFusion is a collection of AI generated art",',
            '"image": "',
            _imageUri,
            '"}'
        );
    }
}
