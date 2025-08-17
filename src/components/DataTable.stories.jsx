import DataTable from "./DataTable";

export default {
  title: "Components/DataTable",
  component: DataTable,
};

const sampleData = [
  { id: 1, name: "Alice", age: 24, city: "Delhi" },
  { id: 2, name: "Bob", age: 29, city: "Mumbai" },
  { id: 3, name: "Charlie", age: 32, city: "Bangalore" },
];

const columns = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "city", title: "City", dataIndex: "city" },
];

export const Default = () => <DataTable data={sampleData} columns={columns} />;

export const Loading = () => <DataTable data={[]} columns={columns} loading />;

export const Empty = () => <DataTable data={[]} columns={columns} />;

export const Selectable = () => (
  <DataTable data={sampleData} columns={columns} selectable="multiple" />
);

export const SingleSelect = () => (
  <DataTable data={sampleData} columns={columns} selectable="single" />
);
