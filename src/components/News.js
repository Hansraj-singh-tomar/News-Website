import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,

    }

    // articles = [
    //     {
    //         "source": { "id": "bbc-sport", "name": "BBC Sport" },
    //         "author": "BBC Sport",
    //         "title": "World's oldest Test cricketer Ash dies",
    //         "description": "Eileen Ash, the world's oldest Test cricketer who made her England debut in 1937, dies at the age of 110.",
    //         "url": "http://www.bbc.co.uk/sport/cricket/59533539",
    //         "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/13590/production/_97584297_breaking_news.png",
    //         "publishedAt": "2021-12-04T13:37:43.5326981Z",
    //         "content": "Eileen Ash, the world's oldest Test cricketer, has died at the age of 110.\r\nThe bowler made her England debut in 1937, played seven Tests either side of World War Two and retired in 1949.\r\nEighty yea… [+1078 chars]"
    //     },
    //     {
    //         "source": { "id": "news24", "name": "News24" },
    //         "author": "Compiled by Kamva Somdyala",
    //         "title": "India tour to South Africa to go ahead with minor tweaks, CSA confirms",
    //         "description": "Cricket South Africa (CSA) confirmed that India's tour to the country will continue, with minor tweaks, amid concerns over the Omicron Covid-19 variant.",
    //         "url": "https://www.news24.com/sport/Cricket/Proteas/india-tour-to-south-africa-to-go-ahead-with-minor-tweaks-csa-confirms-20211204",
    //         "urlToImage": "https://cdn.24.co.za/files/Cms/General/d/11627/b80f7c50b8f045b08e13c7b2c16e5e86.jpg",
    //         "publishedAt": "2021-12-04T10:12:40+00:00",
    //         "content": "Cricket South Africa (CSA) confirmed that India's tour to the country will continue as originally scheduled, with minor tweaks, amid concerns over the Omicron Covid-19 variant.\r\nIn a statement on Sat… [+786 chars]"
    //     },
    //     {
    //         "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
    //         "author": null,
    //         "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //         "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //         "publishedAt": "2020-04-27T11:41:47Z",
    //         "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //     },
    //     {
    //         "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
    //         "author": null,
    //         "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //         "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //         "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //         "publishedAt": "2020-03-30T15:26:05Z",
    //         "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //     }
    // ]

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // constructor me props use karne ke liye props pass karna padega 
    constructor(props) {
        super(props);
        // console.log("hello i am a constructor from news component");  // hello i am a constructor 3 times run hua hai console me because ye constructor newsitem ka hai or hamare pass 3 newsitem hai that's why 
        this.state = {
            // articles: this.articles,
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        // document.title = `${this.props.category} - NewsMonkey`; // isse sabse upar vale bar me jis bhi category ko click karunga vo category show hogi ise pehle sirf newsmonkey hi show ho rha tha 
        // this.props.category ko capitalize karne karne ke hame capitalize function ka use karna padega jo ham google se search karne vale hai 
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.props.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        console.log(data);
        let parsedData = await data.json()
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);
    }
    // jha jha bhi updateNews use hua hai vha vha ham this.props.setProgress(0); ka use karenge

    async componentDidMount() {
        // console.log('componentDidMount');
        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=5d2698cffb964aa79b5456433c4316d4&page=1&pageSize=20`;

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5d2698cffb964aa79b5456433c4316d4&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // console.log(data);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false,
        // })
        this.updateNews();
    }

    handlePrevClick = async () => {
        // console.log("prev button is clicked");
        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=5d2698cffb964aa79b5456433c4316d4&page=${this.state.page - 1}&pageSize=20`;

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5d2698cffb964aa79b5456433c4316d4&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // // console.log(data);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // // this.setState({ articles: parsedData.articles })
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false,
        // });
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }
    handleNextClick = async () => {
        // console.log("Next button is clicked");
        // if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        //     // let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=5d2698cffb964aa79b5456433c4316d4&page=${this.state.page - 1}&pageSize=20`;
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5d2698cffb964aa79b5456433c4316d4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({ loading: true });
        //     let data = await fetch(url);
        //     // console.log(data);
        //     let parsedData = await data.json()
        //     console.log(parsedData);
        //     // this.setState({ loading: false });
        //     // this.setState({ articles: parsedData.articles })
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false,
        //     });
        // }
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }
    fetchMoreData = async () => {
        this.setState({ pageSize: this.state.pageSize + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.props.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });  // loading: false, // upar loading show karvane ke liye comment kar rha hu
        let data = await fetch(url);
        console.log(data);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            // loading: false, // upar loading show karvane ke liye comment kar rha hu
        })
    };

    render() {
        // console.log('render');
        return (
            <>
                {/* // <div className="container my-3"> */}
                {/* <h1 className='text-center' style={{ margin: '35px 0px' }}>NewsMonkey - Top Headlines</h1> */}
                <h1 className='text-center' style={{ margin: '35px 0px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>

                {/* // infinite loading ke liye ise hame hatana padega */}
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    // hasMore={this.props.pageSize !== this.state.totalResults}
                    loader={<Spinner />}
                >

                    <div className="container">
                        <div className="row">
                            {/* {!this.state.loading && this.state.articles.map((element) => { */}
                            {this.state.articles.map((element) => {
                                return (<div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>);
                            })};
                        </div>
                    </div>
                </InfiniteScroll>

                {/* // niche ka code infinite scroll ke liye ham isse abhi comment kar rhe hai   */}
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
                </div> */}
                {/* </div> */}
            </>
        )
    }
}

