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
import AppWrapper from "@/app/wrapper";
import { Layout } from "antd";
const { Content } = Layout;
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

        CometChatUIKit.getLoggedinUser().then(
          (loggedInUser: CometChat.User | null) => {
            if (!loggedInUser || loggedInUser.getUid() !== UID) {
              // Nếu chưa login hoặc user hiện tại sai → logout và login lại
              CometChatUIKit.logout().then(() => {
                CometChatUIKit.login(UID)
                  .then((newUser) => {
                    console.log("Login Successful:", newUser);
                    setUser(newUser);
                  })
                  .catch((error) => {
                    toast.error("Login failed");
                    console.error("Login failed:", error);
                  });
              });
            } else {
              console.log("User already logged in:", loggedInUser);
              setUser(loggedInUser);
            }
          }
        );
      })
      .catch((error) => console.error("Initialization failed", error));
  }, []);

  return (
    <div className="min-h-screen" style={{ width: "100vw", height: "100vh" }}>
      <AppWrapper>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: "#fff",
          }}
        >
        <CometChatProvider>
          {user ? (
            <CometChatApp user={user} group={group} />
          ) : (
            <div>Đang đăng nhập...</div>
          )}
        </CometChatProvider>
        </Content>
      </AppWrapper>{" "}
    </div>
  );
};
export default CometChatNoSSR;
