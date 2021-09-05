import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor() {
        super();
        // console.log("I am a constructor of News Component")
        this.state = {
            articles: [],
            loading: false
        }
    }

    async componentDidMount() {
        console.log('cdm')
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=e1841b7b047944d1b5462e3cb101e664";
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({articles: parsedData.articles})
    }

    render() {
        return (
            
                <div className="container">
                    <h2 className=" my-3 mb-3">Top Headlines - Aaj ki Taaza Khabar Sunn lo</h2>
                    <div className="row">
                    {this.state.articles.map((element)=>{
                        return <div className="col-md-4 mb-4" key={element.url}>
                            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://c.ndtvimg.com/2021-08/cglc0vfo_bhupesh-baghel_650x400_27_August_21.jpg"} newsUrl={element.url}/>
                        </div>  
                    })}
                                    
                    </div>
                </div>
            
        )
    }
}

export default News
