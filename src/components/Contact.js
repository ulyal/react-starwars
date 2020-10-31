import React from 'react';
import styles from "../css_modules/contact.module.css";

class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        const dateNow = Date.now();
        if (this.state.isLoading) {
            const planetsStr = localStorage.getItem('planets');
            if (planetsStr) {
                const planets = JSON.parse(planetsStr);
                if (dateNow - planets.date < 30 * 86400 * 1000) {
                    planets.isLoading = false;
                    this.setState(planets);
                    return;
                }
            }
        }

        fetch('https://sw-info-api.herokuapp.com/v1/planets')
            .then(response => response.json())
            .then(data => {
                const names = data.map(planet => planet.name);
                localStorage.setItem('planets', JSON.stringify({date: dateNow, names}));
                this.setState({ isLoading: false, names})
                })
    }

    render() {
        return (
            <div className={styles.container}>
                <form action="action_page.php">

                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" name="firstname" placeholder="Your name.."/>

                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>

                    <label htmlFor="planet">Planet</label>
                    <select id="planet" name="planet">
                        {this.state.isLoading ? null :
                            this.state.names.map(name => <option value="{name}">{name}</option>)}
                    </select>

                    <label htmlFor="subject">Subject</label>
                    <textarea id="subject" name="subject" placeholder="Write something.."></textarea>

                    <input type="submit" value="Submit"/>

                </form>
            </div>
        );
    };

}

export default Contact;