import { expect } from "chai";

export function shouldBehaveLikeRandomSeed(): void {
  it("should have default values set", async function () {
    expect(await this.randomSeed.numWords()).to.equal(1);

    await this.randomSeed.connect(this.signers.admin).setSubscriptionId(1234);
    expect(await this.randomSeed.s_subscriptionId()).to.eq(1234);
  });
}
