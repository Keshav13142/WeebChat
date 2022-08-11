export const findSender = (chat, user) => {
  if (chat?.users?.[1]?.name === user?.name) {
    return chat?.users?.[0];
  } else return chat?.users?.[1];
};
