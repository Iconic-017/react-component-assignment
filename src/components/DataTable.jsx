import { useState } from "react";

export default function DataTable({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);

  const handleSort = (col) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === col.key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key: col.key, dataIndex: col.dataIndex, direction });
  };

  const sortedData = sortConfig
    ? [...data].sort((a, b) => {
        if (a[sortConfig.dataIndex] < b[sortConfig.dataIndex])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.dataIndex] > b[sortConfig.dataIndex])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      })
    : data;

  const toggleRow = (row) => {
    let updated = [];
    if (selectable === "single") {
      updated = [row];
    } else {
      if (selectedRows.includes(row)) {
        updated = selectedRows.filter((r) => r !== row);
      } else {
        updated = [...selectedRows, row];
      }
    }
    setSelectedRows(updated);
    onRowSelect && onRowSelect(updated);
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500 animate-pulse">
        Loading data...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 font-semibold ${
                  col.sortable ? "cursor-pointer hover:text-blue-600" : ""
                }`}
                onClick={() => col.sortable && handleSort(col)}
              >
                {col.title}
                {sortConfig?.key === col.key &&
                  (sortConfig.direction === "asc" ? " ▲" : " ▼")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
            <tr
              key={i}
              className={`transition-colors ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              } ${
                selectedRows.includes(row)
                  ? "bg-blue-100"
                  : "hover:bg-blue-50"
              }`}
              onClick={() => selectable && toggleRow(row)}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2">
                  {row[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
