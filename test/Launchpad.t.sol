// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Test} from "forge-std/Test.sol";
import {IShapeNFT} from "../src/interfaces/IShapeNFT.sol";
import {ILaunchpad} from "../src/interfaces/ILaunchpad.sol";
import {DeployLaunchpad} from "../script/DeployLaunchpad.s.sol";
import {ERC6551_REGISTRY} from "@shape-nft/libs/TokenAddresses.sol";
import {ERC6551Registry} from "erc6551/src/ERC6551Registry.sol";

contract LaunchpadTest is Test {
    ILaunchpad private launchpad;
    address owner = makeAddr("owner");
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");

    function setUp() public {
        DeployLaunchpad deployLaunchpad = new DeployLaunchpad();
        launchpad = ILaunchpad(deployLaunchpad.run());
        vm.etch(ERC6551_REGISTRY, address(new ERC6551Registry()).code);
    }

    function testDeployLaunchpad() public view {
        assertNotEq(address(launchpad), address(0));
    }

    function testCreateCollection() public {
        vm.prank(alice);
        launchpad.createCollection("Test", "https://test.com");
        assertEq(launchpad.getShapeNFTs().length, 1);
        assertEq(launchpad.getShapeNFTsByOwner(alice).length, 1);
        assertEq(launchpad.getShapeNFTsByOwner(alice)[0], launchpad.getShapeNFTs()[0]);
    }

    function testMintToCollection() public {
        vm.prank(owner);
        launchpad.grantRole(launchpad.MINTER_ROLE(), alice);
        vm.prank(alice);
        launchpad.createCollection("Test", "https://test.com");
        launchpad.mintToCollection(launchpad.getShapeNFTs()[0], bob, "https://bob.com");
        assertEq(launchpad.getShapeNFTs().length, 1);
        assertEq(IShapeNFT(launchpad.getShapeNFTs()[0]).balanceOf(bob), 1);
    }
}
