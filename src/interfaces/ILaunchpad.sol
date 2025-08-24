// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {IAccessControl} from "@openzeppelin/contracts/access/IAccessControl.sol";

interface ILaunchpad is IAccessControl {
    function createCollection(string calldata name, string calldata uri) external returns (address collection);
    function mintToCollection(address collection, address to, string calldata imageUri)
        external
        returns (uint256 tokenId, address tbaAddress);
    function getShapeNFTsByOwner(address owner) external view returns (address[] memory);
    function getShapeNFTs() external view returns (address[] memory);
    function getShapeNFTBeacon() external view returns (address);
    function MINTER_ROLE() external pure returns (bytes32);
}
