import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';


class BookCase extends React.Component {


  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books : []
  }


  componentDidMount()
  {

    if(!this.props.books)
    {
      console.log("NAO RECEBEU LIVROS, EXIBE TODOS..");
      BooksAPI.getAll()
      .then(data => 
      {
        console.log("RECUPERADOS LIVROS DA API",data);
        this.setState({books: data});
        console.log("STATE",this.state);
      })
      .catch(err => 
      {
        console.log("ERRO AO RECUPERAR LIVROS DA API"); 
      });
        
}else
{
  this.setState({books: this.props.books});
}

    }
   
 

  render() {
    return (
      
      <div className="app">
         
      
          <div className="list-books">
          
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books.map((book) => (
                      <li key={book.id}>
                      
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" +book.imageLinks.thumbnail+")" }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors[0]}</div>
                        </div>
                      </li>                    ))
                    }
                      
                  
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      
                    
                     
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        
      </div>
    )
  }
}

export default BookCase
