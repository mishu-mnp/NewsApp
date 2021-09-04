import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    render() {
        return (
            <>
                <div className="container">
                    <h2 className=" my-3 mb-3">Top Headliner - Cricket India Vs Pakistan</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <NewsItem title="myTitle" description="This is some description" />
                        </div>
                        <div className="col-md-4 mb-4">
                            <NewsItem title="myTitle" description="This is some description" />
                        </div>
                        <div className="col-md-4 mb-4">
                            <NewsItem title="myTitle" description="This is some description" />
                        </div>
                        <div className="col-md-4 mb-4">
                            <NewsItem title="myTitle" description="This is some description" />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default News
