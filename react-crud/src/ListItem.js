import React from 'react';

const ListItem = (props) => {
    return <li key={props.item.id} className="list-group-item">
    <button 
    className="btn btn-info mr-4" 
    onClick={props.editItem}>U</button>
    {props.item.name}
    <button 
    className="btn btn-danger ml-4" 
    onClick={props.deleteItem}>X</button>
  </li>
}

export default ListItem;