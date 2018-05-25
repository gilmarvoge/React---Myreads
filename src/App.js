import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooksPage from './ListBooksPage';
import SearchBookPage from './SearchBookPage ';
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  //é chamado após o componente ser montado, e chama o metodo para trazer todos os livros
  componentDidMount() {
    this.getAllBooks();
  }

  //método para trazer todos os livros, pega os livros a partir do BooksAPI
  //e seta os livros na propriedade books.
  getAllBooks = () => {
    BooksAPI.getAll().then(books => this.setState({ books }));
  };

  //método para atualizar o livro, recebe 2 parametros, sendo um objeto livro e o shelf para atualizar no livro 
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(this.getAllBooks)
    book.shelf = shelf;
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooksPage
            books={this.state.books}
            onUpdateBook={this.updateBook}
          />
        )} />
        <Route path="/search" render={() => (
          <SearchBookPage
            books={this.state.books}
            onUpdateBook={this.updateBook}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
