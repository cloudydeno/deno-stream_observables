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
import { external, amb, collect, EOF } from "../../src/index.ts";
import { waitTicks } from "../utils.ts";

Mocha.describe("amb()", function() {
  Mocha.it(
    "emits items from the observable that emits first",
    async function() {
      const { observable: o1, next: n1 } = external<number>();
      const { observable: o2, next: n2 } = external<number>();
      const { observable: o3, next: n3 } = external<number>();

      const list = collect(amb(o1, o2, o3));

      const steps = [
        () => n3(0),
        () => n1(EOF),
        () => n2(1),
        () => n2(10),
        () => n3(100),
        () => n3(EOF)
      ];

      for (const step of steps) {
        step();
        await waitTicks();
      }

      chai.expect(await list).to.deep.equal([0, 100]);
    }
  );
});
