
import { Friends } from "@prisma/client"
import FriendRequestBox from "./FriendRequestBox"
import { FriendsWithUsers } from "@/app/types"

interface FriendRequestListProps {
    friendRequests: FriendsWithUsers[]
}

const FriendRequestList: React.FC<FriendRequestListProps> = ({ friendRequests }) => {


    return (
        <>
            {

                friendRequests?.length > 0 ?
                    friendRequests?.map((friend: any) => (
                        <FriendRequestBox key={friend.id} friend={friend} />
                    ))

                    :

                    <p className="text-center font-semibold text-gray-700">No friend requests</p>
            }

        </>
    )
}

export default FriendRequestList