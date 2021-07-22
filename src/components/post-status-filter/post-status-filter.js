import React, { Component } from 'react';
// import reactstrap from 'reactstrap';
import './post-status-filter.css';

export default class PostStatusFilter extends Component {
   constructor(props) {
      super(props);
      this.buttons = [
         { name: 'all', label: 'Все' },
         { name: 'like', label: 'Понравилось' }
      ]

   }
   render() {
      const buttons = this.buttons.map(({ name, label }) => {
         const activeBtn = this.props.filter === name;
         const outline = activeBtn ? '' : ''
         const activeClass = activeBtn ? 'btn-info' : 'btn-outline-danger';
         return (
            <button key={name}  
            type='button'
            className={`${activeClass} ${outline}`}
            onClick={(() => this.props.onFilterSelect(name))}> {label}</button>
         )
      })
      return (
         <div className="btn-group">
            {buttons}
            {/* <Button color='info'>Всё</Button>
            <Button outline color='danger'>Понравилось</Button> */}
         </div>
      )
   }
}