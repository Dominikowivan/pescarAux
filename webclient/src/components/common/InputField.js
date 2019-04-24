import React from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
const InputField = ({
  name,
  value,
  placeholder,
  label,
  onChange,
  error,
  info,
  type,
  disabled,
  helperText,
  style,
  fullWidth,
  required,
  multiline,
  InputProps,
  autoFocus
}) => {
  return (
    <TextField
      name={name}
      value={value}
      type={type}
      error={error}
      placeholder={placeholder}
      label={label}
      onChange={onChange}
      disabled={disabled}
      helperText={helperText}
      style={style}
      fullWidth={fullWidth}
      info={info}
      required={required}
      multiline={multiline}
      InputProps={InputProps}
      autoFocus={autoFocus}
    />
  )
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.string,
  helperText: PropTypes.string,
  style: PropTypes.object,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
  multiline: PropTypes.bool,
  InputProps: PropTypes.object,
  autoFocus: PropTypes.bool
}

InputField.defaultProps = {
  type: 'text'
}

export default InputField
