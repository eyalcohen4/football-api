import React, {Component} from 'react';
import GameMenuContainer from '../components/gamemenu/gameMenuContainer';
import GameDisplayContainer from '../components/gamedisplay/gameDisplayContainer';
import CircularIndeterminate from '../components/loader/loader';
import Container from '@material-ui/core/Container';

/** @TODO Try to work with prettier, it'll give you a lot of points later for anyone who will see the code.
 * Ive created a file named FootballApiPreety.js, take a look how much easier is to read the code :)
 */

class FootballAPI extends Component {
	/* @TODO If there is no logic in the constructor and hes being used only to declare properties,
	/* You can write your class like this:

		class FootballAPI extends Component {
			BASE_URL = 'http://api.football-data.org/v2';

			state = {
				property: 'value'
			}
		}

	*/

 	constructor(props) {
 		super(props);
		this.BASE_URL = 'http://api.football-data.org/v2';
		this.state = {
			competitions: [],
			league: '',
			fixture: '',
			area: '',
			competitionId: 0,
			matches: [],
			
			// @TODO no PascalCase for object properties
			CircularIndeterminate: false,
			hasMenuChanged: false,
			isPrams: true,
			
			// @TODO WAT
			alert: {props}
				 
			//group-stage: 91
			}
		}

	componentDidMount() {
		this.getCompetiotionsRaw();
		console.log('alert-API', alert)
	}

	async getCompetiotionsRaw() {
		// @TODO can be a const
		let rawCompetitions = [];
		let competitions = [];

		await this.showLoader();
   		const request = 
   			await fetch('http://api.football-data.org/v2/competitions', {
   				method: 'get', 
   				headers: {
   					'X-Auth-Token': '8cd109a7cd8a4fd599ae76de90536c6a'
   				}
   			})
		   const data = await request.json();
		   
		   // @TODO moving this part to a function will make this one more easy to read
   		rawCompetitions.push({ data });
   		//console.log('data', rawCompetitions[0].data.competitions);
   		await rawCompetitions[0].data.competitions.map((competition, i) => {
   			if (rawCompetitions[0].data.competitions[i].plan === 'TIER_ONE' &&
   				rawCompetitions[0].data.competitions[i].id !== 2018 &&
   				rawCompetitions[0].data.competitions[i].id !== 2000) {
   			competitions.push( competition )
   		}
   		})
   		//console.log(this.state.hasMenuChanged)
		   //console.log('competition', competitions)
		   
		// @TODO no need for a function
   		this.setState(() => {
			return {competitions: competitions};
			})
   		//console.log('state', this.state.competitions)
   		const err = await ((err) => console.log(err, 'err')) 
   		await this.hideLoader();
  	}


	  /* @TODO Nice trick for show/hide (toggles):
	  	toggleLoader = (isLoading = null) => {
			  this.setState(state => ({
				  isLoading: isLoading !== null ? isLoading : !state.isLoading
			  }))
		  }

		if you dont understand this part let me know
	  */
	hideLoader = () => {
    	this.setState({ CircularIndeterminate: false });
  	}

  	showLoader = () => {
   		this.setState({ CircularIndeterminate: true });
  	}

  	hasMenuChanged = () => {
  		this.setState({ hasMenuChanged: true })
  		//console.log(Boolean(this.state.hasMenuChanged))
  	}

	handleMenuChanges = async ({ fixture, league, competitionId, area, isPrams}) => {
		if (isPrams == true) {

		await this.showLoader()
		await this.hasMenuChanged()
		await this.setState({
			isPrams: isPrams
			})
		await this.setState({
			league: league,
			fixture: fixture,
			competitionId: competitionId,
			area: area,
			})
		/*await console.log(
			'handleMenuChanges',
			this.state.league, 
			this.state.fixture,
			this.state.competitionId, 
			this.state.area
			)*/

		await this.getCompititionFixtures();
		} else {
			console.log('alert-function', alert)
			return alert('You shall not pass! please fill the form!')
		}
	}

	getCompititionFixtures = async () => {
		let allMatches = [];
		let fixture = [];
		const request = 
			await fetch(`http://api.football-data.org/v2/competitions/${this.state.competitionId}/matches`, {
            	method: 'get',
            	headers: {
            		'Content-Type': 'application/json',
					'X-Auth-Token':	'8cd109a7cd8a4fd599ae76de90536c6a'	
					},
           		})
		const data = await request.json();
		allMatches.push( data );
		await allMatches[0].matches.map((match, i) => {
			if (match.matchday === this.state.fixture) {
				fixture.push({match})
			}
		})

		const err = await (error => console.log('you must choose league and fixture')) 
		this.setState(() => {
			return {matches: fixture}
			}
		)
		//console.log('state - matches', this.state.matches)
		this.hideLoader();
		}

	render() {
		// @TODO The else is unnecessary since you returned here

			if(this.state.CircularIndeterminate == true) {
				return (
 					<div
 					style={{
			 			display: 'flex',
			 			justifyContent: 'center',
			 			alignContent: 'center',
			 			marginTop: '20%',
			 			marginBottom: '20%'
			 		}}>
 					<CircularIndeterminate 
		 			style={{
		 				alignSelf: 'center'
		 			}} /> 
			  		</div>
 			)} else {
				return (
				<div
				style={{
				position: 'relative',
				marginBottom: '20%',
				marginTop: '7%',
				width: '100%'
				}}>
					<GameMenuContainer 
					handleMenuChanges={this.handleMenuChanges} 
					competitions={this.state.competitions}
					handleNoEntry={this.handleNoEntry} />
					<GameDisplayContainer
					alert={this.state.props}
					isPrams={this.state.isPrams} 
					league={this.state.league}
					matches={this.state.matches}
					fixture={this.state.fixture} 
					hasMenuChanged={this.state.hasMenuChanged} />
				</div>
			)}
			}
}

export default FootballAPI;