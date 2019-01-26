import * as React from 'react'
import * as PropTypes from 'prop-types'
import Pager from './Pager'
import styles from './styles.less'

export interface PaginationProps {
  total : number;
  pageSize : number;
  current : number;
  onChange : (page : number) => void;
  prefixCls : string;
  className : string;
}

export interface PaginationState {
  current : number;
  pageSize : number;
}

function noop() {}

class Pagination extends React.Component < PaginationProps,
PaginationState > {

  static propTypes = {
    total: PropTypes.number,
    current: PropTypes.number,
    pageSize: PropTypes.number,
    onChange: PropTypes.func,
    prefixCls: PropTypes.string,
    className: PropTypes.string
  }

  static defaultProps : Partial < PaginationProps > = {
    total: 0,
    pageSize: 10,
    current: 1,
    onChange: noop,
    prefixCls: 'lv-pagination',
    className: ''
  }

  constructor(props : PaginationProps) {
    super(props)

    this.state = {
      current: props.current,
      pageSize: props.pageSize
    }
  }

  private isValid = (page : number) : boolean => {
    return typeof page === 'number' && page >= 1 && page !== this.state.current
  }

  private calcPage = () : number => {
    return Math.floor((this.props.total - 1) / this.state.pageSize) + 1
  }

  private handleChange = (page : number) => {
    if (this.isValid(page)) {
      this.setState({current: page})
      this
        .props
        .onChange(page)
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
        pagerList.push(<Pager key={i} page={i} onClick={this.handleChange} rootPrefixCls={prefixCls}/>)
      }
    } else {}

    return (
      <ul className={`${styles[prefixCls]} ${props.className}`}>
        <li
          onClick={this.prev}
          className={(this.hasPrev()
          ? ''
          : styles[`${prefixCls}-disabled`]) + ' ' + styles[`${prefixCls}-prev`]}>
          <a></a>
        </li>
        {pagerList}
        <li
          onClick={this.next}
          className={(this.hasPrev()
          ? ''
          : styles[`${prefixCls}-disabled`]) + ' ' + styles[`${prefixCls}-next`]}>
          <a></a>
        </li>
      </ul>
    )
  }
}

export default Pagination
