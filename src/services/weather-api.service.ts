import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {combineLatest, Observable} from "rxjs";
import {CurrentWeather, WeatherForecast} from "../models/weather-api-models";

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(private http: HttpClient) { }

  //retourneert informatie over de locatie en de huidige weersinformatie
  getCurrentWeather(location: string): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(`https://api.weatherapi.com/v1/current.json?key=f40e5995730147ca8f3135201232301&q=${location}&aqi=no`);
  }

  //retourneert informatie over de locatie en de huidige weersvoorspelling voor de komende 5 dagen
  getWeatherForecast(location: string): Observable<WeatherForecast> {
    return this.http.get<WeatherForecast>(`https://api.weatherapi.com/v1/forecast.json?key=f40e5995730147ca8f3135201232301&q=${location}&days=5&aqi=no&alerts=yes`);
  }

  //retourneert informatie over de twee locaties en de huidige weersinformatie voor beide
  getWeatherComparison(locationOne: string, locationTwo: string): Observable<[CurrentWeather, CurrentWeather]> {
    return combineLatest(this.http.get<CurrentWeather>(`https://api.weatherapi.com/v1/current.json?key=f40e5995730147ca8f3135201232301&q=${locationOne}&days=5&aqi=no&alerts=yes`), this.http.get<CurrentWeather>(`https://api.weatherapi.com/v1/current.json?key=f40e5995730147ca8f3135201232301&q=${locationTwo}&days=5&aqi=no&alerts=yes`));
  }

}
