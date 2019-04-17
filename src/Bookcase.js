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

  componentDidMount() {

    this.setBooks();
  }

  async setBooks() {
    const books = await BooksAPI.getAll();
    this.setState({ books: books });
    this.initializeBooks();
  }

  componentWillReceiveProps(props) {

    if (props.books) {
      this.setState({ books: props.books })
      console.log("SETOU BOOKS...");
    }
    this.initializeBooks();

  }


  initializeBooks() {
    let currentlyReadingBooks = this.distributeBooks().currentlyReadingBooks;
    let wantToReadBooks = this.distributeBooks().wantToReadBooks;
    let readBooks = this.distributeBooks().readBooks;

    this.setState({ currentlyReadingBooks, wantToReadBooks, readBooks });
  }


  distributeBooks() {
    let distributeBooks =
    {
      currentlyReadingBooks: [],
      wantToReadBooks: [],
      readBooks: []

    }
    console.log("DISTRIBUTEBOOKS ENXERGA", this.state.books);
    this.state.books.forEach(book => {

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

        default:
          console.log("SE ENCAIXA EM PORRA NENHUMA", book);

      }

    });
    console.log('LIVROS DISTRIBUIDOS', distributeBooks);

    return distributeBooks;

  }

  updateBookcase = () => {
    this.setBooks();
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
