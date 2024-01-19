import PropTypes from "prop-types";
const CustomInput = ({
  className,
  value,
  setState,
  type,
  placeholder,
  label,
  title,
  inputType,
  setPreview,
}) => {
  const InputTag = inputType || "input";
  const handleChange = (event) => {
    if (label === "file") {
      // Si c'est un input de type fichier, utilisez event.target.files[0]
      setState(event.target.files[0]);
      setPreview(URL.createObjectURL(event.target.files[0]));
    } else {
      // Pour tous les autres types d'input, utilisez event.target.value
      setState(event.target.value);
    }
  };
  const additionalAttributes = {};
  if (label === "price") {
    additionalAttributes.min = "1";
  }
  return (
    <div className={className}>
      <div className="publish-label">
        <label htmlFor={label}>{title}</label>
      </div>
      <div className="publish-input">
        <InputTag
          id={label}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          {...additionalAttributes}
        />
      </div>
    </div>
  );
};

CustomInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  setState: PropTypes.func.isRequired,
  setPreview: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  title: PropTypes.string,
  inputType: PropTypes.string,
};
export default CustomInput;
