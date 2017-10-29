import React, { Component } from "react";
import Form from "./Form";
import ReactModal from 'react-modal';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleAddEvent() {
     this.setState({ showModal: true});
  }

  handleCloseModal () {
    this.setState({ showModal: false});
  }

  render() {
    return (
      <nav className="blue darken-2">
        <div className="nav-wrapper">
          <a className="brand-logo center">Event Codex</a>
          <ul className="right">
            <li onClick={this.handleAddEvent}><a>Add an event</a></li>
            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="modal test"
              className={{
                base: 'FormModal'
              }}
              overlayClassName={{
                base: 'FormOverlay'
              }}
            >
              <Form>
              </Form>
              <button onClick={this.handleCloseModal}>Close Modal</button>
            </ReactModal>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header;
