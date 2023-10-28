import DashboardMenu from "@/components/dashboard/DashboardMenu";
import AccessProvider from "@/context/AccessProvider";

export default function RootLayout({ children }) {
    return (
        <AccessProvider>
            <div className="min-h-screen w-full flex">
                <div className="hidden md:block md:w-[25%]">
                    <DashboardMenu />
                </div>
                <div className="hidden md:block md:w-[75%]">
                    {children}
                </div>
                <div className="md:hidden min-h-screen w-full flex justify-center items-center">
                    <div className="text-center p-4">We do not support mobile dashboard view, to view dashboard open in dextop or try using dextop mode in your mobile phone.</div>
                </div>
            </div>
        </AccessProvider>
    )
}
