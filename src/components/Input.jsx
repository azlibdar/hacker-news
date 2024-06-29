import PropTypes from "prop-types";

const Input = ({ value, onChange, placeholder }) => (
  <input
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="flex-1 p-2.5 rounded-md bg-transparent border border-primary-600 text-secondary-50 outline-none transition-all placeholder:text-secondary-300 focus:bg-primary-800"
  />
);

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default Input;
