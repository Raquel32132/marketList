import { useState } from 'react';
import { Trash, Check } from 'phosphor-react';
import styles from './Item.module.css';
import * as Checkbox from '@radix-ui/react-checkbox';


interface ItemProps {
    name: string;
    isChecked: boolean;
    onDeleteItem: (name: string) => void;
    onCheckedChange: (name: string) => void;
  }

export function Item({name, onDeleteItem, isChecked, onCheckedChange}: ItemProps) {

    function handleDeleteItem() {
        onDeleteItem(name);
    }

    function handleToggleChecked() {
        onCheckedChange(name);
    }


    return (
        <div className={styles.container}>
            <div className={styles.checkboxContainer}>
                <Checkbox.Root className={styles.checkboxWrapper} id="checkbox" checked={isChecked} onCheckedChange={handleToggleChecked}>
                    <Checkbox.Indicator className={styles.checkbox}>
                        <Check size={12} color="#FFF" weight="bold"/>
                    </Checkbox.Indicator>
                </Checkbox.Root>
                <label htmlFor="checkbox">{name}</label>
            </div>
            <button className={styles.deleteItemButton} onClick={handleDeleteItem}>
                <Trash size={22} color="#808080"/>
            </button>
        </div>
    )
}