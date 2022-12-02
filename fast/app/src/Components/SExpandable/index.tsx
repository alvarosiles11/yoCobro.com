import React, { Component } from 'react';
import { SView } from 'servisofts-component'
import { Animated } from 'react-native'

type SExpandableType = {
    type: "left" | "top" | "right" | "bottom",
    defaultOpen?: boolean,
    closedHeight?: number,
}
class SExpandable extends Component<SExpandableType> {
    props;
    animatedValue;
    constructor(props) {
        super(props);
        this.state = {
        };
        this.animatedValue = new Animated.Value(props.defaultOpen ? 1 : 0);
    }

    static defaultProps = {
        closedHeight: 100,
    }
    getInterpolation() {
        return this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["20%", "100%"]
        })
    }
    buildPosition() {
        switch (this.props.type) {
            case "left":
                return { top: 0, left: 0, height: "100%", width: this.getInterpolation() }
            case "top":
                return { top: 0, left: 0, width: "100%", height: this.getInterpolation() }
            case "right":
                return { top: 0, right: 0, height: "100%", width: this.getInterpolation() }
            case "bottom":
                return { bottom: 0, left: 0, width: "100%", height: this.getInterpolation() }
        }
    }

    render() {
        return (
            <Animated.View style={{
                position: "absolute",
                backgroundColor: "#606060",
                ...this.buildPosition()
            }} animated >
                <SView col={"xs-12"} height style={{ overflow: 'hidden', }}>
                    {this.props.children}
                </SView>
            </Animated.View>
        );
    }
}

export default SExpandable;