import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  // TODO: Uncomment this line when we will solve all conflicts the backend schema (not local)
  // schema: 'https://backend-web3-dev.xyro.io/graphql',
  schema: './schema.gql',
  documents: ['./src/api/**/*.ts'],
  generates: {
    'introspection.json': {
      plugins: ['introspection'],
      config: {
        minify: true
      }
    },
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql'
      }
    }
  },
  ignoreNoDocuments: true,
  config: {
    scalars: {
      Timestamp: 'number',
      DateTime: 'string',
      Markdown: 'string',
      JSON: 'Record<string, any>',
      Upload: 'File'
    }
  }
}

export default config
