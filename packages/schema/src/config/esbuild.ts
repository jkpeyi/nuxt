import { defu } from 'defu'
import { defineUntypedSchema } from 'untyped'
import type { TransformOptions } from 'esbuild'

export default defineUntypedSchema({
  esbuild: {
    options: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      tsconfigRaw: {
        $resolve: async (val: TransformOptions['tsconfigRaw'], get) => {
          return defu(val, {
            compilerOptions: {
              experimentalDecorators: await get('experimental.decorators') as boolean
            }
          } satisfies TransformOptions['tsconfigRaw'])
        }
      }
    }
  },
})
