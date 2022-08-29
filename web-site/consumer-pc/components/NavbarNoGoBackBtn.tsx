import { FC } from "react";
import { motion } from "framer-motion";

interface NavbarProps {
  title: string;
}

const NavbarNoGoBackBtn: FC<NavbarProps> = (props) => {
  return (
    <nav className="h-10 pt-2 font-medium text-center text-white  bg-primary-600 margin-auto">
      <div className="text-center">{props.title}</div>
    </nav>
  );
};

export default NavbarNoGoBackBtn;
