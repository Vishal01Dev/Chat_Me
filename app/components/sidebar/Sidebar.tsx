import getCurrentUser from "@/app/actions/getCurrentUser"
import DesktopSidebar from "./DesktopSidebar"
import MobileSidebar from "./MobileSidebar"

interface SidebarProps {
    children: React.ReactNode
}

const Sidebar: React.FC<SidebarProps> = async ({ children }) => {

    const currentUser = await getCurrentUser()



    return (


        <div className="h-full">

            <DesktopSidebar currentUser={currentUser!} />
            <MobileSidebar currentUser={currentUser!} />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
}

export default Sidebar