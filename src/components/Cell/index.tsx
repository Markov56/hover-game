import cn from "classnames";

import type { SetStateAction, Dispatch } from "react";
import type { Coordinates } from "types/models";

import styles from "./index.module.scss";

interface Props extends Coordinates {
  hovered: boolean;
  setHoveredCells: Dispatch<SetStateAction<Coordinates[]>>;
}

const Cell = ({ x, y, setHoveredCells, hovered }: Props) => {
  const handleHoverCell = () => {
    if (hovered) {
      setHoveredCells((prev) =>
        prev.filter((cell) => cell.x !== x || cell.y !== y)
      );
    } else {
      setHoveredCells((prev) => [...prev, { x, y }]);
    }
  };

  return (
    <div
      className={cn(styles.cell, {
        [styles.hovered]: hovered,
      })}
      onMouseEnter={handleHoverCell}
    />
  );
};

export default Cell;
