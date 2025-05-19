
import { ConfigProvider } from "antd"
const GlobalThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ConfigProvider
    theme={{
      token: {
        fontSize: 16,
        colorPrimary: "#26C485",
        // colorPrimaryHover: "#193229",
        // fontFamily: "'Space Grotesk', sans- serif"
      },
      components: {
        // Tabs: {
        //   inkBarColor: "rgb(235,32,51)",
        //   itemActiveColor: "rgb(235,32,51)",
        //   itemSelectedColor: "rgb(235,32,51)",
        // },
        Button: {
          // defaultHoverBg: "#26C485",
        },
        // Checkbox: {
        //   colorPrimary: "#ed1a32",
        //   colorPrimaryHover: "#ed1a32",
        // },
        Input: {
          hoverBorderColor: "rgb(6,253,97)",
          activeBorderColor: "rgb(6,253,97)",
        },
        Spin: {
          colorPrimary: "rgb(6,253,97)",
        },


      },
    }}
  >
    {children}
  </ConfigProvider>
)
export default GlobalThemeProvider