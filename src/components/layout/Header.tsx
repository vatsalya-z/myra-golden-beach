import { TopBar } from "./TopBar";
import { Navbar } from "./Navbar";

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full">
      <TopBar />
      <Navbar />
    </header>
  );
}
