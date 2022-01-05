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

	}

	render() {
			return (
				<div className="App">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-9 col-md-10">
                                <div className="hero__caption">
                                    <span data-animation="fadeInLeft" data-delay="0.09s">Full Body Workout</span>
                                </div> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\with equipments\machinechestpress.gif"/>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                            	<img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\with equipments\latpulldown.gif"/> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\with equipments\deadlifts.gif"/> 
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\with equipments\pullups.gif"/> 
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\with equipments\seated row.gif"/> 
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\with equipments\shoulderpress.gif"/> 
                            </div>
                        </div>
                    </div>
				</div>
			);
	}
}


export default App;
