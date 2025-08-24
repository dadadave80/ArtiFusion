// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

interface IShapeNFT {
    function initialize(address defaultAdmin, string calldata name, string calldata symbol, string calldata uri)
        external
        returns (address tbaAddress);
    function mint(address to, string calldata uri) external returns (uint256 tokenId, address tbaAddress);
}
