import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general'
    }

    static PropTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apiKey: PropTypes.string
    }

    constructor() {
        super();
        // console.log("I am a constructor of News Component")
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            category: 'general'
        }
    }

    async componentDidMount() {
        // console.log('cdm')
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        // console.log(parsedData)

        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    }

    handlePrevClick = async () => {
        console.log("Previous")
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    handleNextClick = async () => {
        console.log("Next")
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json()

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }

    render() {
        return (

            <div className="container">
                <div className="header" style={{ margin: '2.5rem 0rem' }}>
                    <h2 className=" my-3 mb-3 text-center">Top Headlines - Aaj ki Taaza Khabar Sunn lo</h2>
                </div>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4 mb-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 40) : "No Title"} description={element.description ? element.description.slice(0, 80) : "No Description"} imageUrl={element.urlToImage ? element.urlToImage : "https://c.ndtvimg.com/2021-08/cglc0vfo_bhupesh-baghel_650x400_27_August_21.jpg"} newsUrl={element.url} />
                        </div>
                    })}

                </div>
                <div className="container d-flex justify-content-between mb-5">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button type="button" className='btn btn-dark'>{this.state.page}</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>

        )
    }
}

export default News
