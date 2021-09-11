import React, { Component } from 'react'
import '../index.css'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, publishDate, source, badgeColor } = this.props;
        return (
            <div>
                {/* This is News Item Component */}

                <div className="card">
                    <span class={`position-absolute top-0 pos-85 translate-middle badge rounded-pill bg-${badgeColor}`}>
                        {source}
                    </span>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">Publisheg by {author} on {new Date(publishDate).toDateString()}</small></p>
                        <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-primary">See More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
