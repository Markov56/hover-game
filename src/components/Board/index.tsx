import type { SetStateAction, Dispatch } from "react";
import type { Coordinates } from "types/models";

import Cell from "components/Cell";

import styles from "./index.module.scss";

type Props = {
  size: number;
  setHoveredCells: Dispatch<SetStateAction<Coordinates[]>>;
  hoveredCells: Coordinates[];
};

const Board = ({ size, setHoveredCells, hoveredCells }: Props) => {
  const cells = [];
  for (let y = 1; y <= size; y++) {
    for (let x = 1; x <= size; x++) {
      cells.push({ x, y });
    }
  }

  return (
    <div
      className={styles.wrapper}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridGap: 0,
        justifyContent: "flex-start",
      }}
    >
      {cells.map(({ x, y }) => (
        <Cell
          x={x}
          y={y}
          key={`${x},${y}`}
          hovered={hoveredCells.some((cell) => cell.x === x && cell.y === y)}
          setHoveredCells={setHoveredCells}
        />
      ))}
    </div>
  );
};

export default Board;
