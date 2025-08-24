// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Script} from "forge-std/Script.sol";
import {Launchpad} from "@shape-nft/Launchpad.sol";
import {ShapeNFT} from "@shape-nft/ShapeNFT.sol";
import {UpgradeableBeacon} from "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import {BeaconProxy} from "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";

contract DeployLaunchpad is Script, Context {
    function run() public returns (address launchpad_) {
        vm.startBroadcast();
        UpgradeableBeacon beacon = new UpgradeableBeacon(address(new ShapeNFT()), _msgSender());
        BeaconProxy beaconProxy = new BeaconProxy(address(beacon), "");
        launchpad_ = address(new Launchpad(_msgSender(), address(beaconProxy)));
        vm.stopBroadcast();
    }
}
