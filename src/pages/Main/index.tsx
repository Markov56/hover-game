import { useState } from "react";

import Select from "components/Select";
import Board from "components/Board";

import type { Coordinates, ModeOption } from "types/models";

import styles from "./index.module.scss";
import HoveredCell from "components/HoveredCell";

const MainPage = () => {
  const [selectedOption, setSelectedOption] = useState<ModeOption | null>(null);

  const [hoveredCells, setHoveredCells] = useState<Coordinates[]>([]);

  const [startedMode, setStartedMode] = useState<ModeOption | null>(null);

  const handleStart = () => {
    setHoveredCells([]);
    setStartedMode(selectedOption);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.header}>
          <Select
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
          />
          <button
            className={styles.button}
            onClick={handleStart}
            disabled={!selectedOption}
          >
            Start
            <div className={styles.tooltip}> Please select a mode first</div>
          </button>
        </div>
        {startedMode && (
          <Board
            size={startedMode.field}
            setHoveredCells={setHoveredCells}
            hoveredCells={hoveredCells}
          />
        )}
      </div>
      <div className={styles.right}>
        <h1 className={styles.header}>Hovered cells</h1>
        <div className={styles.content}>
          {hoveredCells?.map(({ x, y }) => (
            <HoveredCell x={x} y={y} key={`${x},${y}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
