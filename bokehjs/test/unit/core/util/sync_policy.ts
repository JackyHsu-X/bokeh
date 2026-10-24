import {expect} from "#framework/assertions"

import {delay} from "@bokehjs/core/util/defer"
import {SyncPolicyQueue} from "@bokehjs/core/util/sync_policy"

describe("core/util/sync_policy module", () => {
  it("should cancel only the exact key when replacing a pending value", async () => {
    const delivered: string[] = []
    const queue = new SyncPolicyQueue<string>((value) => delivered.push(value))

    queue.submit("value\x00debounce\x00100", ["debounce", 100], "long", false)
    queue.submit("value\x00debounce\x0010", ["debounce", 10], "short", false)

    await delay(30)
    expect(delivered).to.be.equal(["short"])

    await delay(100)
    expect(delivered).to.be.equal(["short", "long"])
  })
})
