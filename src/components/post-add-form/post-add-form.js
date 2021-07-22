import React, { Component } from 'react';

import './post-add-form.css';

export default class PostAddForm extends Component {
   constructor(props) {
      super(props);
      // Стейт поля ввода текста для новой заметки
      this.state = {
         text: ''
      }

      this.onValueChange = this.onValueChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
   }
   //Записываем в Стейт последнее значение(value) поля input;
   onValueChange(event) {
      this.setState({
         text: event.target.value
      })
   } 
   // Добавляем новую заметку в форму
   onSubmit(event) {
      event.preventDefault();
      // Проверям поле ввода на пустую строку чтоб мы её не смогли добавить в форму
      if (this.state.text === '') {
         event.preventDefault();
      } else { // Если НЕ пустая, то добавляем заметку в форму
         this.props.onAdd(this.state.text);
      }
      //Очищаем инпут ввода текста при отправке
      this.setState({
         text: ''
      })
   }

   render() {
      return (
         <form 
         className="bottom-panel d-flex"
         onSubmit={this.onSubmit}
         >
            <input
               type="text"
               placeholder="Введите текст заметки сюда"
               className="form-control new-post-label"
               onChange={this.onValueChange}
               value={this.state.text}
            />
            <button
               type="submit"
               className="btn btn-outline-secondary">
               Добавить
            </button>
         </form>
      );
   }
}