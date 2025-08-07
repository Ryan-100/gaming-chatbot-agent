import React from 'react';
import Select, { ActionMeta, MultiValue, StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import { IOptions } from '../../types/base.types';

const animatedComponents = makeAnimated();

interface AnimatedMultiProps {
  value: MultiValue<IOptions>;
  data: IOptions[];
  onChange: (
    newValue: MultiValue<IOptions>,
    actionMeta: ActionMeta<IOptions>
  ) => void;
}

const customStyles: StylesConfig<IOptions, true> = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? 'var(--brand-300)' : provided.borderColor,
    boxShadow: state.isFocused
      ? '0 0 0 1px var(--brand-300)'
      : provided.boxShadow,
    '&:hover': {
      borderColor: state.isFocused ? 'var(--brand-300)' : provided.borderColor,
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'var(--brand-100)',
    color: 'black',
    '&:hover': {
      backgroundColor: 'var(--brand-100)',
    },
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    '&:hover': {
      backgroundColor: 'var(--brand-100)',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? 'var(--brand-100)'
      : state.isFocused
      ? 'var(--brand-100)'
      : provided.backgroundColor,
    color: 'black',
    '&:hover': {
      backgroundColor: 'var(--brand-100)',
      color: 'black',
    },
  }),
};

const MultiSelect: React.FC<AnimatedMultiProps> = ({
  value,
  data,
  onChange,
}) => {
  return (
    <Select<IOptions, true>
      closeMenuOnSelect={false}
      components={animatedComponents}
      value={value}
      options={data}
      onChange={onChange}
      isMulti
      styles={customStyles}
    />
  );
};

export default MultiSelect;
