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
import { just, collect } from "../../src/mod.ts";

Mocha.describe("just()", function() {
  Mocha.it("emits just one item", async function() {
    const observable = just(1);
    const reader = observable.getReader();
    chai.expect(await reader.read()).to.deep.equal({
      value: 1,
      done: false
    });
    chai.expect(await reader.read()).to.deep.equal({
      value: undefined,
      done: true
    });
  });
  Mocha.it("emits a set of items", async function() {
    const list = await collect(just(1, 2, 3));

    chai.expect(list).to.deep.equal([1, 2, 3]);
  });
});
