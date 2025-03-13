import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // ...compat.config({
  //   extends: ["next"],
  //   rules: {
  //     "react/no-unescaped-entities": "off",
  //     "@next/next/no-page-custom-font": "off",
  //     "@typescript-eslint/no-unused-vars": "off",
  //     "@typescript-eslint/no-explicit-any": "off",
  //     "@typescript-eslint/no-non-null-assertion": "off",
  //     "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
  //     "@typescript-eslint/no-empty-function": "off",
  //     "@typescript-eslint/no-empty-interface": "off",
  //   },
  // }),
]

export default eslintConfig
