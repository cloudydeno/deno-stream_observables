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

import { Observable } from "../types.ts";
import { external } from "./external.ts";

/**
 * Creates an observable that will forever emit `null` every `ms` milliseconds.
 *
 * @param ms Milliseconds between each emit.
 * @returns New observable that emits null values.
 */
export function fromTimer(ms: number): Observable<null> {
  let timer: number | null = null;
  const { next, observable } = external<null>(() => {
    if (typeof timer !== 'number') return;
    clearInterval(timer);
  });
  timer = setInterval(next, ms);
  return observable;
}
