import ImportsComponent from "../components/ImportsClientComponent";
import Alert from "@/components/Alert";
import Navbar from "@/components/navigation/NavBar";
import "../styles/custom.scss";
import NextAuthProvider from "../components/NextAuthProvider";
export const metadata = {
  title: "Database Connector Application",
  description: "Built by Tucker Johnson",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextAuthProvider>
      <ImportsComponent>
        <body>
          <Alert />
          <Navbar />
          {children}
        </body>
      </ImportsComponent>
      </NextAuthProvider>
    </html>
  );
}
