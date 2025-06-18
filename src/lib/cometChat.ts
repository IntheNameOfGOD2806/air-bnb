// lib/cometChat.js
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { instance } from "./http";
const appID = "YOUR_APP_ID";
const region = "YOUR_REGION"; // ví dụ: "us", "eu"
const authKey = "YOUR_AUTH_KEY";

const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();

export const initCometChat = async () => {
  try {
    await CometChat.init(appID, appSetting);
    console.log("CometChat initialized");
  } catch (error) {
    console.error("Initialization failed", error);
  }
};

export const loginUser = async (UID: string) => {
  try {
    const user = await CometChat.login(UID, authKey);
    console.log("Login successful:", user);
    return user;
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const sendMessageToUser = async (receiverId: string, text: string) => {
  const message = new CometChat.TextMessage(
    receiverId,
    text,
    CometChat.RECEIVER_TYPE.USER
  );

  return await CometChat.sendMessage(message);
};
//create user
export const createCometChatUser = async ({
  uid,
  name,
  avatar,
  link,
  role,
  statusMessage,
  metadata,
  tags,
  withAuthToken = true,
}: any) => {
  try {
    const response = await instance.post(
      "https://2767168b2e8a283d.api-us.cometchat.io/v3/users",
      {
        uid,
        name,
        avatar,
        link,
        role,
        statusMessage,
        metadata,
        tags,
        withAuthToken,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          apikey: "673569776d47630a5c36598d5db043d58cfd03b8",
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUserByUid = async (uid: string) => {
  try {
    const user = await CometChat.getUser(uid);
    console.log("User found:", user);
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};