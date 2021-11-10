/**
Copyright 2021 Forestry.io Holdings, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export interface Store {
  glob(
    pattern: string,
    hydrator?: (fullPath: string) => Promise<object>
  ): Promise<string[]>
  get(filepath: string): Promise<object>
  clear(): void
  query(
    queryStrings: string[],
    hydrator?: (fullPath: string) => Promise<object>
  ): Promise<object[]>
  seed(
    filepath: string,
    data: object,
    options?: {
      includeTemplate?: boolean
    }
  ): Promise<void>
  /**
   * Whether this store supports the ability to index data.
   * Indexing data requires writing arbitrary keys/values to
   * the external service, so is not advisable to use for
   * something like Github, which would write commits to the
   * user's repo.
   */
  supportsIndexing(): boolean
  put(
    filepath: string,
    data: object,
    options?: {
      includeTemplate?: boolean
    }
  ): Promise<void>
}