import React, { Component } from 'react'
import NewsItem from './NewsItem'
import ScrollButton from './ScrollButton'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'general',
        apiKey: 'e1841b7b047944d1b5462e3cb101e664',
        badgeColor: 'danger'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apiKey: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            category: this.props.category,
            totalResults: 0
        }
        document.title = `Coders News - ${this.capitalize(this.props.category)}`
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()

        this.setState({
            page: this.state.page,
            articles: parsedData.articles,
            loading: false,
            totalResults: parsedData.totalResults,
            category: this.props.category
        })
    }

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async componentDidMount() {
        this.updateNews()
    }


    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }

    handleNextClick = async () => {

        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            this.setState({ page: this.state.page + 1 })
            this.updateNews()
        }
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page,
            articles: this.state.articles.concat(parsedData.articles),
            loading: false,
            totalResults: parsedData.totalResults,
        })
    }


    render() {

        return (

            <>

                <div className="header" style={{ margin: '2.5rem 0rem' }}>
                    <h2 className=" my-3 mb-3 text-center">Coders News - Top {this.capitalize(this.state.category)} Headlines</h2>
                </div>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}>
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 mb-4" key={element.url} style={{ paddingTop: '12px' }}>
                                    <NewsItem title={element.title ? element.title.slice(0, 40) : "No Title"} description={element.description ? element.description.slice(0, 80) : "No Description"} imageUrl={element.urlToImage ? element.urlToImage : "https://c.ndtvimg.com/2021-08/cglc0vfo_bhupesh-baghel_650x400_27_August_21.jpg"} newsUrl={element.url} author={element.author ? element.author : "Unknown"} publishDate={element.publishedAt} source={element.source.name} badgeColor={this.props.badgeColor} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>


                {/* <div className="container d-flex justify-content-between mb-5">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button type="button" className='btn btn-dark'>{this.state.page}</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
                <ScrollButton />
            </>
        )
    }
}

export default News
