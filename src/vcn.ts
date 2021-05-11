type E = string | [string, string]
type Rec = Record<string, E>
export type Selector<T extends Rec> = (vars?: Partial<Record<keyof T, unknown>>) => string

export function vcn<T extends Rec>(variants: T): Selector<T>
export function vcn<T extends Rec>(baseCn: string, variants: T): Selector<T>
export function vcn<T extends Rec>(...args: [T] | [string, T]): Selector<T> {
  const baseCn = args.length === 1 ? '' : args[0]
  const variants = args.length === 1 ? args[0] : args[1]

  let neededKeys: Partial<Record<keyof T, false>> = {}

  for (const key in variants) {
    const v: E = variants[key]
    if (typeof v !== 'string') {
      neededKeys[key] = false
    }
  }

  const f: Selector<T> = (vars = {}) => {
    for (const k in neededKeys) {
      if (!(k in vars)) {
        vars[k] = false
      }
    }

    let res = baseCn
    for (const key in vars) {
      const v: E = variants[key]
      if (vars[key]) {
        res += (res ? ' ' : '') + (typeof v === 'string' ? v : v[0])
      } else if (typeof v !== 'string') {
        res += (res ? ' ' : '') + v[1]
      }
    }
    return res
  }

  Object.defineProperty(f, '__recipe__', {
    writable: false,
    value: {
      importPath: 'vanilla-classnames',
      importName: 'vcn',
      args
    }
  })

  return f
}
