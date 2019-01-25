import * as React from 'react'

// type guards
export interface PagerProps {
  page : number;
  // active : boolean;
  onClick : (page : number) => void;
}

const Pager = (props : PagerProps) => {

  const handleClick = () => {
    props.onClick(props.page)
  }

  return (
    <li onClick={handleClick}>
      <a>{props.page}</a>
    </li>
  )
}

export default Pager
