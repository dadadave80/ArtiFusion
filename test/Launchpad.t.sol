// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Test} from "forge-std/Test.sol";
import {IShapeNFT} from "../src/interfaces/IShapeNFT.sol";
import {ILaunchpad} from "../src/interfaces/ILaunchpad.sol";
import {DeployLaunchpad} from "../script/DeployLaunchpad.s.sol";

contract LaunchpadTest is Test {
    ILaunchpad private launchpad;

    function setUp() public {
        DeployLaunchpad deployLaunchpad = new DeployLaunchpad();
        launchpad = ILaunchpad(deployLaunchpad.run());
    }

    function testDeployLaunchpad() public view {
        assertNotEq(address(launchpad), address(0));
    }

    function testCreateCollection() public {
        launchpad.createCollection("Test", "TEST", "https://test.com");
        assertEq(launchpad.getShapeNFTs().length, 1);
        assertEq(launchpad.getShapeNFTsByOwner(address(this)).length, 1);
        assertEq(launchpad.getShapeNFTsByOwner(address(this))[0], launchpad.getShapeNFTs()[0]);
    }
}
