
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Download, Upload, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Toolbar: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            Hide fields
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            Sort
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Search within sheet" 
              className="pl-9 w-64"
            />
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button size="sm" className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4" />
            New Action
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
