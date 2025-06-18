"use client";
import React, { useEffect } from "react";
import {
  CometChatUIKit,
  UIKitSettingsBuilder,
} from "@cometchat/chat-uikit-react";
import CometChatApp from "../../CometChat/CometChatApp";
import { CometChatProvider } from "../../CometChat/context/CometChatContext";
import { setupLocalization } from "../../CometChat/utils/utils";
import { useAppSelector } from "@/lib/hooks";
import { selectUserInfo } from "@/lib/features/auth/authSlice";
import { toast } from "react-toastify";

export const COMETCHAT_CONSTANTS = {
  APP_ID: "2767168b2e8a283d", // Replace with your App ID
  REGION: "us", // Replace with your App Region
  AUTH_KEY: "0aeb7339e524e5d5a5b697cc5a9efbd6ae9d9989", // Replace with your Auth Key or leave blank if you are authenticating using Auth Token
};

const CometChatNoSSR: React.FC = () => {
  const UserInfo = useAppSelector(selectUserInfo);
  const [user, setUser] = React.useState<CometChat.User | undefined>(undefined);
  const [group, setGroup] = React.useState<CometChat.Group | undefined>(
    undefined
  );
  useEffect(() => {
    const UIKitSettings = new UIKitSettingsBuilder()
      .setAppId(COMETCHAT_CONSTANTS.APP_ID)
      .setRegion(COMETCHAT_CONSTANTS.REGION)
      .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
      .subscribePresenceForAllUsers()
      .build();

    CometChatUIKit.init(UIKitSettings)
      ?.then(() => {
        setupLocalization();
        console.log("Initialization completed successfully");

        const UID = UserInfo?.id;
        console.log("UID", UID); // Replace with your actual UID

        CometChatUIKit.getLoggedinUser().then((user: CometChat.User | null) => {
          if (user) {
            // If no user is logged in, proceed with login
            CometChatUIKit.login(UID)
              .then((loggedInUser: CometChat.User) => {
                console.log("Login Successful:", loggedInUser);
                // Mount your app or perform post-login actions if needed
                setUser(loggedInUser);
              })
              .catch((error) => {
                toast.error("Login failed:", error);
                console.error("Login failed:", error);
              });
          } else {
            console.log("User already logged in:", user);
            // setUser(user);
          }
        });
      })
      .catch((error) => console.error("Initialization failed", error));
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <CometChatProvider>
        {user ? (
          <CometChatApp user={user} group={group} />
        ) : (
          <div>Đang đăng nhập...</div>
        )}
      </CometChatProvider>
    </div>
  );
};
export default CometChatNoSSR;
