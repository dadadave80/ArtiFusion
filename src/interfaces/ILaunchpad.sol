// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

interface ILaunchpad {
    function createCollection(string calldata name, string calldata symbol, string calldata uri)
        external
        returns (address collection_);

    function mintFromCollection(address _collection, address _to, string calldata _uri)
        external
        returns (uint256 tokenId_, address tbaAddress_);

    function getShapeNFTsByOwner(address _owner) external view returns (address[] memory);

    function getShapeNFTs() external view returns (address[] memory);
}
