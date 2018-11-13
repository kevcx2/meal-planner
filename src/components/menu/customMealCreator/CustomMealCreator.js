import React, { Component } from 'react';
import FadeIn from 'react-fade-in';

import CustomMealForm from './CustomMealForm';

import '../../../button.css';
import '../menuItem/MenuItem.css';
import './CustomMealCreator.css';

class CustomMealCreator extends Component {
  state = {
    showForm: false,
  }

  toggleFormDisplay = () => {
    this.setState({
      showForm: !this.state.showForm,
    });
  }

  render() {
    return (
      <div className="MenuItem__menuItemContainer">
        {this.state.showForm ? this.renderForm() : this.renderCreatePrompt()}
      </div>
    );
  }

  renderForm() {
    return (
      <FadeIn>
        <CustomMealForm
          onAddCustomMeal={this.props.onAddCustomMeal}
          onExitForm={this.toggleFormDisplay}
        />
      </FadeIn>
    );
  }

  renderCreatePrompt() {
    return (
      <div>
      <div className="CustomMealCreator__createPrompt" onClick={this.toggleFormDisplay}>
        <div className="CustomMealCreator__plusIcon">
          +
        </div>
        <div className="CustomMealCreator__label">Custom Meal</div>
      </div>
      </div>
    );
  }
}

export default CustomMealCreator;
