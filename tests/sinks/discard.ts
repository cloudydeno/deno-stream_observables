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
import { fromIterable, discard } from "../../src/mod.ts";

Mocha.describe("discard()", function() {
  Mocha.it("calls a function for each value", async function() {
    const iterable = [1, 2, 3, 4];
    const result: number[] = [];
    await fromIterable(iterable).pipeTo(discard(v => result.push(v)));
    chai.expect(result).to.deep.equal(iterable);
  });
});
