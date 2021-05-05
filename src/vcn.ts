type Rec = Record<string, string>
export type Selector<T extends Rec> = (vars?: Partial<Record<keyof T, unknown>>) => string

export function vcn<T extends Rec>(variants: T): Selector<T>
export function vcn<T extends Rec>(baseCn: string, variants: T): Selector<T>
export function vcn<T extends Rec>(...args: [T] | [string, T]): Selector<T> {
  const baseCn = args.length === 1 ? '' : args[0]
  const variants = args.length === 1 ? args[0] : args[1]
  const f: Selector<T> = (vars = {}) => {
    let res = baseCn
    for (const key in vars) {
      if (vars[key]) {
        res += (res ? ' ' : '') + variants[key]
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
