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

import { external, EOF, merge, collect } from "../../src/mod.ts";
import { waitTicks } from "../utils.ts";

Mocha.describe("merge()", function() {
  Mocha.it("merges multiple observables", async function() {
    const { observable: o1, next: n1 } = external<number>();
    const { observable: o2, next: n2 } = external<number>();
    const { observable: o3, next: n3 } = external<number>();
    const list = collect(merge(o1, o2, o3));

    const steps = [
      () => n1(0),
      () => n2(1),
      () => n3(2),
      () => n1(3),
      () => n1(4),
      () => n2(5),
      () => n1(6),
      () => n3(7),
      () => n3(EOF),
      () => n2(8),
      () => n2(EOF),
      () => n1(9),
      () => n1(EOF)
    ];

    for (const step of steps) {
      step();
      await waitTicks();
    }

    chai.expect(await list).to.deep.equal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
