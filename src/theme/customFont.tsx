
import { ConfigProvider } from "antd"
const GlobalThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ConfigProvider
    theme={{
      token: {
        fontSize: 16,
        colorPrimary: "#65B891",
        colorPrimaryHover: "#65B891",
        fontFamily: "'Space Grotesk', sans- serif"
      },
      components: {
        // Tabs: {
        //   inkBarColor: "rgb(235,32,51)",
        //   itemActiveColor: "rgb(235,32,51)",
        //   itemSelectedColor: "rgb(235,32,51)",
        // },
        Button: {
          // controlHeight: "35px",
          borderRadius: 25,
          colorBgTextHover: "#FFFFF",
          defaultColor: "#000000",
          defaultHoverBg: "#28598D",
          colorPrimary: "#28598D",
          // colorPrimaryHover: "#28598D",
          defaultHoverBorderColor: "#28598D",
          defaultHoverColor:'#FFFFFF'
        },
        // Checkbox: {
        //   colorPrimary: "#ed1a32",
        //   colorPrimaryHover: "#ed1a32",
        // },
      },
    }}
  >
    {children}
  </ConfigProvider>
)
export default GlobalThemeProvider