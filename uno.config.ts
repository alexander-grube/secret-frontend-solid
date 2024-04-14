// uno.config.ts
import { defineConfig, presetAttributify, presetTypography, presetUno } from 'unocss'

export default defineConfig({
    presets: [
        presetAttributify({ /* preset options */ }),
        presetUno(),
        presetTypography(),
        // ...custom presets
    ],
})