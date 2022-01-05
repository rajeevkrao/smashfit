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
                                    <span data-animation="fadeInLeft" data-delay="0.09s">Strength Training</span>
                                </div> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\with equipments\exercise-close-grip-bench-press.gif"/>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                            	<img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\with equipments\machinefly.gif"/> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\with equipments\uprightrow.gif"/> 
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\with equipments\chestsuppoted.gif"/> 
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\with equipments\lateralraises.gif"/> 
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                                <img className="gifs" data-animation="fadeInLeft" data-delay="0.09s" src="..\assets\img\gifs\with equipments\tricepskickback.gif"/> 
                            </div>
                        </div>
                    </div>
				</div>
			);
	}
}


export default App;
