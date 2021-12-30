import React, { Component } from 'react';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: null,
			items: [],
			isLoaded: false,
		}
	}

	componentDidMount() {
		/*fetch('/api/getblogs')
			.then(res => res.json())
			.then(json => {
				this.setState({
					isLoaded: true,
					items: json.posts.items,
				})

			});
            */
	}

	render() {


		/* var { isLoaded, items } = this.state;
		if (!isLoaded) {
			return <div>Loading...</div>
		} 
		else*/
			return (
				<div className="App">
					{/* <ul>
						{items.map(function(item, index) {
							return <li key={index}><a href={item.url} style={{ "width": "100%", "display": "block", "whiteSpace": "nowrap", "textOverflow": "ellipsis", "overflow": "hidden" }}>{item.title}</a></li>
						})}
					</ul> */}
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-9 col-lg-9 col-md-10">
                                <div class="hero__caption">
                                    <span data-animation="fadeInLeft" data-delay="0.09s">Muscle gaining</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <img class="gifs" data-animation="fadeInLeft" data-delay="0.09s" style="background-color: black;" src="\assets\img\gifs\flutter-kick.gif">
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6">
                            <img class="gifs" data-animation="fadeInLeft" data-delay="0.09s" style="background-color: black;" src="\assets\img\gifs\bicycle.gif"> 
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <img class="gifs" data-animation="fadeInLeft" data-delay="0.09s" style="background-color: black;" src="\assets\img\gifs\Inchworm.gif"> 
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <img class="gifs" data-animation="fadeInLeft" data-delay="0.09s" style="background-color: black;" src="\assets\img\gifs\plank-Taps.gif"> 
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <img class="gifs" data-animation="fadeInLeft" data-delay="0.09s" style="background-color: black;" src="\assets\img\gifs\push-up.gif"> 
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <img class="gifs" data-animation="fadeInLeft" data-delay="0.09s" style="background-color: black;" src="\assets\img\gifs\Triceps-Dips.gif"> 
                            </div>
                        </div>
                    </div>
				</div>
			);
	}
}


export default App;
