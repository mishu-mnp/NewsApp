import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const updateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        setPage(page)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    }

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        document.title = `Coders News - ${capitalize(props.category)}`
        updateNews();
        // eslint-disable-next-line 
    }, [])

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }

    return (
        <>
            <div className="header" style={{ margin: '2.5rem 0rem' }}>
                <h1 className=" my-3 mb-3 text-center">Coders News - Top {capitalize(props.category)} Headlines</h1>
            </div>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4 mb-4" key={element.url} style={{ paddingTop: '12px' }}>
                                <NewsItem title={element.title ? element.title.slice(0, 40) : "No Title"} description={element.description ? element.description.slice(0, 80) : "No Description"} imageUrl={element.urlToImage ? element.urlToImage : "https://c.ndtvimg.com/2021-08/cglc0vfo_bhupesh-baghel_650x400_27_August_21.jpg"} newsUrl={element.url} author={element.author ? element.author : "Unknown"} publishDate={element.publishedAt} source={element.source.name} badgeColor={props.badgeColor} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}


News.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general',
    badgeColor: 'danger'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string
}

export default News
