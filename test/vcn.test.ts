import { vcn } from '../src/vcn'

const S = {
  root: 'r',
  active: 'a',
  someClass: 's',
  'dashed-name': 'd',
  name: 'n',
  call: 'c',
  apply: 'ap',
  arguments: 'ar'
}

describe('full form', () => {
  it('works', () => {
    const t = vcn('b', S)
    expect(t()).toBe('b')
    expect(t({ active: 1 })).toBe('b a')
    expect(t({ active: 1, someClass: 1 })).toBe('b a s')
    expect(t({ active: 0 })).toBe('b')
    expect(t({ active: 0, someClass: 1 })).toBe('b s')
  })
})

describe('short form', () => {
  it('works', () => {
    const t = vcn(S)
    expect(t()).toBe('')
    expect(t({ active: 1 })).toBe('a')
    expect(t({ active: 1, someClass: 1 })).toBe('a s')
    expect(t({ active: 0 })).toBe('')
    expect(t({ active: 0, someClass: 1 })).toBe('s')
  })
})

describe('with array', () => {
  it('works', () => {
    const t = vcn({
      root: 'r',
      active: ['a', 'i']
    })
    expect(t()).toBe('i')
    expect(t({ active: 1 })).toBe('a')
    expect(t({ active: 0 })).toBe('i')
    expect(t({ active: 0, root: 0 })).toBe('i')
    expect(t({ active: 0, root: 1 })).toBe('i r')
    expect(t({ active: 1, root: 0 })).toBe('a')
    expect(t({ active: 1, root: 1 })).toBe('a r')
    expect(t({ root: 0, active: 0 })).toBe('i')
    expect(t({ root: 0, active: 1 })).toBe('a')
    expect(t({ root: 1, active: 0 })).toBe('r i')
    expect(t({ root: 1, active: 1 })).toBe('r a')
    expect(t({ root: 1 })).toBe('r i')
  })
})
