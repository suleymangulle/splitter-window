import React, { useEffect, useRef, useState } from "react";
import Splitter from "../splitter";
import { SplitterMode } from "../splitter/splitter-moel";
import { WindowModel, ViewTypes } from "./window-model";

const Window = ({ children, SplitterProps, ViewType, Height, Width, root }: WindowModel) => {
    const containerRef = useRef<HTMLHeadingElement>(null);

    const getParentHeight = () => {
        if (Height)
            return Height ? Height : 0;

        const parent = containerRef.current;
        return parent && parent.clientHeight || 0;
    }

    const getParentWidth = () => {
        if (Width)
            return Width ? Width : 0;

        const parent = containerRef.current;
        return parent && parent.clientWidth || 0;
    }

    const calcHeight = (childHeight?: number) => {
        if (childHeight)
            return childHeight;
        let height = getParentHeight();
        const arrayControl = Array.isArray(children) && children.length > 1;
        const windowCount = (arrayControl ? children.length : 1);
        const typeControl = (ViewType === ViewTypes.Vertical || !ViewType);
        if (height > 0) {
            const hg = height / (typeControl ? 1 : (windowCount)) - (typeControl ? 0 : (SplitterProps ? SplitterProps.Width || 0 : 0) * (windowCount - 1));
            return hg;
        }
        return height;
    };

    const calcWidth = (childWidth?: number) => {
        if (childWidth)
            return childWidth;
        let width = getParentWidth();
        const arrayControl = Array.isArray(children) && children.length > 1;
        const windowCount = (arrayControl ? children.length : 1);
        const typeControl = (ViewType === ViewTypes.Horizontal || !ViewType);
        if (width > 0) {
            return width / (typeControl ? 1 : (windowCount)) - (typeControl ? 0 : (SplitterProps ? SplitterProps.Width || 0 : 0) * (windowCount - 1));
        }
        return width;
    };

    const renderChildren = () => {
        return React.Children.map(children, (child: any, index: number) => {
            const renderSplitter = index > 0;
            const childProps = child.props as WindowModel;
            const windowType = (<Window />).type;
            return <>
                {renderSplitter && child.type === windowType && (<Splitter {...SplitterProps} SplitterMode={ViewType === ViewTypes.Horizontal ? SplitterMode.Horizontal : SplitterMode.Vertical} />)}
                {child.type === windowType ? React.cloneElement((child), {
                    Height: calcHeight(childProps.Height),
                    Width: calcWidth(childProps.Width),
                    SplitterProps: childProps.SplitterProps || SplitterProps
                } as WindowModel) : child}
            </>
        });
    }

    return <div className="window-container"
        ref={containerRef}
        style={{
            width: root ? '100%' : `${Width}px`,
            height: root ? '100%' : `${Height}px`,
            float: "left",
            maxWidth: "100%",
            maxHeight: "100%"
        }}>
        {renderChildren()}
    </div>
};

export default Window;