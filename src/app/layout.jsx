import ImportsComponent from "../components/ImportsClientComponent";
import Alert from "@/components/Alert";
import Navbar from "@/components/navigation/NavBar";
import "../styles/custom.scss";

export const metadata = {
  title: "Database Connector Application",
  description: "Built by Tucker Johnson",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ImportsComponent>
        <body>
          <Alert />
          <Navbar />
          {children}
        </body>
      </ImportsComponent>
    </html>
  );
}