export default News;

// md-4 means medium devices me four column le lega

// <NewsItem title={element.title.slice(0, 45)} description={element.description.slice(0, 88)} imgUrl={element.urlToImage} newsUrl={element.url} />

// <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imgUrl={element.urlToImage} newsUrl={element.url} />

// componentDidMount() method ek life cycle method hai jo render() methiod ke baad run hoti hai or usse bhi pehle constructor method run hoti hai

// https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=5d2698cffb964aa79b5456433c4316d4&page=2

// https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=5d2698cffb964aa79b5456433c4316d4

// bootstrap se flex ka code copy kiiya hai

// then we will get right arrow and left arrow to search for left arrow (&larr) and fir right ke liye (&rarr) , i will have to search previous arrow code in html

// agar mera jo page hai agar vo ek ya se kam hai to me previous nhi dunga uske liye ham likhenge disabled={this.state.page <= 1} isi pakar ham next vale ko bhi disable karenge but hame pta hona chahiye ki hamre pass kitne page available hai

// https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=5d2698cffb964aa79b5456433c4316d4&pageSize=2 iss url se hame sirf 2 hi news milegi so mere pass total 38 artical hai so 38/2 = 19 so me 19 page create kar sakta hu math.ceil() (4.6=5) value hona chahiye

// mene app.js file se ek props pass kiya page size nam se end use jha jha bhi 20 tha vha par this.props.pageSize se replace kar diya

// create grif spinner, ye mene search kiya google par isme ek ajaxload.info website hai vha se mene ye search kiya hai
// is spinnner gif ko ham newsapp ke src folder me loading.gif nam ses save kar dete hai or iska alag ek component bna lete hai

// {this.state.loading && <Spinner/>}  -> iska mtlb ye hai ki this.state.loading true hai to ye spinner dikhye varna ye na dikhaye

// line no 121 par  {!this.state.loading &&this.state.articles.map((element) => {     ka mtlb this.state.loading false hai tab iske andar ka code chalega

// https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=5d2698cffb964aa79b5456433c4316d4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}
// change to this https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5d2698cffb964aa79b5456433c4316d4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}

// ab ham react router dom ki website par jayenge and vha se copy/paste marenge

// ab ham react-infinite-scroll-component ka use karenge modern website banane ke liye

// ab ham ek or npm package use kar rhe hai jo hai react-top-loading-bar package 