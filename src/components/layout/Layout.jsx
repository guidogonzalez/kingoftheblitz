import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />

      <MainContent>{children}</MainContent>
    </div>
  );
}
