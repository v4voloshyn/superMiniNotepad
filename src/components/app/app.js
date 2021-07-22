import React, { Component } from 'react';
import nextId from "react-id-generator";
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css'

// import styled from 'styled-components';

export default class App extends Component {
   constructor(props) {
      super(props);
      // Типа Data Base
      this.state = {
         data: [
            { label: 'Going to learn React', important: false, like: false, id: '1' },
            { label: 'Have a lunch', important: false, like: false, id: '2' },
            { label: 'Go to sport', important: true, like: false, id: '3' },
         ],
         term: '',
         filter: 'all'
      } //---
      this.deleteItem = this.deleteItem.bind(this);
      this.addItem = this.addItem.bind(this);
      this.onToggleImportant = this.onToggleImportant.bind(this);
      this.onToggleLiked = this.onToggleLiked.bind(this);
      this.onUpdateSearch = this.onUpdateSearch.bind(this);
      this.onFilterSelect = this.onFilterSelect.bind(this);

      this.maxId = 4;
   }

   //Добавляем елемент в список
   addItem(body) {
      //Определяем константу генератора случайных ID react-id-generator
      const uniqId = nextId();
      const newItem = {
         label: body,
         important: false,
         like: false,
         id: uniqId
      }
      this.setState(
         ({ data }) => {
            const newArr = [...data, newItem];
            // console.log(newItem.id);
            return {
               data: newArr
            }
         }
      )
   }
   //---Добавляем елемент в список

   // Удаляем елемент со списка
   deleteItem(id) {
      this.setState(
         ({ data }) => {
            const result = data.filter(elem => elem.id !== id)
            return {
               data: result
            }
            // const index = data.findIndex(elem => elem.id === id);

            // const dataBeforeRemoveItem = data.slice(0, index);
            // const dataAfterRemoveItem = data.slice(index + 1);

            // const newArrData =[...dataBeforeRemoveItem, ...dataAfterRemoveItem];

            // return {
            //    data: newArrData
            // }
         })
   }
   //---Удаляем елемент со списка

   // Общий тоглер состояний Like or Important
   onToggleItemState(id, state) {
      this.setState(({ data }) => {
         const indexOfDataPostItem = data.findIndex(elem => elem.id === id);

         const oldDataObj = data[indexOfDataPostItem];
         const modifiedDataObj = { ...oldDataObj, [state]: !oldDataObj.[state] };

         const newDataArr = [...data.slice(0, indexOfDataPostItem), modifiedDataObj, ...data.slice(indexOfDataPostItem + 1)];

         return {
            data: newDataArr
         }
      })
   }

   // Тоглер Важных постов на странице
   onToggleImportant(id) {
      this.onToggleItemState(id, 'important')
   }
   // ---Тоглер Важных постов на странице

   // Тоглер Лайкнутых постов на странице
   onToggleLiked(id) {
      this.onToggleItemState(id, 'like')
   }
   // --- Тоглер Лайкнутых постов на странице

   // Поиск по заметкам
   searchPost(items, term) {
      if (term.length === 0) {
         return items;
      }

      return items.filter((item) => {
         return item.label.indexOf(term) > -1;
      })

   }

   filterPost(items, filter) {
      if (filter === 'like') {
         return items.filter(item => item.like);
      } else {
         return items;
      }
   }

   // Функция обновления state'a  для рендеринга SearchPanel
   onUpdateSearch(term) {
      this.setState({ term });
   }

   onFilterSelect(filter) {
      this.setState({ filter });

   }

   render() {
      // Деструктурируем data state
      const { data, term, filter } = this.state;

      const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

      const countOfLikedPosts = data.filter(item => item.like).length;
      const countOfAllPosts = data.length;
      // Константа - фильтр входящих данных на наличие заголовка и ID
      // const filteredData = data
      //    .filter(item => item && item.hasOwnProperty('id') && item.label !== '')

      return (
         <div className="app">
            <AppHeader
               countOfLikedPosts={countOfLikedPosts}
               countOfAllPosts={countOfAllPosts}
            />
            <div className="search-panel d-flex">
               <SearchPanel
                  onUpdateSearch={this.onUpdateSearch}
               />
               <PostStatusFilter
                  filter={filter}
                  onFilterSelect={this.onFilterSelect}
               />
            </div>
            <PostList
               posts={visiblePosts} //filteredData
               onDelete={this.deleteItem}
               onToggleImportant={this.onToggleImportant}
               onToggleLiked={this.onToggleLiked}
            />
            <PostAddForm
               onAdd={this.addItem}
            />
         </div>
      )
   }
}