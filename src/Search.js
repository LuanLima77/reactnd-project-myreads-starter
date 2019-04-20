import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';
import BookCaseCategory from './BookcaseCategory';
import { Link } from 'react-router-dom';



class Search extends React.Component {


  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    shelfBooks: [],
    keyword: ""
  }

  componentDidMount() {

    this.setShelfBooks();
  }


  async setShelfBooks(updateShelf) {
    const books = await BooksAPI.getAll();
    this.setState({ shelfBooks: books });
    if(updateShelf)
    {
      this.distributeBooks();

    }
  }


  updateBooks = () => {
    
this.setShelfBooks(true);
}

  distributeBooks(books) {

    books.forEach(book => {

      this.state.shelfBooks.forEach(shelfBook => {
        if(book.id === shelfBook.id)
        {
          console.log("SEPARAR NA ESTANTE...",shelfBook.shelf);
          book.shelf = shelfBook.shelf; 
        }
      });
    });
    this.setState({ books: books });
  }


  handleSearch = (event) => {
    this.setState({ keyword: event.target.value });
    if (this.state.keyword.length > 2) {
      BooksAPI.search(this.state.keyword)
        .then(data => {
          if (data.length) {
            this.distributeBooks(data);

          }
          console.log("search", data);


        })
        .catch(err => {
          console.log("ERRO AO RECUPERAR LIVROS DA API");
        });
    }
  }



  render() {
    return (

      <div className="app">

        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">

              <button className="close-search"
              >Close</button>
            </Link>
            <div className="search-books-input-wrapper">

              <input type="text" placeholder="Search by title or author"
                value={this.state.keyword}
                onChange={this.handleSearch} />

            </div>
          </div>

        </div>
        <br></br>
        <BookCaseCategory
          books={this.state.books}
          refresh={this.updateBooks}
        >
        </BookCaseCategory>


      </div>
    )
  }
}

export default Search
