import { ChangeEvent, useState } from 'react';
import { ClipboardText, PlusCircle, ShoppingCartSimple, Trash } from 'phosphor-react';
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

  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      handleCreateNewItem();
    }
  }

  function handleCreateNewItem() {
    const itemsName = items.map(item => {
      return item.name
    })

    if (itemsName.includes(newItemText)) {
      alert("You already added this item to your market list!");
    } else {
      setItems([...items, { name: newItemText, completed: false }]);
    }

    setNewItemText('');
  }

  function handleNewItemChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewItemText(event.target.value);
  }

  function handleDeleteItem(itemToDelete: string) {
    const itemsWithoutDeletedOne = items.filter(item => {
        return item.name !== itemToDelete;
    })
    setItems(itemsWithoutDeletedOne);

    const deletedItem = items.find(item => item.name === itemToDelete);
      if (deletedItem?.completed) {
        setCompletedItems(completedItems - 1);
      }
  }

  function handleDeleteAllItems() {
    setItems([]);
    setCompletedItems(0);
  }

  function handleItemCheckedChange(name: string) {
    const updatedItems = items.map(item => {
      if (item.name === name) {
        item.completed = !item.completed;
        if (item.completed) {
          setCompletedItems(completedItems + 1);
        } else {
          setCompletedItems(completedItems - 1);
        }
      }
      return item;
    });
    setItems(updatedItems);
  }

  return (
    <div className={styles.container}>
      <main>
        <header>
          <h1>Market<span>List</span></h1>
          <ShoppingCartSimple size={36}/>
        </header>
        <div className={styles.createItemContainer}>
          <input 
            type="text" 
            placeholder="Add new item" 
            value={newItemText} 
            onChange={handleNewItemChange} 
            onKeyDown={handleKeyPress}
            required
          />
          <button 
            id="button-id" 
            onClick={handleCreateNewItem}
            disabled={isNewItemEmpty}
          >
            Create
            <PlusCircle size={22}/>
          </button>
        </div>

        <div className={styles.itemsContainer}>
          <p>Items <span>{items.length}</span></p>
          <p>Completed <span>{completedItems}</span></p>
        </div>
        
        <div className={styles.itemsWrapper}>
          { 
            items.length >= 1
            
            ?
              items.map((item ,index) => {
                return (<Item 
                  key={index} 
                  name={item.name} 
                  onDeleteItem={handleDeleteItem} 
                  isChecked={item.completed} 
                  onCheckedChange={handleItemCheckedChange}
                />)
              })
          
            :
              <div className={styles.emptyItemsContainer}>
                <ClipboardText 
                  size={56} 
                  color="#333333" 
                  className={styles.icon}
                />
                <p>You still don't have items</p>
                <p>Create and organize your shopping list</p>
              </div>
          }
        </div>
        { 
          items.length >= 2
        ?
          <footer> 
            <button onClick={handleDeleteAllItems}>
              Delete all 
              <Trash size={22}/>
            </button>
          </footer>
          :
          ''
        }
      </main>
    </div>
  )
}
