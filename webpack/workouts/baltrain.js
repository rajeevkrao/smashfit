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
                                    <span data-animation="fadeInLeft" data-delay="0.09s">Balance Training</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\without equipments\Aquaman.gif"/>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                            	<img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\without equipments\cat stretch.gif"/> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\without equipments\lunges.gif"/> 
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\without equipments\Superman.gif"/> 
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\without equipments\Skaters.gif"/> 
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\without equipments\Single-Leg-Deadlift.gif"/> 
                            </div>
                        </div>
                    </div>
				</div>
			);
	}
}


export default App;
