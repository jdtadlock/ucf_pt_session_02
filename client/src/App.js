import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  constructor() {
    super();

    this.state = {
      fruits: ['apple', 'orange', 'grape'],
      checked: [],
      email: '',
      password: ''
    }
  }

  handleCheckboxes = (index, event) => {
    let values = [...this.state.checked];
    let fruit = event.target.value;

    if ( !values.includes(fruit) ) {
      values.push(fruit);
    } else {
      let index = values.indexOf(fruit);

      values.splice(index, 1);
    }

    this.setState({
      checked: values
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getValues = () => {
    console.log(this.state.checked);
  }

  getUsers() {
    axios.get('/users')
      .then(({ data }) => {
        console.log(data);
      });
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(data => console.log(data));
  }

  login = (e) => {
    e.preventDefault();

    axios.post('/login', {
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      console.log(res);
    })
  }

  isAuth = () => {
    axios.get('/isauth')
      .then(({data}) => {
        console.log(data);
      })
  }

  componentDidMount() {
    this.isAuth();
  }

  render() {
    return (
      <div>
        <h1>Test</h1>

        {this.state.fruits.map((fruit, index) => (
          <label key={index}>
            {fruit[0].toUpperCase() + fruit.slice(1)}
            <input type="checkbox" name="fruits" value={fruit} onChange={(event) => {
              this.handleCheckboxes(index, event);
            }} />
          </label>
        ))}

        <button onClick={this.getValues}>Submit</button>

        <button onClick={this.getUsers}>Get Users</button>

        <form>
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
          <button onClick={this.login}>Submit</button>
        </form>
        {/* <label>
          Orange
          <input type="checkbox" name="fruits" value="orange" onChange={this.handleChange} />
        </label> */}
      </div>
    );
  }
}

export default App;
