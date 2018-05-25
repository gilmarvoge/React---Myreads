import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ListBooksPage extends Component {
  state = {
    value: ''
  }

  //método para controlar se ouve alteração do shelf enquanto se está pesquisando na barra de pesquisa
  // se ouver alteração, este método de retorno no route para a tela principal e vai acionar o método "updateBook"
  updateBook(book, shelf) {
    this.props.onUpdateBook(book, shelf)
  }

  render() {
    const { books } = this.props
    let showingBooks
    showingBooks = books

    const shelve = ["currentlyReading", "wantToRead", "read"]
    const shelveNames = ["Currently Reading", "Want To Read", "Read"]

    return (

      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>
            {shelve.map((shelve, index) => {
              return (
                <div key={index} className="bookshelf">
                  <h2 className="bookshelf-title">{shelveNames[index]}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {showingBooks.filter(book => book.shelf === shelve).map((book) => (
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: ` url(${book.imageLinks ? book.imageLinks.smallThumbnail : ''})` }}></div>
                              <div className="book-shelf-changer">
                                <select value={book.shelf} onChange={event => this.updateBook(book, event.target.value)} >
                                  <option value="moveTo" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title"><p>{book.title}</p></div>
                            <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" className="open-search" >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooksPage