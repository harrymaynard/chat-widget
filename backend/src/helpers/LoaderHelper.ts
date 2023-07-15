import { createRequire } from 'node:module'

export function loadJSON(path: string, callerPath: string) {
  const require = createRequire(callerPath)
  return require(path)
}
