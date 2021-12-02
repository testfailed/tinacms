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

export * from './edit-state-ctx'

import React from 'react'

export const TinaContext = React.createContext<{
  onQuery: React.Dispatch<React.SetStateAction<string>>
  onVariables: React.Dispatch<React.SetStateAction<object>>
  state: {
    isLoading: boolean
    payload: object
  }
}>({
  onQuery: () => {},
  onVariables: () => {},
  state: {
    // isLoading: true
    // FIXME: this is just a fake out to tell our hook that we're still loading data
    // in reality we'll want to refactor useGraphQLForms a bit to properly support
    // this new pattern
    isLoading: true,
    payload: {},
  },
})