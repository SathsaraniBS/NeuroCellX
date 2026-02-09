import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-luxury-50 dark:bg-luxury-950 text-luxury-900 dark:text-white flex transition-colors duration-500">
            <main className="flex-1 lg:ml-64 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;