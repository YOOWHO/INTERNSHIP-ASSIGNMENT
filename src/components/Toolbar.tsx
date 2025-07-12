
import React from 'react';
import { Button } from '@/components/ui/button';
import { EyeOff, ArrowUpDown, Filter, Layout, Upload, Download, Share2, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Toolbar: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 py-1">
      <div className="flex items-center justify-between min-h-[40px] px-2">
        {/* Left group */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 font-normal px-2 hover:bg-gray-100 focus:bg-gray-200">
            <EyeOff className="w-4 h-4 text-gray-400" />
            Hide fields
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 font-normal px-2 hover:bg-gray-100 focus:bg-gray-200">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            Sort
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 font-normal px-2 hover:bg-gray-100 focus:bg-gray-200">
            <Filter className="w-4 h-4 text-gray-400" />
            Filter
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 font-normal px-2 hover:bg-gray-100 focus:bg-gray-200">
            <Layout className="w-4 h-4 text-gray-400" />
            Cell view
          </Button>
        </div>
        {/* Right group */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 font-normal px-2 hover:bg-gray-100 focus:bg-gray-200">
            <Upload className="w-4 h-4 text-gray-400" />
            Import
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 font-normal px-2 hover:bg-gray-100 focus:bg-gray-200">
            <Download className="w-4 h-4 text-gray-400" />
            Export
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-600 font-normal px-2 hover:bg-gray-100 focus:bg-gray-200">
            <Share2 className="w-4 h-4 text-gray-400" />
            Share
          </Button>
          <Button size="sm" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded shadow">
            <Plus className="w-4 h-4 text-white" />
            New Action
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
