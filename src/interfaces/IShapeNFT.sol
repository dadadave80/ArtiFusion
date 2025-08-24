// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IShapeNFT is IERC721 {
    function initialize(address defaultAdmin, string calldata name, string calldata imageUri)
        external
        returns (address tbaAddress);
    function mint(address to, string calldata imageUri) external returns (uint256 tokenId, address tbaAddress);
}
