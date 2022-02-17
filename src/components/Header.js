import PropTypes from "prop-types";

import Button from "./Button";

export const Header = ({ title, onAdd, showAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color={showAdd ? 'tomato' : 'green'} text={showAdd ? 'Close'  : 'Add TAsk'} onClick={onAdd} />
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker ",
};

Header.propTypes = {
  title: PropTypes.string,
};
export default Header;
