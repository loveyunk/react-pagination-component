import * as React from 'react'

export interface OptionsProps {
  rootPrefixCls : string,
  current : number,
  quickGo : (page : number) => void
}

export interface OptionsState {
  goInputText : string
}

class Options extends React.Component < OptionsProps,
OptionsState > {

  constructor(props : OptionsProps) {
    super(props)

    this.state = {
      goInputText: ''
    }
  }

  handleChange = (e : React.FormEvent < HTMLInputElement >) => {
    this.setState({goInputText: e.currentTarget.value})
  }

  go = (e : React.FormEvent < HTMLInputElement >) => {
    // let val = this.state.goInputText
    // if (val === '') {
    //   return ''
    // }
    // val = isNaN(val as any)
    //   ? this.props.current
    //   : Number(val)
  }

  render() {
    const props = this.props
    const state = this.state
    const quickGo = props.quickGo
    let goInput = null

    if (quickGo) {
      goInput = (
        <div>
          <input
            type="text"
            value={state.goInputText}
            onChange={this.handleChange}
            onKeyUp={this.go}/>
        </div>
      )
    }

    return (
      <div>
        {goInput}
      </div>
    )
  }
}

export default Options
