
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { CellData } from './Spreadsheet';

interface CellProps {
  cellId: string;
  data: CellData;
  isSelected: boolean;
  isEditing: boolean;
  isHeader?: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  onUpdate: (cellId: string, value: string, formula?: string) => void;
  onEditComplete: () => void;
}

const Cell: React.FC<CellProps> = ({
  cellId,
  data,
  isSelected,
  isEditing,
  isHeader = false,
  onClick,
  onDoubleClick,
  onUpdate,
  onEditComplete
}) => {
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      setEditValue(data.formula || data.value);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isEditing, data.formula, data.value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onEditComplete();
    }
  };

  const handleSubmit = () => {
    const isFormula = editValue.startsWith('=');
    onUpdate(cellId, isFormula ? editValue.slice(1) : editValue, isFormula ? editValue.slice(1) : undefined);
    onEditComplete();
  };

  const handleBlur = () => {
    handleSubmit();
  };

  const displayValue = data.computedValue !== undefined ? data.computedValue : data.value;

  // Get status color for status cells
  const getStatusColor = (value: string) => {
    const status = value.toLowerCase();
    if (status.includes('complete')) return 'bg-green-100 text-green-800';
    if (status.includes('progress')) return 'bg-blue-100 text-blue-800';
    if (status.includes('blocked')) return 'bg-red-100 text-red-800';
    if (status.includes('ready')) return 'bg-yellow-100 text-yellow-800';
    return '';
  };

  // Get priority color
  const getPriorityColor = (value: string) => {
    const priority = value.toLowerCase();
    if (priority === 'high') return 'bg-red-100 text-red-800';
    if (priority === 'medium') return 'bg-orange-100 text-orange-800';
    if (priority === 'low') return 'bg-blue-100 text-blue-800';
    return '';
  };

  const isStatusColumn = cellId.includes('-1'); // Status column
  const isPriorityColumn = cellId.includes('-3'); // Priority column

  if (isEditing) {
    return (
      <td className="min-w-[150px] h-12 border-r border-b border-gray-200 p-0">
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="w-full h-full px-3 text-sm border-none outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
        />
      </td>
    );
  }

  return (
    <td
      className={cn(
        "min-w-[150px] h-12 border-r border-b border-gray-200 px-3 text-sm cursor-cell transition-colors",
        isHeader && "bg-gray-50 font-semibold text-gray-900 border-b-2 border-gray-300",
        !isHeader && "hover:bg-blue-50",
        isSelected && !isHeader && "bg-blue-100 ring-2 ring-blue-500 ring-inset",
        isSelected && isHeader && "bg-blue-200 ring-2 ring-blue-500 ring-inset"
      )}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className="flex items-center h-full">
        {!isHeader && isStatusColumn && displayValue ? (
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            getStatusColor(displayValue.toString())
          )}>
            {displayValue}
          </span>
        ) : !isHeader && isPriorityColumn && displayValue ? (
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            getPriorityColor(displayValue.toString())
          )}>
            {displayValue}
          </span>
        ) : (
          <span className="truncate">
            {displayValue}
          </span>
        )}
      </div>
    </td>
  );
};

export default Cell;
