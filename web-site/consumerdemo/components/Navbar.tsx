import { FC } from "react";
import { useHistory } from "react-router-dom";

interface NavbarProps {
  title: string;
}

const Navbar: FC<NavbarProps> = (props) => {
  const history = useHistory();
  return (
    <nav className="flex justify-between h-10 pt-2 font-medium text-center text-white bg-primary-600 margin-auto">
      <button onClick={history.goBack} className="pl-4 justify-self-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="justify-self-center">{props.title}</div>
      <div></div>
    </nav>
  );
};

export default Navbar;
