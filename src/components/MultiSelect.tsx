import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import cn from "classnames";

import styles from "./MultiSelect.module.css";
import { Button } from "./Button";

import { CheckBox } from "./Checkbox";

export type MultiSelectItem = {
  id: string;
  title: string;
  checked: boolean;
};
export type MultiSelectItems = MultiSelectItem[];

export type MultiSelectProps = {
  title: string | ReactNode;
  items: MultiSelectItems;
  onChange: (items: MultiSelectItems) => void;
};

export const MultiSelect: React.FC<MultiSelectProps> = ({
  title,
  items,
  onChange,
}) => {
  const multiSelectContainerEl = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const hasMoreThanOneChecked = items.some((item) => item.checked);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        multiSelectContainerEl.current?.contains(e.target) === false
      ) {
        setIsOpen(false);
      }
    };

    let timeoutId: number | undefined;

    if (isOpen) {
      // Added setTimeout to not auto-close the panel on open (Open button is outside thus this is being triggered)
      timeoutId = setTimeout(() =>
        document.addEventListener("click", clickHandler)
      );
    }

    return () => {
      document.removeEventListener("click", clickHandler);
      clearTimeout(timeoutId);
    };
  }, [isOpen]);

  const handleChange = useCallback(
    (checked: boolean, id?: string) => {
      onChange(
        items.map((item) => {
          if (item.id === id) {
            return { ...item, checked };
          }
          return item;
        })
      );
    },
    [items, onChange]
  );

  const resetItems = () => {
    onChange(
      items.map((item) => {
        return { ...item, checked: false };
      })
    );
  };

  return (
    <div className={styles.container}>
      <Button
        title={title}
        active={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />
      <div
        ref={multiSelectContainerEl}
        className={cn(styles.multiSelectContainer, {
          [styles.visible]: isOpen,
        })}
      >
        <p className={styles.multiSelectTitle}>Product line</p>
        <div>
          {items.map((item) => (
            <CheckBox key={item.id} {...item} onChange={handleChange} />
          ))}
        </div>
        <button
          type="button"
          className={cn(styles.resetButton, {
            [styles.disabled]: !hasMoreThanOneChecked,
          })}
          onClick={resetItems}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
