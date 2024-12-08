// SelectInput.js
import React from 'react';

const SelectInput = ({ options, defaultText }) => {
  return (
    <div className="select-input">
      <label>
        {defaultText || "選択してください"} {/* defaultTextがない場合は「選択してください」を表示 */}
      </label>
      <select>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
