
import React, { useState } from 'react';
import Spreadsheet from '@/components/Spreadsheet';
import FormulaBar from '@/components/FormulaBar';
import Toolbar from '@/components/Toolbar';
import { FileSpreadsheet } from 'lucide-react';
import { Bell } from 'lucide-react';

const Index = () => {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [cellData, setCellData] = useState({ value: '', formula: '' });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Breadcrumbs and Sheet Name */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <FileSpreadsheet className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Workspace</span>
                  <span className="mx-1">&gt;</span>
                  <span>Folder 2</span>
                  <span className="mx-1">&gt;</span>
                  <span className="font-semibold text-gray-800">Spreadsheet 3</span>
                </div>
                <h1 className="text-xl font-semibold text-gray-900 mt-1">Spreadsheet 3</h1>
              </div>
            </div>
            {/* Right: Search, New Action, User */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search within sheet"
                className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 min-w-[200px]"
              />
              {/* Notification Bell */}
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
                <Bell className="w-5 h-5 text-gray-500" />
              </button>
              {/* User Profile */}
              <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">
                <img
                  src="https://ui-avatars.com/api/?name=John+Doe&background=4ade80&color=fff&size=32"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-semibold text-gray-900">John Doe</span>
                  <span className="text-[10px] text-gray-500">john.doe@email.com</span>
                </div>
              </div>
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
        <div className="bg-white border-t border-gray-200 px-2 py-0">
          <div className="flex items-center gap-1 mt-1">
            <button className="px-4 py-2 text-sm font-semibold text-green-700 bg-white border-b-2 border-green-500 focus:outline-none">
              All Orders
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent focus:outline-none">
              Pending
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent focus:outline-none">
              Reviewed
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent focus:outline-none">
              Arrived
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded border-none bg-transparent text-xl">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
