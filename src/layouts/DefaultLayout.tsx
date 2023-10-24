import { Outlet } from 'react-router-dom';

export function DefaultLayout() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] px-16 py-12 text-[#272238]">
      <Outlet />
    </div>
  );
}
