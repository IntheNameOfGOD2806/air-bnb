// lib/cometChat.js
import { CometChat } from '@cometchat-pro/chat';

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
