import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {combineLatest, Observable} from "rxjs";
import {CurrentWeather, WeatherForecast} from "../models/weather-api-models";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(location: string): Observable<HttpResponse<CurrentWeather>> {
    return this.http.get<CurrentWeather>(`https://api.weatherapi.com/v1/current.json?key=f40e5995730147ca8f3135201232301&q=${location}&aqi=no`, {observe: 'response'});
  }

  getWeatherForecast(location: string): Observable<HttpResponse<WeatherForecast>> {
    return this.http.get<WeatherForecast>(`https://api.weatherapi.com/v1/forecast.json?key=f40e5995730147ca8f3135201232301&q=${location}&days=5&aqi=no&alerts=yes`, {observe: 'response'});
  }

  getWeatherComparison(locationOne: string, locationTwo: string): Observable<[HttpResponse<CurrentWeather>, HttpResponse<CurrentWeather>]> {
    return combineLatest(this.http.get<CurrentWeather>(`https://api.weatherapi.com/v1/current.json?key=f40e5995730147ca8f3135201232301&q=${locationOne}&days=5&aqi=no&alerts=yes`,{observe: 'response'}), this.http.get<CurrentWeather>(`https://api.weatherapi.com/v1/current.json?key=f40e5995730147ca8f3135201232301&q=${locationTwo}&days=5&aqi=no&alerts=yes`, {observe: 'response'}));
  }

}
