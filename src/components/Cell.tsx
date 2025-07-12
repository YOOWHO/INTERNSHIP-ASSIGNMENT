
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
  tdClassName?: string;
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
  onEditComplete,
  tdClassName = '',
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

  // Get status color for status cells (custom for each status)
  const getStatusColor = (value: string) => {
    const status = value.toLowerCase();
    if (status.includes('in-process')) return 'bg-yellow-100 text-yellow-800';
    if (status.includes('need to start')) return 'bg-blue-100 text-blue-800';
    if (status.includes('complete')) return 'bg-green-100 text-green-800';
    if (status.includes('blocked')) return 'bg-red-100 text-red-800';
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

  // Status column is column index 2
  const isStatusColumn = cellId.split('-')[1] === '2';
  // Priority column is column index 6
  const isPriorityColumn = cellId.split('-')[1] === '6';
  // Determine if this is the URL column (column index 4)
  const isUrlColumn = cellId.split('-')[1] === '4';

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
        isHeader && "bg-gray-50 font-semibold text-gray-900 border-b-2 border-gray-300 text-left",
        !isHeader && "hover:bg-blue-50 text-center",
        isSelected && !isHeader && "bg-blue-100 ring-2 ring-blue-500 ring-inset",
        isSelected && isHeader && "bg-blue-200 ring-2 ring-blue-500 ring-inset",
        tdClassName
      )}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <div className={cn("flex h-full w-full", isHeader ? "items-center" : "items-center justify-center")}>
        {!isHeader && isStatusColumn && displayValue ? (
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
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
        ) : !isHeader && isUrlColumn && displayValue ? (
          <a
            href={`https://${String(displayValue).replace('...', '')}`}
            className="text-blue-600 underline hover:text-blue-800 truncate"
            target="_blank"
            rel="noopener noreferrer"
          >
            {displayValue}
          </a>
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
