
import React, { useState } from 'react';
import Spreadsheet from '@/components/Spreadsheet';
import FormulaBar from '@/components/FormulaBar';
import Toolbar from '@/components/Toolbar';
import { FileSpreadsheet } from 'lucide-react';

const Index = () => {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [cellData, setCellData] = useState({ value: '', formula: '' });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <FileSpreadsheet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Spreadsheet 3</h1>
                <p className="text-sm text-gray-500">Workspace {'>'}  Folder 2</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Q3 Financial Overview</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full">
        {/* Toolbar */}
        <Toolbar />
        
        {/* Formula Bar */}
        <div className="bg-white border-b border-gray-200">
          <FormulaBar
            selectedCell={selectedCell}
            cellValue={cellData.value}
            cellFormula={cellData.formula}
            onUpdate={(value, formula) => {
              console.log('Formula bar update:', { value, formula });
            }}
          />
        </div>

        {/* Spreadsheet */}
        <div className="p-4">
          <Spreadsheet rows={25} cols={10} />
        </div>

        {/* Bottom Tabs */}
        <div className="bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-b-2 border-green-500">
              All Orders
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">
              Pending
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">
              Reviewed
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">
              Arrived
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
