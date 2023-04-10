import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

import type { SetStateAction, Dispatch } from "react";
import type { AxiosError } from "axios";
import type { ModeOption } from "types/models";

import styles from "./index.module.scss";

type Props = {
  setSelectedOption: Dispatch<SetStateAction<ModeOption | null>>;
  selectedOption: ModeOption | null;
};

const Select = ({ setSelectedOption, selectedOption }: Props) => {
  const [isOptionsListVisible, setIsOptionsListVisible] = useState(false);

  const showListHandler = () => setIsOptionsListVisible((prev) => !prev);

  const { data: selectOptions, isLoading } = useQuery<ModeOption[], AxiosError>(
    ["mode-options"],
    async () => {
      try {
        const { data } = await axios.get<ModeOption[]>(
          "https://60816d9073292b0017cdd833.mockapi.io/modes"
        );

        return data;
      } catch (err) {
        throw err;
      }
    },
    { enabled: isOptionsListVisible }
  );

  const handleSelectOption = (option: ModeOption) => {
    setSelectedOption(option);
    setIsOptionsListVisible(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.valueContainer} onClick={showListHandler}>
        {selectedOption?.name || "Select mode"}
      </div>
      {isOptionsListVisible && (
        <ul className={styles.menu}>
          {isLoading && <p>Loading...</p>}
          {selectOptions?.map((option) => {
            return (
              <li
                className={styles.option}
                key={option.id}
                onClick={() => handleSelectOption(option)}
              >
                <span>{option.name}</span>
                <span>{option.field}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
