import * as React from 'react';
import * as PropTypes from 'prop-types';
import Pager from './Pager';
import Options from './Options';
import LOCALE from './locale/zh_CN';
import styles from './styles.less';

export interface PaginationProps {
  total: number;
  pageSize: number;
  current: number;
  onChange: (page: number) => void;
  prefixCls: string;
  className: string;
  showQuickJumper: boolean;
  locale: typeof LOCALE;
  showSizeChanger: boolean;
  onShowSizeChange: (current: number, size: number) => void;
}

export interface PaginationState {
  current: number;
  pageSize: number;
}

function noop() {}

class Pagination extends React.Component<PaginationProps, PaginationState> {
  static propTypes = {
    total: PropTypes.number,
    current: PropTypes.number,
    pageSize: PropTypes.number,
    onChange: PropTypes.func,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    showQuickJumper: PropTypes.bool,
    locale: PropTypes.object,
    showSizeChanger: PropTypes.bool,
    onShowSizeChange: PropTypes.func
  };

  static defaultProps: Partial<PaginationProps> = {
    total: 0,
    pageSize: 10,
    current: 1,
    onChange: noop,
    prefixCls: 'lv-pagination',
    className: '',
    showQuickJumper: false,
    locale: LOCALE,
    showSizeChanger: false,
    onShowSizeChange: noop
  };

  constructor(props: PaginationProps) {
    super(props);

    this.state = {
      current: props.current,
      pageSize: props.pageSize
    };
  }

  isValid = (page: number): boolean => {
    return typeof page === 'number' && page >= 1 && page !== this.state.current;
  };

  calcPage = (): number => {
    return Math.floor((this.props.total - 1) / this.state.pageSize) + 1;
  };

  changePageSize = () => {};

  handleChange = (page: number) => {
    if (this.isValid(page)) {
      const allPages = this.calcPage();
      if (page > allPages) {
        page = allPages;
      }
      this.setState({ current: page });
      this.props.onChange(page);
    }
  };

  prev = () => {
    if (this.hasPrev()) {
      this.handleChange(this.state.current - 1);
    }
  };

  next = () => {
    if (this.hasNext()) {
      this.handleChange(this.state.current + 1);
    }
  };

  // 1 6 11 16
  jumpPrev = () => {
    this.handleChange(Math.max(1, this.state.current - 5));
  };

  jumpNext = () => {
    this.handleChange(Math.min(this.calcPage(), this.state.current + 5));
  };

  hasPrev = () => {
    return this.state.current > 1;
  };

  hasNext = () => {
    return this.state.current < this.calcPage();
  };

  render() {
    const props = this.props;

    const prefixCls = props.prefixCls;

    const pagerList = [];
    const allPages = this.calcPage();

    let jumpPrev = null;
    let jumpNext = null;
    let firstPager = null;
    let lastPager = null;

    if (allPages <= 9) {
      for (let i = 1; i <= allPages; i++) {
        pagerList.push(
          <Pager
            key={i}
            page={i}
            onClick={this.handleChange}
            rootPrefixCls={prefixCls}
            active={this.state.current === i}
          />
        );
      }
    } else {
      jumpPrev = (
        <li
          key='prev'
          onClick={this.jumpPrev}
          className={styles[`${prefixCls}-jump-prev`]}
        >
          <a />
        </li>
      );

      jumpNext = (
        <li
          key='next'
          onClick={this.jumpNext}
          className={styles[`${prefixCls}-jump-next`]}
        >
          <a />
        </li>
      );

      firstPager = (
        <Pager
          rootPrefixCls={prefixCls}
          page={1}
          onClick={this.handleChange}
          key={1}
          active={false}
        />
      );

      lastPager = (
        <Pager
          rootPrefixCls={prefixCls}
          page={allPages}
          onClick={this.handleChange}
          key={allPages}
          active={false}
        />
      );

      const current = this.state.current;

      let left = Math.max(1, current - 2);
      let right = Math.min(current + 2, allPages);

      if (current - 1 <= 2) {
        right = 1 + 4;
      }

      if (allPages - current <= 2) {
        left = allPages - 4;
      }

      for (let i = left; i <= right; i++) {
        pagerList.push(
          <Pager
            rootPrefixCls={prefixCls}
            key={i}
            page={i}
            onClick={this.handleChange}
            active={current === i}
          />
        );
      }

      if (current - 1 >= 4) {
        pagerList.unshift(jumpPrev);
      }
      if (allPages - current >= 4) {
        pagerList.push(jumpNext);
      }

      if (left !== 1) {
        pagerList.unshift(firstPager);
      }
      if (right !== allPages) {
        pagerList.push(lastPager);
      }
    }

    return (
      <ul className={`${styles[prefixCls]} ${props.className}`}>
        <li
          onClick={this.prev}
          className={
            (this.hasPrev() ? '' : styles[`${prefixCls}-disabled`]) +
            ' ' +
            styles[`${prefixCls}-prev`]
          }
        >
          <a />
        </li>
        {pagerList}
        <li
          onClick={this.next}
          className={
            (this.hasPrev() ? '' : styles[`${prefixCls}-disabled`]) +
            ' ' +
            styles[`${prefixCls}-next`]
          }
        >
          <a />
        </li>
        <Options
          quickGo={this.props.showQuickJumper ? this.handleChange : null}
          changeSize={this.props.showSizeChanger ? this.changePageSize : null}
          locale={this.props.locale}
          current={this.state.current}
          rootPrefixCls={prefixCls}
        />
      </ul>
    );
  }
}

export default Pagination;
