# vanilla-classnames
[![NPM version](https://badgen.net/npm/v/vanilla-classnames)](https://www.npmjs.com/package/vanilla-classnames)
[![NPM Weekly Downloads](https://badgen.net/npm/dw/vanilla-classnames)](https://www.npmjs.com/package/vanilla-classnames)
[![License](https://badgen.net/npm/license/vanilla-classnames)](https://www.npmjs.com/package/vanilla-classnames)

vanilla-classnames (short to vcn) is better version
of [classnames](https://github.com/JedWatson/classnames) 
for [vanilla-extract](https://github.com/seek-oss/vanilla-extract).

## Installation
```
yarn add vanilla-classnames

npm install vanilla-classnames
```

## Usage 
```ts
// styles.css.ts
import { style, composeStyles } from '@vanilla-extract/css'
import { vcn } from 'vanilla-classnames'

export const item = vcn(style({
  //first, some base styles (but it can be omitted)
  background: 'blue',
  cursor: 'pointer',
}), {
  //and then, dynamic variants
  active: style({
    background: 'green',
  }),
  //for composing multiply styles, use vanilla composeStyles
  disabled: composeStyles(
    style({
      background: 'none',
      color: 'gray',
    }), 
    style({
      cursor: 'default',
    }),
  ),
})
```

```tsx
import React from 'react'
import * as S from './styles.css'

const SomeItem: React.FC<{active?: boolean, disabled?: boolean}> = ({active, disabled}) => <>
  <div className={S.item({active, disabled})}>
    Styled div!
  </div>
</>
```

That's all, folks!
Of course, `item` function will suggest variants names in typescript.
