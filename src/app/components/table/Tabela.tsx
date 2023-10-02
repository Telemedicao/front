'use client'
import React, { useState, useRef, useEffect } from 'react';
import styles from './Table.module.css';

interface TableData {
  headers: string[];
  data: string[][];
}

export const Tabela1 = ({ tableData, style }: { tableData: TableData; style: React.CSSProperties }) => {
  const [selectedRows, setSelectedRows] = useState<boolean[]>(Array(tableData.data.length).fill(true));
  const [openPanelIndex, setOpenPanelIndex] = useState<number | null>(null);
  const [columnData, setColumnData] = useState<string[]>([]);
  const [filterText, setFilterText] = useState<string>('');

  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    setOpenPanelIndex(openPanelIndex === index ? null : index);
    if (index !== null) {
      setColumnData(tableData.data.map((rowData) => rowData[index]));
    } else {
      setColumnData([]);
    }
  };

  const toggleRow = (rowIndex: number) => {
    const updatedSelectedRows = [...selectedRows];
    updatedSelectedRows[rowIndex] = !updatedSelectedRows[rowIndex];
    setSelectedRows(updatedSelectedRows);
  };

  const toggleSelectAll = () => {
    const selectAllValue = !selectedRows.every((row) => row);
    const updatedSelectedRows = Array(tableData.data.length).fill(selectAllValue);
    setSelectedRows(updatedSelectedRows);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
      setOpenPanelIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();
    setFilterText(searchText);
  };

  return (
    <div className={styles.tableContainer} style={style}>
      <input
        type="text"
        placeholder="Filtrar..."
        value={filterText}
        onChange={handleFilterChange}
        className={styles.filterText}
      />
      <div className={styles.table}>
        <div className={styles.headerRow}>
          {tableData.headers.map((header, index) => (
            <div key={index} className={styles.headerCell} typeof="text">
              {header}
              <button onClick={() => handleClick(index)} style={{ marginLeft: '5px', padding: '0px' }}>
                &#9998;
              </button>
              {openPanelIndex === index && (
                <div className={styles.overlayContainer}>
                  <div className={styles.overlay} ref={overlayRef}>
                    <div className={styles.columnPanel}>
                      <div className={styles.rowCell}>
                        <input
                          type="checkbox"
                          checked={selectedRows.every((row) => row)}
                          onChange={toggleSelectAll}
                        />
                        Selecionar Tudo
                      </div>
                      {columnData.map((cell, rowIndex) => (
                        <div key={rowIndex} className={styles.rowCell}>
                          <input
                            type="checkbox"
                            checked={selectedRows[rowIndex]}
                            onChange={() => toggleRow(rowIndex)}
                          />
                          {cell}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {tableData.data.map((rowData, rowIndex) => {
          const isRowVisible = selectedRows[rowIndex] && rowData.some(cell => cell.toLowerCase().includes(filterText));

          if (!isRowVisible) {
            return null;
          }

          return (
            <div className={`${styles.row}`} key={rowIndex}>
              {rowData.map((cell, cellIndex) => {
                if (!selectedRows[rowIndex]) {
                  return null;
                }
                return (
                  <div key={cellIndex} className={styles.rowCell}>
                    {cell}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};



  
  