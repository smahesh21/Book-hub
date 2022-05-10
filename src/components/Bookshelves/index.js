import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    booksList: [],
    searchInput: '',
    searchText: '',
    bookshelfName: bookshelvesList[0].value,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBooks()
  }

  formattedData = book => ({
    id: book.id,
    title: book.title,
    authorName: book.author_name,
    readStatus: book.read_status,
    coverPic: book.cover_pic,
    rating: book.rating,
  })

  getBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {bookshelfName, searchText} = this.state
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedList = fetchedData.books.map(eachBook =>
        this.formattedData(eachBook),
      )
      console.log(updatedList)
      this.setState({
        booksList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickShelfItem = value => {
    this.setState({bookshelfName: value}, this.getBooks)
  }

  onChangeSearchText = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    const {searchInput} = this.state
    this.setState({searchText: searchInput}, this.getBooks)
  }

  renderBookShelvesListSection = () => {
    const {bookshelfName} = this.state
    return (
      <div className="books-shelves-list-container">
        <h1 className="bookshelves-heading">Bookshelves</h1>
        <ul className="book-shelves-list">
          {bookshelvesList.map(eachType => {
            const {id, label, value} = eachType
            const onClickShelf = () => {
              this.onClickShelfItem(value)
            }
            return (
              <li key={id} className="book-shelf">
                <button
                  type="button"
                  onClick={onClickShelf}
                  className="shelf-button"
                >
                  {label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderSearchSection = () => {
    const {searchText} = this.state
    console.log(searchText)
    return (
      <div className="search-container">
        <input
          type="search"
          value={searchText}
          onChange={this.onChangeSearchText}
          className="search-element"
          placeholder="Search"
        />
        <button
          type="button"
          testid="searchButton"
          className="search-button"
          onClick={this.onClickSearchIcon}
        >
          <BsSearch size={16} />
        </button>
      </div>
    )
  }

  renderBooksList = () => {
    const {booksList} = this.state
    return (
      <ul className="books-list-container">
        {booksList.map(eachBook => {
          const {id, title, coverPic, rating, readStatus, authorName} = eachBook
          return (
            <li key={id} className="bookslist-item">
              <img src={coverPic} className="cover-pic" alt={title} />
              <div className="book-details-container">
                <h1 className="title">{title}</h1>
                <p className="author-name">{authorName}</p>
                <p className="rating">
                  Avg Rating <BsFillStarFill size={12} className="star" />{' '}
                  {rating}
                </p>
                <p className="read-status">
                  Status:{' '}
                  <span className="read-status-span-text">{readStatus}</span>
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  renderBooksDisplaySection = () => {
    const {bookshelfName} = this.state
    const bookShelf = bookshelvesList.filter(
      eachShelf => eachShelf.value === bookshelfName,
    )
    console.log(bookShelf)
    const shelfName = bookShelf[0].label

    return (
      <div className="books-display-container">
        <div className="heading-search-container">
          <h1 className="all-books-heading">{`${shelfName} Books`}</h1>
          {this.renderSearchSection()}
        </div>
        {this.renderBooksList()}
      </div>
    )
  }

  renderBookShelvesSection = () => (
    <div className="book-shelves-responsive-container">
      {this.renderBookShelvesListSection()}
      {this.renderBooksDisplaySection()}
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/diocftr6t/image/upload/v1651940772/Group_7522Failure_Image_ykvhlm.png"
        className="failure-image"
        alt="failure view"
      />
      <p className="failure-heading">Something went wrong, Please try again.</p>
      <div>
        <button
          type="button"
          onClick={this.onClickTryAgain}
          className="try-again-button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBooksListDisplayBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookShelvesSection()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="book-shelves-container">
        <Header />
        {this.renderBooksListDisplayBasedOnApiStatus()}
        <Footer />
      </div>
    )
  }
}
export default Bookshelves
