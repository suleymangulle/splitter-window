import React, { useState } from 'react';
import { TableMode, TableModel } from './table-model';

const Table = (props: TableModel) => {
    const [toggleState, setToggleState] = useState({
        toggleAll: true,
        Id: true,
        Kontrakt: true,
        Teklif: true,
        Data: true
    });

    const [editRowIndex, setEditRowIndex] = useState(-1);

    return <>
        {props.ShowFilter && <div>
            <label>
                <input type="checkbox" checked={toggleState.toggleAll} onChange={() => {
                    setToggleState({ ...toggleState, toggleAll: !toggleState.toggleAll, Id: !toggleState.toggleAll, Kontrakt: !toggleState.toggleAll, Teklif: !toggleState.toggleAll, Data: !toggleState.toggleAll });
                }} />
                Toggle all
            </label>
            <br />
            <label>
                <input type="checkbox" checked={toggleState.Id} onChange={() => {
                    setToggleState({ ...toggleState, Id: !toggleState.Id });
                }} />
                Id
            </label>
            <br />
            <label>
                <input type="checkbox" checked={toggleState.Kontrakt} onChange={() => {
                    setToggleState({ ...toggleState, Kontrakt: !toggleState.Kontrakt });
                }} />
                Kontrakt
            </label>
            <br />
            <label>
                <input type="checkbox" checked={toggleState.Teklif} onChange={() => {
                    setToggleState({ ...toggleState, Teklif: !toggleState.Teklif });
                }} />
                Teklif
            </label>
            <br />
            <label>
                <input type="checkbox" checked={toggleState.Data} onChange={() => {
                    setToggleState({ ...toggleState, Data: !toggleState.Data });
                }} />
                Data
            </label>
        </div>}
        <table>
            <thead>
                <tr>
                    {toggleState.Id && <th>Id</th>}
                    {toggleState.Kontrakt && <th>Kontrakt</th>}
                    {toggleState.Teklif && <th>Teklif</th>}
                    {toggleState.Data && <th>Data</th>}
                    {props.Mode === TableMode.EditableMode && <th></th>}
                </tr>
            </thead>
            <tbody>
                {props.Data && props.Data.map((item, index) => {
                    return <tr>
                        {toggleState.Id && <td>{editRowIndex === index ? <input
                            value={item.Id}
                            onChange={(e) => {
                                const val = e.target.value;
                                item.Id = val;
                                if (props.ChangedData) {
                                    props.ChangedData(props.Data);
                                }
                            }} /> : item.Id}</td>}
                        {toggleState.Kontrakt && <td>{editRowIndex === index ? <input
                            value={item.Kontrakt}
                            onChange={(e) => {
                                const val = e.target.value;
                                item.Kontrakt = val;
                                if (props.ChangedData) {
                                    props.ChangedData(props.Data);
                                }
                            }} /> : item.Kontrakt}</td>}
                        {toggleState.Teklif && <td>{editRowIndex === index ? <input
                            value={item.Teklif}
                            onChange={(e) => {
                                const val = e.target.value;
                                item.Teklif = val;
                                if (props.ChangedData) {
                                    props.ChangedData(props.Data);
                                }
                            }} /> : item.Teklif}</td>}
                        {toggleState.Data && <td>{editRowIndex === index ? <input
                            value={item.Data}
                            onChange={(e) => {
                                const val = e.target.value;
                                item.Data = val;
                                if (props.ChangedData) {
                                    props.ChangedData(props.Data);
                                }
                            }} /> : item.Data}</td>}

                        {props.Mode === TableMode.EditableMode && <td>
                            {editRowIndex === index ? <button onClick={() => {
                                setEditRowIndex(-1);
                            }}>
                                Tamam
                            </button> : <button onClick={() => {
                                setEditRowIndex(index);
                            }}>
                                Düzenle
                            </button>
                            }
                            <button onClick={() => {
                                if (props.Data)
                                    props.Data.splice(index, 1);
                                if (props.ChangedData)
                                    props.ChangedData(props.Data);
                            }}>
                                Sil
                            </button>
                        </td>}
                    </tr>
                })}
            </tbody>
        </table>
    </>
}

export default Table;