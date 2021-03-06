import React from 'react'
import './App.css'
import BookCase from './Bookcase'
import Header from './Header'
import Footer from './Footer'
import {  Route } from 'react-router-dom'
import Search from './Search';


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
  };


  render() {
    return (
      <div>
 <Route exact path="/" render={() =>(
        <div>
        <Header></Header>
        <BookCase></BookCase>
        <Footer></Footer>
        </div>
        
      )}/>

      <Route path="/search" component = {Search}></Route>
      </div>
     

      
    )
  }
}

export default BooksApp
