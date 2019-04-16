import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';
import BookCaseCategory from './BookcaseCategory';



class BookCase extends React.Component {


  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
    books: []
  }



  async componentDidMount() {
this.initializeBooks();

  }

  async initializeBooks()
  {

    const books = await BooksAPI.getAll();
    let currentlyReadingBooks = await this.distributeBooks(books).currentlyReadingBooks;
    let wantToReadBooks = await this.distributeBooks(books).wantToReadBooks;
    let readBooks = await this.distributeBooks(books).readBooks;

    this.setState({ currentlyReadingBooks, wantToReadBooks, readBooks });
  }


   distributeBooks(books) {
    let distributeBooks =
    {
      currentlyReadingBooks: [],
      wantToReadBooks: [],
      readBooks: []

    }
    books.forEach(book => {

      switch (book.shelf) {
        case "currentlyReading":
          distributeBooks.currentlyReadingBooks.push(book);

          break;
        case "wantToRead":
          distributeBooks.wantToReadBooks.push(book);

          break;
        case "read":
          distributeBooks.readBooks.push(book);
          break;

      }

    });

    return distributeBooks;

  }

updateBookcase = () =>
{
  this.initializeBooks();

}
  render() {
    return (

      <div className="app">


        <div className="list-books">

          <div className="list-books-content">
            <div>

              <BookCaseCategory 
                   name="Currently Reading" 
                  books={this.state.currentlyReadingBooks}
                  refresh={this.updateBookcase}  >
              </BookCaseCategory>

              <BookCaseCategory 
                  name="Want to Read" 
                  books={this.state.wantToReadBooks}
                  refresh={this.updateBookcase}  >
              </BookCaseCategory>


              <BookCaseCategory 
                  name="Read" 
                  books={this.state.readBooks}
                  refresh={this.updateBookcase}  >
              </BookCaseCategory>
            </div>
          </div>

        </div>

      </div>
    )
  }
}

export default BookCase
