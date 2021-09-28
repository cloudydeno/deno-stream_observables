/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Mocha, chai } from "../deno-shim.ts";
import { fromIterable, extractFirst } from "../../src/mod.ts";

Mocha.describe("extractFirst()", function() {
  Mocha.it("returns the first item", async function() {
    const item = await extractFirst(fromIterable([1, 2]));
    chai.expect(item).to.equal(1);
  });

  Mocha.it("throws if no items are emitted", function(done) {
    extractFirst(fromIterable([]))
      .then(() => done("first() did not throw"))
      .catch(() => done());
  });

  Mocha.it("can be used multiple times", async function() {
    const o = fromIterable([1, 2]);
    let item;
    item = await extractFirst(o);
    chai.expect(item).to.equal(1);
    item = await extractFirst(o);
    chai.expect(item).to.equal(2);
  });
});
