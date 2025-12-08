
import UserChart from './UserChart';

const Dashboard = () => {
    return (
        <div className=" ">
            {/* <DashboardStats /> */}

            <div className="grid grid-cols-12  gap-2 items-center mt-5">
                <div className="col-span-12 bg-white drop-shadow-md p-4 pb-0 mx-2 rounded-2xl">
                    <UserChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
