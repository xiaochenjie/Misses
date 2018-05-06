import React, { Component } from 'react'
import { Image, View, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

export default class PlacehoderImage extends Component {
    constructor() {
        super();
        this.state = {
            mloading: true,
        }
    }
    render() {
        const { style, placeholder } = this.props;
        return (
            <View style={style}>
                {this._renderImage()}
                {(this.state.mloading && placeholder) ? this._renderPlaceholder() : null}
            </View>
        )
    }

    _renderPlaceholder = () => {
        const { placeholder } = this.props;
        return (
            <Image 
                source={placeholder}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.content}
                />
        )
    }

    _renderImage = () => {
        const { source, resizeMode } = this.props;
        const ImageType = source.uri.indexOf('http') < 0 ? Image : FastImage;
        return (
            <ImageType 
                source={source}
                resizeMode={resizeMode || FastImage.resizeMode.cover}
                style={styles.content}

                onLoadStart={this._onLoadStart}
                onProgress={this._onProgress}
                onLoad={this._onLoad}
                onError={this._onError}
                onLoadEnd={this._onLoadEnd}
                onLayout={this._onLayout}
            />
        )
    }

    _onLoadStart = () => {
        const { onLoadStart } = this.props;
        onLoadStart && onLoadStart();
    }

    _onProgress = () => {
        const { onProgress } = this.props;
        onProgress && onProgress();   
    }

    _onLoad = () => {
        this.setState({
            mloading: false,
        })
        const { onLoad } = this.props;
        onLoad && onLoad();
    }

    _onError = () => {
        const { onError } = this.props;
        onError && onError();
    }

    _onLoadEnd = () => {
        const { onLoadEnd } = this.props;
        onLoadEnd && onLoadEnd();
    }

    _onLayout = () => {
        const { onLayout } = this.props;
        onLayout && onLayout();
    }
}

const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
})