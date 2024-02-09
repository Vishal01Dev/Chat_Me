
import getConversations from "../actions/getConversations";
import getFriends from "../actions/getFriends";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationsList from "./components/ConversationsList";

export default async function dashboardLayout({ children }: { children: React.ReactNode }) {

    const conversations = await getConversations();

    const friends = await getFriends()


    return (

        <Sidebar>
            <div className="h-full">
                <ConversationsList
                    conversations={conversations!}
                    friends={friends!}
                />
                {children}
            </div>
        </Sidebar>
    )
}