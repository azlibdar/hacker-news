import PropTypes from "prop-types";

const Select = ({ value, onChange }) => (
  <select
    value={value}
    onChange={onChange}
    className="p-2.5 pr-7 appearance-none rounded-md bg-transparent border border-primary-600 text-b-yellow outline-none focus:bg-primary-800"
  >
    <option value="story">Story</option>
    <option value="ask_hn">Ask HN</option>
    <option value="show_hn">Show HN</option>
    <option value="poll">Poll</option>
  </select>
);

Select.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
