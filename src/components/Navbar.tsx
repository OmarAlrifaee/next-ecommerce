import NavLink from "./NavLink";

const links = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/shop",
    title: "Shop",
  },
  {
    path: "/cart",
    title: "Cart",
  },
];
const Navbar = () => {
  return (
    <nav className="h-10 px-10 flex items-center justify-between">
      <div>Logo</div>
      <ul className="flex items-center gap-3">
        {links.map((link) => (
          <NavLink
            path={link.path}
            title={link.title}
            style=""
            key={link.path}
          />
        ))}
      </ul>
    </nav>
  );
};
export default Navbar;