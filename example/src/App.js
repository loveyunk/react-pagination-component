import React, {Component} from 'react'

import Pagination from 'react-pagination-component'

export default class App extends Component {

  render() {

    const paginationProps = {
      total: 88,
      onChange: (page) => {
        // console.log(page)
      }
    }

    return (
      <div>
        <Pagination {...paginationProps}/>
      </div>
    )
  }
}
