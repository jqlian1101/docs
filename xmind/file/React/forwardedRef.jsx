import React from 'react';

// 高阶函数
const logProps = (Component) => {
    class LogProps extends React.Component {
        render() {
            const { forwardedRef, ...rest } = this.props;
            return <Component ref={forwardedRef} {...rest} />;
        }
    }

    function forwardRef(props, ref) {
        return <LogProps {...props} forwardedRef={ref}/>;
    }

    return React.forwardRef(forwardRef);
};

class Child extends React.Component {
    state = {
        count: '1111'
    };
    getState = () => {
        return this.state.count;
    };

    render() {
        return (
            <h4>我是子组件</h4>
        );
    }
}


const DomComponent = logProps('input');

const ReactComponent = logProps(Child);

export default class Test extends React.Component {
    componentDidMount() {
        console.log(this.reactRef);
        console.log(this.reactRef.getState());
    }

    focus() {
        console.log(this.domRef);
        console.log(this.reactRef);
        this.domRef.focus();
    }

    render() {
        return (
            <div>
                <DomComponent ref={(ref) => {
                    this.domRef = ref;
                }}/>
                <button onClick={this.focus.bind(this)}>获取input焦点</button>
                <ReactComponent ref={(ref) => {
                    this.reactRef = ref;
                }}/>
            </div>
        );
    }
}
