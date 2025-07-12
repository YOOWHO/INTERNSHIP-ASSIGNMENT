
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Cell from './Cell';
import { evaluateFormula } from '@/utils/formulaUtils';
import { Briefcase, Calendar, CheckCircle, User, Globe, Users, Flag, CalendarCheck, DollarSign, ChevronDown, Link as LinkIcon, SpellCheck, MessageCircleQuestion, FileText } from 'lucide-react';

export interface CellData {
  value: string;
  formula?: string;
  computedValue?: string | number;
}

interface SpreadsheetProps {
  rows?: number;
  cols?: number;
  data: Record<string, CellData>;
  setData: React.Dispatch<React.SetStateAction<Record<string, CellData>>>;
  selectedCell: string | null;
  setSelectedCell: React.Dispatch<React.SetStateAction<string | null>>;
  editingCell: string | null;
  setEditingCell: React.Dispatch<React.SetStateAction<string | null>>;
  updateCell: (cellId: string, value: string, formula?: string) => void;
}

const Spreadsheet: React.FC<SpreadsheetProps> = ({ rows = 5, cols = 9, data, setData, selectedCell, setSelectedCell, editingCell, setEditingCell, updateCell }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getCellId = (row: number, col: number) => `${row}-${col}`;
  const getColumnLabel = (col: number) => String.fromCharCode(65 + col);

  const getCellData = (cellId: string): CellData => {
    return data[cellId] || { value: '', computedValue: '' };
  };

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

  // Map column index to icon and label
  const headerIcons = [
    { icon: <Briefcase className="w-4 h-4 text-gray-400 mr-1" />, label: 'Job Request' },
    { icon: <Calendar className="w-4 h-4 text-gray-400 mr-1" />, label: 'Submitted' },
    { icon: <CheckCircle className="w-4 h-4 text-gray-400 mr-1" />, label: 'Status' },
    { icon: <User className="w-4 h-4 text-gray-400 mr-1" />, label: 'Submitter' },
    { icon: <Globe className="w-4 h-4 text-gray-400 mr-1" />, label: 'URL' },
    { icon: <Users className="w-4 h-4 text-gray-400 mr-1" />, label: 'Assigned' },
    { icon: <Flag className="w-4 h-4 text-gray-400 mr-1" />, label: 'Priority' },
    { icon: <CalendarCheck className="w-4 h-4 text-gray-400 mr-1" />, label: 'Due Date' },
    { icon: <DollarSign className="w-4 h-4 text-gray-400 mr-1" />, label: 'Est. Value' },
  ];

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
            {/* Group header row */}
            <tr>
              {/* Q3 Financial Overview label, spanning columns 0-5 */}
              <th colSpan={6} className="bg-gray-100 border-r border-gray-200 h-12 py-2 text-base font-semibold text-gray-700 px-3 align-middle">
                <span className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-gray-400" />
                  Q3 Financial Overview
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581M5.635 19A9 9 0 1 1 19 5.633" />
                  </svg>
                </span>
              </th>
              {/* 5: ABC */}
              <th className="bg-[#baf5d4] border-r border-gray-200 h-12 py-2 text-base font-semibold text-gray-900 text-left px-3 align-middle">
                <span className="flex items-center gap-2">
                  <SpellCheck className="w-5 h-5 text-gray-400" />
                  ABC
                </span>
              </th>
              {/* 6-7: Answer a question (colspan=2) */}
              <th colSpan={2} className="bg-[#e6e0fa] border-r border-gray-200 h-12 py-2 text-base font-semibold text-gray-900 text-left px-3 align-middle">
                <span className="flex items-center gap-2">
                  <MessageCircleQuestion className="w-5 h-5 text-gray-400" />
                  Answer a question
                </span>
              </th>
              {/* 8: Extract */}
              <th className="bg-[#ffe2c6] border-r border-gray-200 h-12 py-2 text-base font-semibold text-gray-900 text-left px-3 align-middle">
                <span className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-400" />
                  Extract
                </span>
              </th>
            </tr>
            {/* Main header row */}
            <tr>
              {/* Top-left corner cell with '#' */}
              <th className="w-12 h-10 bg-white border-r border-gray-200 text-xs font-bold text-gray-400 text-center align-middle">#</th>
              {Array.from({ length: cols }, (_, col) => {
                // Assign header background color by column (custom pastel)
                let headerBg = "bg-white";
                let headerText = "text-gray-900";
                if (col === 5) { headerBg = "bg-[#baf5d4]"; } // Assigned (pastel green)
                if (col === 6 || col === 7) { headerBg = "bg-[#e6e0fa]"; } // Priority, Due Date (pastel purple)
                if (col === 8) { headerBg = "bg-[#ffe2c6]"; } // Est. Value (pastel orange)
                return (
                  <th 
                    key={col}
                    className={`min-w-[150px] h-10 ${headerBg} border-r border-gray-200 text-xs font-bold ${headerText} px-3 text-left align-middle`}
                  >
                    <span className="flex items-center">
                      {headerIcons[col]?.icon}
                      {headerIcons[col]?.label}
                      <ChevronDown className="w-3 h-3 text-gray-400 ml-1" />
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows - 1 }, (_, row) => (
              <tr key={row} className="hover:bg-gray-50/50">
                <td className="w-12 h-12 bg-gray-50 border-r border-gray-200 text-xs font-medium text-gray-500 text-center sticky left-0 z-10">
                  {row + 1}
                </td>
                {Array.from({ length: cols }, (_, col) => {
                  const cellId = getCellId(row + 1, col); // shift by 1 to skip first data row
                  const cellData = getCellData(cellId);
                  const isSelected = selectedCell === cellId;
                  const isEditing = editingCell === cellId;
                  const isHeader = false;
                  // Add greyish background to Job Request column (col 0)
                  const extraTdClass = col === 0 ? 'bg-gray-50' : '';

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
                      tdClassName={extraTdClass}
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
