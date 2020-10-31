import React from 'react';

class AboutMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const dateNow = Date.now();
        if (this.state.isLoading) {
            const heroStr = localStorage.getItem('hero');
            if (heroStr) {
                const hero = JSON.parse(heroStr);
                if (dateNow - hero.date < 30 * 86400 * 1000) {
                    hero.isLoading = false;
                    this.setState(hero);
                    return;
                }
            }
        }
        fetch('https://sw-info-api.herokuapp.com/v1/peoples/1')
            .then(response => response.json())
            .then(hero => {
                hero.isLoading = false;
                hero.date = dateNow;
                localStorage.setItem('hero', JSON.stringify(hero));
                this.setState(hero);
            });
    }

    render() {
        const hero = this.state;
        return hero.isLoading ? <p>'Loading...'</p> : (
            <div>
                <p>name: {hero.name}</p>
                <p>height: {hero.height}</p>
                <p>birth year: {hero.birth_year} </p>
                <p>gender: {hero.gender}</p>
                <p>mass: {hero.mass}</p>
                <p>hair color: {hero.hair_color}</p>
                <p>skin color: {hero.skin_color}</p>
                <p>eye color: {hero.eye_color}</p>
            </div>
        );

    }

};

export default AboutMe;