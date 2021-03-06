# react-pagination-component

> React Pagination Component.

<!-- [![NPM](https://img.shields.io/npm/v/react-pagination-component.svg)](https://www.npmjs.com/package/@loveyunk/react-pagination-component)  -->
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @loveyunk/react-pagination-component
```

## Usage

```tsx
import * as React from 'react'

import MyComponent from 'react-pagination-component'

class Example extends React.Component {
  render () {
    return (
      <MyComponent />
    )
  }
}
```

## API

| Parameter        | Description                        | Type          | Default                  |
|------------------|------------------------------------|---------------|--------------------------|
| defaultCurrent   | uncontrolled current page          | Number        | 1                        |
| current          | current page                       | Number        | undefined                |
| total            | items total count                  | Number        | 0                        |
| defaultPageSize  | default items per page             | Number        | 10                       |
| pageSize         | items per page                     | Number        | 10                       |

## License

MIT © [loveyunk](https://github.com/loveyunk)
