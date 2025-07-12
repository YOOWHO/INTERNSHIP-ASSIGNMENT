
import { CellData } from '@/components/Spreadsheet';

export const evaluateFormula = (formula: string, data: Record<string, CellData>): string | number => {
  try {
    // Simple formula evaluation - handle basic operations and functions
    let processedFormula = formula;

    // Replace cell references (A1, B2, etc.) with their values
    processedFormula = processedFormula.replace(/[A-Z]\d+/g, (match) => {
      const col = match.charCodeAt(0) - 65;
      const row = parseInt(match.slice(1)) - 1;
      const cellId = `${row}-${col}`;
      const cellData = data[cellId];
      const value = cellData?.computedValue || cellData?.value || '0';
      return typeof value === 'number' ? value.toString() : (parseFloat(value as string) || 0).toString();
    });

    // Handle SUM function
    processedFormula = processedFormula.replace(/SUM\(([^)]+)\)/g, (match, range) => {
      const values = range.split(',').map((ref: string) => {
        const trimmed = ref.trim();
        if (trimmed.includes(':')) {
          // Handle ranges like A1:A5
          const [start, end] = trimmed.split(':');
          const startCol = start.charCodeAt(0) - 65;
          const startRow = parseInt(start.slice(1)) - 1;
          const endCol = end.charCodeAt(0) - 65;
          const endRow = parseInt(end.slice(1)) - 1;
          
          let sum = 0;
          for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
              const cellId = `${row}-${col}`;
              const cellData = data[cellId];
              const value = cellData?.computedValue || cellData?.value || '0';
              sum += parseFloat(value as string) || 0;
            }
          }
          return sum.toString();
        } else {
          // Single cell reference
          const col = trimmed.charCodeAt(0) - 65;
          const row = parseInt(trimmed.slice(1)) - 1;
          const cellId = `${row}-${col}`;
          const cellData = data[cellId];
          const value = cellData?.computedValue || cellData?.value || '0';
          return (parseFloat(value as string) || 0).toString();
        }
      });
      
      const sum = values.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
      return sum.toString();
    });

    // Handle AVERAGE function
    processedFormula = processedFormula.replace(/AVERAGE\(([^)]+)\)/g, (match, range) => {
      const values = range.split(',').map((ref: string) => {
        const trimmed = ref.trim();
        const col = trimmed.charCodeAt(0) - 65;
        const row = parseInt(trimmed.slice(1)) - 1;
        const cellId = `${row}-${col}`;
        const cellData = data[cellId];
        const value = cellData?.computedValue || cellData?.value || '0';
        return parseFloat(value as string) || 0;
      });
      
      const average = values.reduce((acc, val) => acc + val, 0) / values.length;
      return average.toString();
    });

    // Evaluate the processed formula
    const result = Function(`"use strict"; return (${processedFormula})`)();
    return typeof result === 'number' ? result : result.toString();
  } catch (error) {
    console.error('Formula evaluation error:', error);
    return '#ERROR';
  }
};
