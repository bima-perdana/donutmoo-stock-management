// src/App.jsx
import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import DashboardPage from "./pages/DashboardPage";
import AddPage from "./pages/AddPage";
import OrderPage from "./pages/OrderPage";
import InputOrderPage from "./pages/InputOrderPage";

const Layout = () => (
  <div className="p-6">
    <nav className="flex gap-4 mb-6">
      <Link to="/">Dashboard</Link>
      <Link to="/add">Tambah Stock</Link>
      <Link to="/order">Daftar Order</Link>
      <Link to="/input-order">Input Order</Link>
    </nav>
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  { path: "/", element: <Layout />, children: [
    { index: true, element: <DashboardPage /> },
    { path: "add", element: <AddPage /> },
    { path: "order", element: <OrderPage /> },
    { path: "input-order", element: <InputOrderPage /> },
  ]},
]);

const App = () => (
  <DataProvider>
    <RouterProvider router={router} />
  </DataProvider>
);

export default App;
