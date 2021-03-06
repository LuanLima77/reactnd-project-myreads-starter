import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';



class BookCaseCategory extends React.Component {


  state = {

    books: [],
    name: "",
    possibleShelfs: ["currentlyReading", "wantToRead", "read"]
  }

  constructor(props) {
    super(props);
    this.handleBookcaseChange = this.handleBookcaseChange.bind(this);

  }

  componentWillReceiveProps(props) {
    if (props.books) {
      this.setState({ books: props.books });
    }

    if (props.name) {
      this.setState({ name: this.props.name });

    }
  }



  handleBookcaseChange(book, event) {
    BooksAPI.update(book, event.target.value)
      .then(updateOk => {
        console.log("ATUALIZACAO COM SUCESSO", updateOk);
        if (this.props.refresh) {
          this.props.refresh();
        }
      })
      .catch(error => {
        console.log("ATUALIZACAO COM ERRO", error);
      });

  }

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.state.name}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.state.books.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" 
                      style={ book.imageLinks? 
                        { width: 128, height: 193, backgroundImage: "url(" + book.imageLinks.thumbnail + ")" }
                      : null}>
                      </div>
                      <div className="book-shelf-changer">
                        <select 
                        value= {this.state.possibleShelfs.includes(book.shelf) ? book.shelf : "none"}
                        onChange={this.handleBookcaseChange.bind(this, book)}
                        >
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors ? book.authors.join(', ') : "-"}</div>
                  </div>
                </li>))
              }


            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default BookCaseCategory
