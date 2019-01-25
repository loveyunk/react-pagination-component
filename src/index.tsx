import * as React from 'react'
import Pager from './Pager'

export interface PaginationProps {
  total?: number;
  pageSize?: number;
  defaultPageSize?: number;
  current?: number;
  defaultCurrent?: number;
  onChange?: (page : number) => void;
  prefixCls?: string;
  className?: string;
}

export interface PaginationState {
  current : number;
  pageSize : number;
}

function noop() {}

class Pagination extends React.Component < PaginationProps,
PaginationState > {

  static defaultProps : Partial < PaginationProps > = {
    total: 0,
    defaultPageSize: 10,
    defaultCurrent: 1,
    onChange: noop,
    prefixCls: 'lv-pagination',
    className: ''
  }

  constructor(props : PaginationProps) {
    super(props)

    let pageSize = props.defaultPageSize
    if ('pageSize' in props) {
      pageSize = props.pageSize
    }

    let current = props.defaultCurrent
    if ('current' in props) {
      current = props.current
    }

    this.state = {
      current: current !,
      pageSize: pageSize !
    }
  }

  private isValid = (page : number) : boolean => {
    return typeof page === 'number' && page >= 1 && page !== this.state.current
  }

  private calcPage = () : number => {
    return Math.floor((this.props.total ! - 1) / this.state.pageSize) + 1
  }

  private handleChange = (page : number) => {
    if (this.isValid(page)) {
      this.setState({current: page})
      this.props.onChange !(page)
    }
  }

  private prev = () => {
    if (this.hasPrev()) {
      this.handleChange(this.state.current - 1)
    }
  }

  private next = () => {
    if (this.hasNext()) {
      this.handleChange(this.state.current + 1)
    }
  }

  private hasPrev = () => {
    return this.state.current > 1
  }

  private hasNext = () => {
    return this.state.current < this.calcPage()
  }

  render() {

    const props = this.props

    const prefixCls = props.prefixCls

    const pagerList = []
    const allPage : number = this.calcPage()

    if (allPage <= 9) {
      for (let i = 0; i <= allPage; i++) {
        pagerList.push(<Pager key={i} page={i} onClick={this.handleChange}/>)
      }
    } else {}

    return (
      <ul className={`${prefixCls} ${props.className}`}>
        <li onClick={this.prev}>
          <a>&lt;</a>
        </li>
        {pagerList}
        <li onClick={this.next}>
          <a>&gt;</a>
        </li>
      </ul>
    )
  }
}

export default Pagination
