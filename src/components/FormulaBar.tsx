
import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

interface FormulaBarProps {
  selectedCell: string | null;
  cellValue: string;
  cellFormula?: string;
  onUpdate: (value: string, formula?: string) => void;
}

const FormulaBar: React.FC<FormulaBarProps> = ({
  selectedCell,
  cellValue,
  cellFormula,
  onUpdate
}) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(cellFormula !== undefined ? `=${cellFormula}` : cellValue);
  }, [cellValue, cellFormula, selectedCell]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCell) return;
    if (inputValue.startsWith('=')) {
      onUpdate(inputValue.slice(1), inputValue.slice(1));
    } else {
      onUpdate(inputValue, undefined);
    }
  };

  const handleBlur = () => {
    if (!selectedCell) return;
    if (inputValue.startsWith('=')) {
      onUpdate(inputValue.slice(1), inputValue.slice(1));
    } else {
      onUpdate(inputValue, undefined);
    }
  };

  const getColumnLabel = (col: number) => String.fromCharCode(65 + col);
  const formatCellReference = (cellId: string | null) => {
    if (!cellId) return '';
    const [row, col] = cellId.split('-').map(Number);
    return `${getColumnLabel(col)}${row + 1}`;
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <Calculator className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-600 min-w-[60px]">
          {selectedCell ? formatCellReference(selectedCell) : 'Select a cell'}
        </span>
      </div>
      <form onSubmit={handleSubmit} className="flex-1">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          placeholder="Enter value or formula (=SUM(A1:A5))"
          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={!selectedCell}
        />
      </form>
    </div>
  );
};

export default FormulaBar;
