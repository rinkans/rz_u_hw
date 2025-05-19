import styles from "./OverlayView.module.css";

export type OverlayViewProps = { show: boolean; title: string };

export const OverlayView: React.FC<OverlayViewProps> = ({ show, title }) => {
  if (!show) {
    return null;
  }
  return <div className={styles.container}>{title}</div>;
};
