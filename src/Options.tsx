import * as React from 'react';
import KEYCODE from './KeyCode';
import styles from './styles.less';
import LOCALE from './locale/zh_CN';

export interface OptionsProps {
  rootPrefixCls: string;
  current: number;
  quickGo: null | ((page: number) => void);
  locale: typeof LOCALE;
  changeSize: null | (() => void);
}

export interface OptionsState {
  goInputText: string;
}

class Options extends React.Component<OptionsProps, OptionsState> {
  constructor(props: OptionsProps) {
    super(props);

    this.state = {
      goInputText: ''
    };
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ goInputText: e.currentTarget.value });
  };

  go = (e: React.KeyboardEvent) => {
    if (this.state.goInputText === '') {
      return;
    }
    let val = isNaN(this.state.goInputText as any)
      ? this.props.current
      : Number(this.state.goInputText);

    if (e.keyCode === KEYCODE.ENTER) {
      console.log(e);
      this.setState({ goInputText: '' });
      this.props.quickGo!(val);
    }
  };

  render() {
    const props = this.props;
    const state = this.state;
    const prefixCls = `${props.rootPrefixCls}-options`;
    let goInput = null;
    let changeSelect = null;

    if (props.changeSize) {
      changeSelect = (
        <select>
          <option value='11'>11</option>
        </select>
      );
    }

    if (props.quickGo) {
      goInput = (
        <div className={styles[`${prefixCls}-quick-jumper`]}>
          {props.locale.jump_to}
          <input
            type='text'
            value={state.goInputText}
            onChange={this.handleChange}
            onKeyUp={this.go}
          />{' '}
          {props.locale.page}
        </div>
      );
    }

    return (
      <div className={styles[prefixCls]}>
        {changeSelect}
        {goInput}
      </div>
    );
  }
}

export default Options;
