import getFriendRequests from "../actions/getFriendRequests";
import getFriends from "../actions/getFriends";
import Sidebar from "../components/sidebar/Sidebar";
import FriendsList from "./components/FriendsList";

export default async function FriendsLayout({ children }: { children: React.ReactNode }) {

    const friends = await getFriends()
    const friendRequests = await getFriendRequests()

    return (
        <Sidebar>
            <div className="h-full">

                <FriendsList friends={friends!} friendRequests={friendRequests!}/>
                {children}
            </div>
        </Sidebar>
    )
}