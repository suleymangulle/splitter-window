import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header";
import Window from "../components/split-window/window";
import { ViewTypes } from "../components/split-window/window/window-model";
import Table from "../custom-components/table";
import { DataItem, TableMode } from "../custom-components/table/table-model";

import { updateList } from '../reducers/splitter-reducer';

const MainPage = () => {
    const screenWidth = document.body.clientWidth;
    const dispatch = useDispatch();
    const screenHeight = document.body.clientHeight;
    const [newItem, setNewItem] = useState<DataItem>({});
    const {
        data
    } = useSelector((state: any) => {
        return {
            data: state.splitterReducer.data
        };
    });

    const [windowSize, setWindowSize] = useState({
        width: screenWidth,
        height: screenHeight
    });

    useEffect(() => {
        const screenWidth = document.body.clientWidth;
        const screenHeight = document.body.clientHeight;
        setWindowSize({
            width: screenWidth,
            height: screenHeight
        });
    }, []);


    return <>
        <Header Title="EPİAŞ" ProfileText="Süleyman GÜLLE" />
        <Window
            root
            ViewType={ViewTypes.Vertical}
            Height={windowSize.height}
            Width={windowSize.width}
            SplitterProps={{
                Background: "grey",
                Width: 4
            }} >
            <Window ViewType={ViewTypes.Horizontal}>
                <Window>
                    <Table Data={data} ShowFilter />
                </Window>
                <Window>
                    <Table Data={data} Mode={TableMode.EditableMode} ChangedData={(edited: DataItem[]) => {
                        dispatch(updateList([...edited]));
                    }} />
                    <h1>Item Ekle</h1>
                    <div>
                        <input
                            value={newItem.Id}
                            onChange={(e) => {
                                setNewItem({ ...newItem, Id: e.target.value });
                            }} />
                        <input
                            value={newItem.Kontrakt}
                            onChange={(e) => {
                                setNewItem({ ...newItem, Kontrakt: e.target.value });
                            }} />
                        <input
                            value={newItem.Teklif}
                            onChange={(e) => {
                                setNewItem({ ...newItem, Teklif: e.target.value });
                            }} />
                        <input
                            value={newItem.Data}
                            onChange={(e) => {
                                setNewItem({ ...newItem, Data: e.target.value });
                            }} />
                        <button onClick={() => {
                            if (newItem)
                                dispatch(updateList([...data, { ...newItem }]));
                        }}>Ekle</button>
                    </div>
                </Window>
            </Window>
            <Window ViewType={ViewTypes.Horizontal}>
                <Window></Window>
                <Window></Window>
            </Window>
        </Window>
    </>
};

export default MainPage;