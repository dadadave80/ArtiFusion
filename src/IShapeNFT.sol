// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

interface IShapeNFT {
    function initialize(address _defaultAdmin, string calldata _name, string calldata _symbol) external;
}
