
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Cell from './Cell';
import { evaluateFormula } from '@/utils/formulaUtils';

export interface CellData {
  value: string;
  formula?: string;
  computedValue?: string | number;
}

interface SpreadsheetProps {
  rows?: number;
  cols?: number;
}

const Spreadsheet: React.FC<SpreadsheetProps> = ({ rows = 25, cols = 10 }) => {
  const [data, setData] = useState<Record<string, CellData>>(() => {
    // Initialize with sample business data
    const initialData: Record<string, CellData> = {};
    
    // Headers
    const headers = [
      'Task Description', 'Status', 'Assigned To', 'Priority', 'Due Date', 
      'Estimated Value', 'Progress', 'Category', 'Department', 'Notes'
    ];
    
    headers.forEach((header, col) => {
      initialData[`0-${col}`] = { value: header, computedValue: header };
    });
    
    // Sample data rows
    const sampleData = [
      ['Launch social media campaign', 'In-progress', 'Sophie Choudhury', 'Medium', '20-11-2024', '6,200,000', '75%', 'Marketing', 'Digital', 'Campaign materials ready'],
      ['Update press kit for redesign', 'Ready to start', 'Tejas Pandey', 'High', '30-10-2024', '3,500,000', '0%', 'PR', 'Communications', 'Waiting for approval'],
      ['Finalize user testing feedback', 'In-progress', 'Rachel Lee', 'Medium', '10-12-2024', '4,750,000', '60%', 'UX Research', 'Product', 'Testing in progress'],
      ['Design new website features', 'Complete', 'Tom Wright', 'Low', '15-01-2025', '5,900,000', '100%', 'Design', 'Product', 'Ready for development'],
      ['Prepare Q4 financial report', 'Blocked', 'Kevin Smith', 'High', '30-01-2025', '2,800,000', '25%', 'Finance', 'Operations', 'Waiting for data']
    ];
    
    sampleData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        initialData[`${rowIndex + 1}-${colIndex}`] = { 
          value: cell, 
          computedValue: cell 
        };
      });
    });
    
    return initialData;
  });
  
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getCellId = (row: number, col: number) => `${row}-${col}`;
  const getColumnLabel = (col: number) => String.fromCharCode(65 + col);

  const getCellData = (cellId: string): CellData => {
    return data[cellId] || { value: '', computedValue: '' };
  };

  const updateCell = useCallback((cellId: string, value: string, formula?: string) => {
    setData(prevData => {
      const newData = { ...prevData };
      newData[cellId] = {
        value,
        formula,
        computedValue: formula ? evaluateFormula(formula, newData) : value
      };

      // Recalculate dependent cells (simplified)
      Object.keys(newData).forEach(id => {
        const cell = newData[id];
        if (cell.formula) {
          cell.computedValue = evaluateFormula(cell.formula, newData);
        }
      });

      return newData;
    });
  }, []);

  const handleCellClick = (cellId: string) => {
    setSelectedCell(cellId);
    setEditingCell(null);
  };

  const handleCellDoubleClick = (cellId: string) => {
    setEditingCell(cellId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!selectedCell) return;

    const [row, col] = selectedCell.split('-').map(Number);
    let newRow = row;
    let newCol = col;

    switch (e.key) {
      case 'ArrowUp':
        newRow = Math.max(0, row - 1);
        break;
      case 'ArrowDown':
        newRow = Math.min(rows - 1, row + 1);
        break;
      case 'ArrowLeft':
        newCol = Math.max(0, col - 1);
        break;
      case 'ArrowRight':
        newCol = Math.min(cols - 1, col + 1);
        break;
      case 'Enter':
        setEditingCell(selectedCell);
        return;
      case 'Escape':
        setEditingCell(null);
        return;
      default:
        return;
    }

    e.preventDefault();
    setSelectedCell(getCellId(newRow, newCol));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelectedCell(null);
        setEditingCell(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="overflow-auto max-h-[700px]">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="w-12 h-10 bg-gray-50 border-r border-gray-200 text-xs font-medium text-gray-500"></th>
              {Array.from({ length: cols }, (_, col) => (
                <th 
                  key={col}
                  className="min-w-[150px] h-10 bg-gray-50 border-r border-gray-200 text-xs font-medium text-gray-500 px-3 text-left"
                >
                  {getColumnLabel(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }, (_, row) => (
              <tr key={row} className="hover:bg-gray-50/50">
                <td className="w-12 h-12 bg-gray-50 border-r border-gray-200 text-xs font-medium text-gray-500 text-center sticky left-0 z-10">
                  {row + 1}
                </td>
                {Array.from({ length: cols }, (_, col) => {
                  const cellId = getCellId(row, col);
                  const cellData = getCellData(cellId);
                  const isSelected = selectedCell === cellId;
                  const isEditing = editingCell === cellId;
                  const isHeader = row === 0;

                  return (
                    <Cell
                      key={cellId}
                      cellId={cellId}
                      data={cellData}
                      isSelected={isSelected}
                      isEditing={isEditing}
                      isHeader={isHeader}
                      onClick={() => handleCellClick(cellId)}
                      onDoubleClick={() => handleCellDoubleClick(cellId)}
                      onUpdate={updateCell}
                      onEditComplete={() => setEditingCell(null)}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Spreadsheet;
