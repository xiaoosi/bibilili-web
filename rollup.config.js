import ts from 'rollup-plugin-typescript2'
import path from 'path'

export default {
    input: 'src/index.ts',
    output: {
        file: path.resolve(__dirname, 'build/index.js'),
        format: 'iife',
    },
    plugins: [
        ts({
            tsconfig: path.resolve(__dirname, 'tsconfig.json')
        }),
    ]
}
