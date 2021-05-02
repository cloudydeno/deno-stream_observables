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
import { fromNext, EOF } from "../../src/mod.ts";

Mocha.describe("fromNext()", function() {
  Mocha.it("emits when next() is called", async function() {
    const observable = fromNext(next => {
      next(1);
      next(2);
      next(EOF);
    });
    const reader = observable.getReader();
    chai.expect(await reader.read()).to.deep.equal({
      value: 1,
      done: false
    });
    chai.expect(await reader.read()).to.deep.equal({
      value: 2,
      done: false
    });
    chai.expect(await reader.read()).to.deep.equal({
      value: undefined,
      done: true
    });
  });
});
