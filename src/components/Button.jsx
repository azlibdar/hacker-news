import PropTypes from "prop-types";

const Button = ({ children, disabled, onClick }) => (
  <button disabled={disabled} onClick={onClick} className="btn-link">
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Button;
