import React, { Component } from 'react';

export class NewsItem extends Component {

    render() {
        let { title, description, imgUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className="my-3">
                <div className="card" >
                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: "absolute", right: '0' }}>
                        <span className=" badge rounded-pill bg-danger">
                            {source}
                        </span>
                    </div>
                    <img src={!imgUrl ? "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/13590/production/_97584297_breaking_news.png" : imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-danger">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} className="btn btn-sm btn-dark">Click for News Link </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem;


// constructorr tab run karta, jab bhi is class ka object banta hai

// target="_blank" isse pura url new tab me  open ho jayega

//rel="noreferrer" ek error ko hatane ke liye kar rhe hai

// agar author unknown hai to ham ise {!author?"Unknown":author} ese likh sakte hai

// GMT time ke liye => {date} se change kar ke =>  new Date(date).toGMTString() likh denge



