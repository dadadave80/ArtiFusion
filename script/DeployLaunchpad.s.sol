// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Script} from "forge-std/Script.sol";
import {Launchpad} from "@shape-nft/Launchpad.sol";
import {ShapeNFT} from "@shape-nft/ShapeNFT.sol";
import {UpgradeableBeacon} from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

contract DeployLaunchpad is Script {
    function run() public returns (address launchpad_) {
        vm.broadcast();
        UpgradeableBeacon beacon = new UpgradeableBeacon(address(new ShapeNFT()), msg.sender);
        vm.broadcast();
        launchpad_ = address(new Launchpad(address(beacon)));
    }
}
