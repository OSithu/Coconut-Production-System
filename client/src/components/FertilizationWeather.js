import { Oval } from 'react-loader-spinner';
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';

function FertilizationWeather() {
    const [input, setInput] = useState('');
    const [weather, setWeather] = useState({
        loading: false,
        data: {},
        error: false,
    });

    const toDateFunction = () => {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const WeekDays = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const currentDate = new Date();
        const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
        return date;
    };

    const search = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setInput('');
            setWeather({ ...weather, loading: true });
            const url = 'https://api.openweathermap.org/data/2.5/weather';
            const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
            await axios
                .get(url, {
                    params: {
                        q: input,
                        units: 'metric',
                        appid: api_key,
                    },
                })
                .then((res) => {
                    console.log('res', res);
                    setWeather({ data: res.data, loading: false, error: false });
                })
                .catch((error) => {
                    setWeather({ ...weather, data: {}, error: true });
                    setInput('');
                    console.log('error', error);
                });
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '600px',
                minHeight: '379px',
                backgroundColor: '#ffffff',
                textAlign: 'center',
                // margin: '128px auto',
                borderRadius: '10px',
                padding: '24px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <h1
                style={{
                    fontSize: '2.3rem',
                    color: 'rgb(17, 144, 0)',
                    marginBottom: '16px',
                }}
            >
                Weather Condition
            </h1>
            <div
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    boxSizing: 'border-box',
                    border: '2px solid rgb(204, 204, 204)',
                    borderRadius: '20px',
                    backgroundColor: '#e5eef0',
                    padding: '12px 40px',
                    marginBottom: '24px',
                }}
            >
                <input
                    type="text"
                    className="city-search"
                    placeholder="Enter City Name.."
                    name="query"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyPress={search}
                    style={{
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        fontSize: '16px',
                        backgroundColor: 'transparent',
                    }}
                />
            </div>
            {weather.loading && (
                <div style={{ margin: '24px 0' }}>
                    <Oval type="Oval" color="black" height={100} width={100} />
                </div>
            )}
            {weather.error && (
                <div style={{ margin: '24px 0' }}>
                    <span style={{ color: '#d32f2f', fontSize: '24px', marginBottom: '8px' }}>
                        <FontAwesomeIcon icon={faFrown} />
                        <span style={{ fontSize: '20px', marginLeft: '8px' }}>City not found</span>
                    </span>
                </div>
            )}
            {weather && weather.data && weather.data.main && (
                <div>
                    <div style={{ margin: '24px 0' }}>
                        <h2 style={{ fontSize: '1.5rem', color: '#444', marginBottom: '8px' }}>
                            {weather.data.name}, <span>{weather.data.sys.country}</span>
                        </h2>
                        <div style={{ fontSize: '1.25em', color: '#777', marginBottom: '16px' }}>
                            <span>{toDateFunction()}</span>
                        </div>
                        <div style={{ fontSize: '3rem', fontWeight: '700', color: '#1e2432' }}>
                            <img
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                                    marginBottom: '8px',
                                }}
                                src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                                alt={weather.data.weather[0].description}
                            />
                            {Math.round(weather.data.main.temp)}
                            <sup style={{ fontSize: '1.3rem', verticalAlign: 'super' }}>°C</sup>
                        </div>
                        <div style={{ fontWeight: '500', color: '#666', marginTop: '16px' }}>
                            <p>{weather.data.weather[0].description.toUpperCase()}</p>
                            <p>Wind Speed: {weather.data.wind.speed}m/s</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FertilizationWeather;
