import React, { Component } from "react";
import './index.css'
import 'weather-icons/css/weather-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './app_component/weather.component.jsx'
import Form from './app_component/Form.component.jsx'



//api call api.openweathermap.org/data/2.5/weather?q=London,uk
const API_Key='acd35f9b6346167df4791f85c2d316d3'
export default class App extends React.Component{
 constructor(){
    super();
    this.state={
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celcius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:undefined,
      error:false
    }
    

    this.weatherIcon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-drizzle",
      Rain:"wi-Rain",
      Snow:"wi-Snow",
      Atmosphere:"wi-atmosphere",
      Clear:"wi-clear",
      Cloud:"wi-cloud"
    }
  }
  calCelcius(temp){
    let cell=Math.floor(temp-273.15);
    return cell;
  }
  getWeatherIcon(icons,rangeId){
    switch(true){
      case rangeId>=200 && rangeId<=232:
        this.setState({icon:this.weatherIcon.Thunderstorm})
        break;
        case rangeId>=300 && rangeId<=321:
        this.setState({icon:this.weatherIcon.Drizzle})
        break;
        case rangeId>=500 && rangeId<=531:
        this.setState({icon:this.weatherIcon.Rain})
        break;
        case rangeId>=600 && rangeId<=622:
        this.setState({icon:this.weatherIcon.Snow})
        break;
        case rangeId>=701 && rangeId<=781:
        this.setState({icon:this.weatherIcon.Atmosphere})
        break;
        case rangeId>=771 && rangeId<=780:
        this.setState({icon:this.weatherIcon.Clear})
        break;
        case rangeId>=801 && rangeId<=804:
        this.setState({icon:this.weatherIcon.Cloud})
        break;
        default:this.setState({icon:this.weatherIcon.Clear})
    }

  }
    getWeather=async(e)=>
    {
      e.preventDefault();
      const city=e.target.elements.city.value;
      const country=e.target.elements.country.value;

      if(city && country)
      {
      const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`)
      const response= await api_call.json();
      console.log(response)
     
      this.setState({
        city:`${response.name},${response.sys.country}`,
        celcius:this.calCelcius(response.main.temp),
        temp_max:this.calCelcius(response.main.temp_max),
        temp_min:this.calCelcius(response.main.temp_min),
        description:response.weather[0].description,
        error:false

      });
      this.getWeatherIcon(this.weatherIcon,response.weather[0].id) 
    }else{
      this.setState({error:true})
    }

  }
  render(){
    return(<div className="App">
      <Form loadweather={this.getWeather} error={this.state.error}/>
    <Weather city={this.state.city}
     country={this.state.country} 
     temp_celcius={this.state.celcius}
     temp_max={this.state.temp_max}
     temp_min={this.state.temp_min}
     description={this.state.description}
     weatherIcon={this.state.icon}
     icon={this.state.Thunderstorm}/>
</div> );
  }
  
}



