import { Conversation, Friends, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
    sender: User,
    seen: User[]
};

export type FullConversationType = Conversation & {
    users: User[];
    messages: FullMessageType[]
};

export type FullFriendsType = Friends & {
    users: User[]
}

export type FriendsWithUsers = Friends & {
    userSender: User;
    userReceiver: User;
}