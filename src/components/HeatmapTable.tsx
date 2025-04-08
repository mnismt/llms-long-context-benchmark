import React, {
  useMemo,
  useState,
} from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
  ColumnDef,
} from '@tanstack/react-table';
import { DataPoint } from '../types';
import {
  formatWindow as defaultFormatWindow,
  getModelDisplayName as defaultGetModelDisplayName,
  getModelFamily as defaultGetModelFamily,
} from '../utils/chart-utils';
import { familyColors } from '../data/metadata';
import { ProviderIcon } from './ProviderIcons';

// Define the structure for a row in our table
interface ModelPerformanceRow {
  model: string;
  family: string;
  scores: { [window: number]: number | null };
}

interface HeatmapTableProps {
  data: DataPoint[];
  modelsToDisplay: string[]; // Still needed to know which models to initially include & order
  getModelDisplayName?: (model: string) => string;
  formatWindow?: (window: number) => string;
  getModelFamily?: (model: string) => string;
}

// Basic color scale - adjust as needed
const getColorForValue = (value: number | null): string => {
  if (value === null || value === undefined) return '#E5E7EB'; // Gray for null/missing values
  // Simple Green (100) to Yellow (50) to Red (0) scale
  const hue = (value / 100) * 120; // 0 (red) to 120 (green)
  return `hsl(${hue}, 70%, 60%)`;
};

export function HeatmapTable({
  data,
  modelsToDisplay,
  getModelDisplayName = defaultGetModelDisplayName,
  formatWindow = defaultFormatWindow,
  getModelFamily = defaultGetModelFamily,
}: HeatmapTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  // Prepare data in the format needed by react-table
  const tableData = useMemo(() => {
    if (!data || data.length === 0 || !modelsToDisplay || modelsToDisplay.length === 0) {
      return [];
    }

    const scoresByModel: { [model: string]: { [window: number]: number | null } } = {};
    modelsToDisplay.forEach(model => {
      scoresByModel[model] = {};
      data.forEach(point => {
        scoresByModel[model][point.window] = point[model] ?? null;
      });
    });

    // Use modelsToDisplay to ensure initial sort order and inclusion
    return modelsToDisplay.map(model => ({
      model: model,
      family: getModelFamily(model),
      scores: scoresByModel[model] || {},
    }));

  }, [data, modelsToDisplay, getModelFamily]);

  const windowSizes = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.map(d => d.window).sort((a, b) => a - b);
  }, [data]);

  const columns = useMemo<ColumnDef<ModelPerformanceRow>[]>(() => {
    // Define Provider column
    const providerColumn: ColumnDef<ModelPerformanceRow> = {
      accessorKey: 'family',
      header: 'Provider',
      enableSorting: true, // Allow sorting by provider
      cell: ({ row }) => {
        const family = row.original.family;
        const familyColor = familyColors[family as keyof typeof familyColors] || '#888888';
        return (
          <div className="flex items-center">
            <ProviderIcon providerName={family} className="w-4 h-4 inline-block mr-1" />
            <span style={{ color: familyColor, fontWeight: 'bold' }}>
              {family}
            </span>
          </div>
        );
      },
      size: 120, // Adjust width slightly for icon
    };

    // Define Model column (now sticky)
    const modelColumn: ColumnDef<ModelPerformanceRow> = {
      accessorKey: 'model',
      header: 'Model',
      enableSorting: false, // Keep model name column non-sortable
      cell: ({ row }) => {
        const modelName = row.original.model;
        // Apply sticky classes directly here for clarity
        return (
          <div className="sticky left-0 bg-white dark:bg-gray-800 z-10 pl-3 pr-3 py-2">
             {getModelDisplayName(modelName)}
          </div>
        );
      },
      size: 200, // Adjust width as needed
    };

    const windowColumns: ColumnDef<ModelPerformanceRow>[] = windowSizes.map(window => ({
      accessorKey: `scores.${window}`,
      header: () => formatWindow(window),
      cell: ({ getValue }) => {
        const score = getValue<number | null>();
        const bgColor = getColorForValue(score);
        const textColor = (score !== null && score !== undefined && score > 55) ? 'text-black' : 'text-white';
        return (
          <div
            className={`px-3 py-2 text-center ${textColor} font-medium`}
            style={{ backgroundColor: bgColor }}
            title={`${formatWindow(window)}: ${score !== null && score !== undefined ? score.toFixed(1) : 'N/A'}`}
          >
            {score !== null && score !== undefined ? score.toFixed(1) : '-'}
          </div>
        );
      },
      sortingFn: 'alphanumeric', // Use built-in alphanumeric sort for numbers/nulls
      sortUndefined: 'last', // Keep rows with null/undefined scores at the bottom when sorting
    }));

    // Order: Provider, Model, Window Columns
    return [providerColumn, modelColumn, ...windowColumns];
  }, [windowSizes, formatWindow, getModelDisplayName]); // familyColors is constant

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // debugTable: true, // Uncomment for debugging
  });

  if (tableData.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  scope="col"
                  // Apply sticky class conditionally to the Model column header
                  className={`px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${header.column.id === 'model' ? 'sticky left-0 bg-gray-50 dark:bg-gray-700 z-20 text-left' : 'text-center'}`}
                  style={{
                    width: header.getSize(),
                    cursor: header.column.getCanSort() ? 'pointer' : 'default',
                  }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {/* Add sorting indicator */} 
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  // Remove general sticky class, apply specific padding/styles conditionally
                  className={`whitespace-nowrap text-sm ${cell.column.id === 'family' ? 'px-3 py-2 text-left' : ''} ${cell.column.id === 'model' ? 'font-medium text-gray-900 dark:text-gray-100' : ''}`}
                  // Apply width style. Sticky handled inside model cell render
                  style={{ width: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 