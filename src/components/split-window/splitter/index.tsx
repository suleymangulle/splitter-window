import React, { useEffect, useRef } from "react";
import { SplitterMode, SplitterModel } from "./splitter-moel";

const Splitter = (props: SplitterModel) => {
    const setMoveControl = (val: boolean) => {
        sessionStorage.setItem("moveControl", `${val}`);
    }
    const getMoveControl = (): boolean => {
        return sessionStorage.getItem("moveControl") === "true";
    }

    const setPosition = (positionKey: string, value: number) => {
        sessionStorage.setItem(positionKey, `${value}`);
    }

    setMoveControl(false);
    const splitterRef = useRef<any>();
    const returnBySplitterMode = (verticalRslt: any, horizontalRslt: any) => {
        if (props.SplitterMode === SplitterMode.Horizontal)
            return horizontalRslt;
        else if (props.SplitterMode === SplitterMode.Vertical)
            return verticalRslt;
        return undefined;
    };

    const drag = (e: any) => {
        if (props.SplitterMode === SplitterMode.Horizontal)
            setPosition("position-y", e.clientY);
        else if (props.SplitterMode === SplitterMode.Vertical)
            setPosition("position-x", e.clientX);
        setMoveControl(true);
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", drop);

    };

    const drop = () => {
        setMoveControl(false);
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", drop);
    }

    const move = (e: any) => {
        sessionStorage.setItem("bussy", "true");
        if (getMoveControl()) {
            const splitter = splitterRef.current as HTMLElement;
            const nextWindow = splitter.nextSibling as HTMLElement;
            const prevWindow = splitter.previousSibling as HTMLElement;
            const parentWindow = splitter.parentElement as HTMLElement;
            let width = 0;
            if (props.SplitterMode === SplitterMode.Horizontal) {
                width = e.screenY - prevWindow.offsetTop;
            }
            else if (props.SplitterMode === SplitterMode.Vertical) {
                width = e.screenX - prevWindow.offsetLeft;
            }

            if (nextWindow instanceof HTMLElement) {
                setWindowSize(nextWindow, parentWindow.clientWidth - width - (props.SplitterMode === SplitterMode.Horizontal ? splitter.offsetHeight : splitter.offsetWidth));
            }
            if (prevWindow instanceof HTMLElement) {
                setWindowSize(prevWindow, width);
            }
            if (props.OnSchangeSplitterPosition)
                props.OnSchangeSplitterPosition();
        }
    };

    const setWindowSize = (windowElement: HTMLElement, width: number) => {
        if (props.SplitterMode === SplitterMode.Vertical) {
            windowElement.style.width = `${(width)}px`;
        }
        else if (props.SplitterMode === SplitterMode.Horizontal) {
            windowElement.style.height = `${(width - 1)}px`;
        }
    }

    return <div
        className={`splitter-line ${props.SplitterMode}`}
        onMouseDown={drag}
        ref={splitterRef}
        draggable
        style={{
            border: props.Border,
            background: props.Background,
            width: returnBySplitterMode(props.Width, "100%"),
            height: returnBySplitterMode("100%", props.Width),
            cursor: returnBySplitterMode("col-resize", "row-resize"),
            float: "left"
        }}
    ></div>
}

export default Splitter;