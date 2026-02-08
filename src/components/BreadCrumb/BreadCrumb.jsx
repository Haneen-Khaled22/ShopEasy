import { Link, useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Breadcrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname
    .split("/")
    .filter((x) => x);

  return (
    <div className="flex items-center text-sm text-gray-500 gap-2 m-6">
      <Link to="/" className="hover:text-black">
        Home
      </Link>

      {pathnames.map((value, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");

        const label = value
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());

        return (
          <div key={to} className="flex items-center gap-2">
            <IoIosArrowForward className="text-xs" />

            {index === pathnames.length - 1 ? (
              <span className="text-black font-medium">
                {label}
              </span>
            ) : (
              <Link to={to} className="hover:text-black">
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
