import { defineConfig } from 'orval';

export default defineConfig({
  memo: {
    input: {
      target: 'http://localhost:3101/api-json',
    },
    output: {
      target: './src/lib/api/generated.ts',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/lib/api/axios-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
});
