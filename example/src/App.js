import React, {Component} from 'react'

import Pagination from 'react-pagination-component'

export default class App extends Component {

  render() {

    const paginationProps = {
      total: 120,
      current: 10,
      onChange: (page) => {
        console.log(page)
      },
      showQuickJumper: true
    }

    return (
      <div>
        <Pagination {...paginationProps}/>
      </div>
    )
  }
}
