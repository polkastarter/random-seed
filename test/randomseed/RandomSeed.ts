import type { RandomSeed } from "../../src/types/contracts/RandomSeed";
import { Signers } from "../types";
import { shouldBehaveLikeRandomSeed } from "./RandomSeed.behavior";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
  });

  describe("RandomSeed", function () {
    beforeEach(async function () {
      const greeting: string = "Hello, world!";
      const randomSeedArtifact: Artifact = await artifacts.readArtifact("RandomSeed");
      this.randomSeed = <RandomSeed>await waffle.deployContract(this.signers.admin, randomSeedArtifact, []);
    });

    shouldBehaveLikeRandomSeed();
  });
});
