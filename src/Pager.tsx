import * as React from 'react';
import styles from './styles.less';

// type guards
export interface PagerProps {
  page: number;
  active: boolean;
  rootPrefixCls: string;
  onClick: (page: number) => void;
}

const Pager = (props: PagerProps) => {
  const prefixCls = `${props.rootPrefixCls}-item`;

  let cls = `${styles[prefixCls]}`;

  if (props.active) {
    cls = `${cls} ${styles[prefixCls + '-active']}`;
  }

  const handleClick = () => {
    props.onClick(props.page);
  };

  return (
    <li onClick={handleClick} className={cls}>
      <a>{props.page}</a>
    </li>
  );
};

export default Pager;
