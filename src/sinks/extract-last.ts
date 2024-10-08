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

/**
 * Resolves with the last element emitted by the observable.
 * If no items are emitted the promise is rejected.
 *
 * @typeparam T Type of items emitted by the observable.
 * @param o Observable to extract from.
 * @returns Promise that resolves with a single item.
 */
export async function extractLast<T>(o: Observable<T>): Promise<T> {
  const reader = o.getReader();
  let latestValue: T | undefined;
  let hasLatestValue = false;
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    latestValue = value!;
    hasLatestValue = true;
  }
  if (!hasLatestValue) {
    throw new Error("Observable finished without emitting any items");
  }
  return latestValue!;
}
