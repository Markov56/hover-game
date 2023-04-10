import styles from "./index.module.scss";

type Props = {
  x: number;
  y: number;
};

const HoveredCell = ({ x, y }: Props) => {
  return (
    <div className={styles.wrapper}>
      <span>row {y}</span> <span>column {x}</span>
    </div>
  );
};

export default HoveredCell;
