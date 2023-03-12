import { ChangeEvent, InvalidEvent, useState } from 'react';

import { ClipboardText, PlusCircle, ShoppingCartSimple } from 'phosphor-react';
import { Item } from './components/Item';

import './global.css';
import styles from './App.module.css';

interface ListItem {
  name: string;
  completed: boolean;
}

export function App() {

  const [items, setItems] = useState<ListItem[]>([]);

  const [newItemText, setNewItemText] = useState('');
  const isNewItemEmpty = newItemText.length === 0;

  const [completedItems, setCompletedItems] = useState(0);


  function handleCreateNewItem() {
    setItems([...items, { name: newItemText, completed: false }]);
    setNewItemText('');
  }

  function handleNewItemChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewItemText(event.target.value);
  }

  function handleNewItemInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('This field is required!');
  }

  function deleteItem(itemToDelete: string) {
    const itemsWithoutDeletedOne = items.filter(item => {
        return item.name !== itemToDelete;
    })
    setItems(itemsWithoutDeletedOne);
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>Market<span>List</span></h1>
        <ShoppingCartSimple size={36}/>
      </header>

      <main>
        <div className={styles.createItemContainer}>
          <input 
            type="text" 
            placeholder="Add new item" 
            value={newItemText} 
            onChange={handleNewItemChange} 
            onInvalid={handleNewItemInvalid}
            required
          />
          <button onClick={handleCreateNewItem} disabled={isNewItemEmpty}>
            Create
            <PlusCircle size={22}/>
          </button>
        </div>

        <div className={styles.itemsContainer}>
          <p>Items <span>{items.length}</span></p>
          <p>Completed <span>{completedItems}</span></p>
        </div>
        
        { 
          items.length >= 1
           
          ?
            items.map((item ,index) => {
              return (<Item key={index} name={item.name} onDeleteItem={deleteItem} isChecked={item.completed}/>)
            })
        
          :
            <div className={styles.emptyItemsContainer}>
              <ClipboardText size={56} color="#333333" className={styles.icon}/>
              <p>You still don't have items</p>
              <p>Create and organize your shopping list</p>
            </div>
        }
        
      </main>
    </div>
  )
}
