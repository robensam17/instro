
import React from 'react';
import ReactNotifications from 'react-browser-notifications';

class Example extends React.Component {
  constructor() {
    super();
    this.showNotifications = this.showNotifications.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  showNotifications() {
    if(this.n.supported()) this.n.show();
  }

  handleClick(event) {
    window.focus()
    this.n.close(event.target.tag);
  }

  render() {
    return (
      <div>

        <ReactNotifications
          onRef={ref => (this.n = ref)} // Required
          title="Some Title" // Required
          body="This is the body!"
          icon="devices-logo.png"
          tag="abcdef"
          onClick={event => this.handleClick(event)}
        />

        <button onClick={this.showNotifications}>
          Notify Me!
        </button>

      </div>
    )
  }
}
export default Example;
              
