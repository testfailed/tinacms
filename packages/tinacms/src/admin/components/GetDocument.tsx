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

import React, { useState, useEffect } from 'react'
import type { TinaCMS } from '@tinacms/toolkit'

export interface Document {
  form: {
    label: string
    name: string
    fields: Object[]
    mutationInfo: {
      path: string[]
      string: string
      includeCollection: boolean
      includeTemplate: boolean
    }
  }
  values: Object
}

export const useGetDocument = (
  cms: TinaCMS,
  collectionName: string,
  relativePath: string
) => {
  const [document, setDocument] = useState<Document>(undefined)

  useEffect(() => {
    const fetchDocument = async () => {
      const response: { getDocument: Document } = await cms.api.tina.request(
        `
        query($collection: String!, $relativePath: String!) {
          getDocument(collection:$collection, relativePath:$relativePath) {
            ... on Document {
              form
              values
            }
          }
        }`,
        { variables: { collection: collectionName, relativePath } }
      )

      setDocument(response.getDocument)
    }

    fetchDocument()
  }, [cms, collectionName, relativePath])

  return document
}

const GetDocument = ({
  cms,
  collectionName,
  relativePath,
  children,
}: {
  cms: TinaCMS
  collectionName: string
  relativePath: string
  children: any
}) => {
  const document = useGetDocument(cms, collectionName, relativePath)
  if (!document) {
    return null
  }
  return <>{children(document)}</>
}

export default GetDocument
