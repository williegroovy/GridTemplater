import { useState, useCallback } from 'react';
import "./../assets/scss/GridLayout.scss";

const FR_Button = ({ onRowColumnSizeChange, sizeType, gridIndex }) => {
    const [fr, set_fr] = useState(1);

    const increment_fr = useCallback(() => {
        const frValue = fr + 1;
        set_fr(frValue);
        onRowColumnSizeChange({ sizeType, value: `${frValue}fr`, gridIndex })
    }, [fr, set_fr]);

    const decrement_fr = useCallback(() => {
        if(fr > 0) {
            const frValue = fr - 1;
            set_fr(frValue);
            onRowColumnSizeChange({ sizeType, value: `${frValue}fr`, gridIndex })
        }
    }, [fr, set_fr]);

    return (
        <div className={"fr-btn"}>
            <button onClick={decrement_fr}>-</button>
            <p>{fr}fr</p>
            <button onClick={increment_fr}>+</button>
        </div>
    )
}

const GridLayout = () => {
    const gridStructInit = {
        columnGap: 0,
        rowGap: 0,
        columns: ['1fr', '1fr', '1fr', '1fr', '1fr'],
        rows: ['1fr', '1fr', '1fr', '1fr', '1fr'],
    };

    const [gridStruct, setGridStruct] = useState(gridStructInit);

    console.log('gridStruct', gridStruct);

    const onInputChanged = useCallback((gridItemType) => (event) => {
        const numericalUpdate = parseInt(event.target.value);
        if(gridItemType === 'columns' || gridItemType === 'rows') {
            const gridStructItem = gridStruct[gridItemType];
            const isIncrement = gridStructItem.length < numericalUpdate;

            if(isIncrement) {
             setGridStruct({ ...gridStruct, [gridItemType]: [...gridStructItem, '1fr'] });
            } else {
                gridStructItem.length > 0 && setGridStruct({ ...gridStruct, [gridItemType]: gridStructItem.slice(0, numericalUpdate) })
            }

        } else {
            setGridStruct({ ...gridStruct, [gridItemType]: numericalUpdate });
        }
    }, [gridStruct, setGridStruct]);

    const onRowColumnSizeChange = useCallback(({ sizeType, gridIndex, value }) => {
        const sizeValues = gridStruct[sizeType];
        sizeValues[gridIndex] = value;
        setGridStruct({ ...gridStruct, [sizeType]: sizeValues })
    }, [gridStruct, setGridStruct]);

    const rows = Array.from(Array(gridStruct.rows.length));
    const columns = Array.from(Array(gridStruct.columns.length));

    return [
        <main className={"main"}>
            <section
                style={{
                    gridTemplateRows: `repeat(${gridStruct.rows.length}, 1fr)`,
                    gap: gridStruct.rowGap,
                }}
                className={"row-units"}>
                {
                    rows
                        .map((_, rowIndex) =>
                            <FR_Button
                                key={`r${rowIndex}`}
                                data-id={`r${rowIndex}`}
                                onRowColumnSizeChange={onRowColumnSizeChange}
                                sizeType={'rows'}
                                gridIndex={rowIndex}
                            />
                        )
                }
            </section>
            <section
                style={{
                    gridTemplateColumns: `repeat(${gridStruct.columns.length}, 1fr)`,
                    gap: gridStruct.columnGap,
                }}
                className={"column-units"}>
                {
                    columns
                        .map((_, columnIndex) =>
                            <FR_Button
                                key={`r${columnIndex}`}
                                data-id={`r${columnIndex}`}
                                onRowColumnSizeChange={onRowColumnSizeChange}
                                sizeType={'columns'}
                                gridIndex={columnIndex}
                            />
                        )
                }
            </section>
            <div className={"grid-container"}>
                <section
                    className="grid"
                    style={{
                        gridTemplateColumns: `${gridStruct.columns.join(' ')}`,
                        gridTemplateRows: `${gridStruct.rows.join(' ')}`,
                        gridColumnGap: gridStruct.columnGap,
                        gridRowGap: gridStruct.rowGap,
                    }}
                >
                    {
                        Array.from(Array(gridStruct.rows.length)).map((_, rowIndex) =>
                            Array.from(Array(gridStruct.columns.length)).map((_, columnIndex) => {
                                    return (
                                        <div
                                            key={`r${rowIndex}:c${columnIndex}`}
                                            data-id={`r${rowIndex}:c${columnIndex}`}
                                            className={"box"}
                                        />
                                    )
                                }
                            )
                        )
                    }
                </section>
                <section
                    className={"grid grandchild"}
                    style={{
                        gridTemplateColumns: `${gridStruct.columns.join(' ')}`,
                        gridTemplateRows: `${gridStruct.rows.join(' ')}`,
                        gridColumnGap: gridStruct.columnGap,
                        gridRowGap: gridStruct.rowGap,
                    }}
                />
            </div>
        </main>,
        <aside>
            <fieldset>
                <label>Columns</label>
                <input type={"number"} min={"0"} max={"12"} value={gridStruct.columns.length} onChange={onInputChanged('columns')} />
            </fieldset>
            <fieldset>
                <label>Rows</label>
                <input type={"number"} min={"0"} max={"12"} value={gridStruct.rows.length} onChange={onInputChanged('rows')} />
            </fieldset>
            <fieldset>
                <label>Column Gap</label>
                <input type={"number"} min={"0"} max={"12"} value={gridStruct.columnGap} onChange={onInputChanged('columnGap')} />
            </fieldset>
            <fieldset>
                <label>Row Gap</label>
                <input type={"number"} min={"0"} max={"12"} value={gridStruct.rowGap} onChange={onInputChanged('rowGap')} />
            </fieldset>
        </aside>
    ]
};

export default GridLayout;