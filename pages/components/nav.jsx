import Link from "next/link";

const Nav = () => {
  return (
    <nav className="text-center py-10">
      <span className="font-jetbrains-mono font-light text-2xl"><Link href="/">ilmuhitam.io</Link></span>
    </nav>
  );
};

export default Nav;
