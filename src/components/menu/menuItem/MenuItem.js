import React, { Component } from 'react';
import ClampLines from 'react-clamp-lines';

import MenuImagePlaceholder from './MenuImagePlaceholder';
import ThumbIcon from './ThumbIcon';

import '../../../button.css';
import './MenuItem.css';

class MenuItem extends Component {
  render() {
    const { menuItem } = this.props;

    return (
      <div className="MenuItem__menuItemContainer">
        <div className="MenuItem__menuImageContainer">
          <MenuImagePlaceholder />
        </div>
        <div className="MenuItem__menuItemName">
          <ClampLines
            text={menuItem.name}
            lines="2"
            buttons={false}
          />
        </div>
        <div className="MenuItem__menuItemNutrition">
          {`Cals: ${menuItem.cals} P: ${menuItem.protein}g C: ${menuItem.carbs}g F: ${menuItem.fat}g`}
        </div>
        {this.renderMenuItemFooter()}
      </div>
    );
  }

  renderMenuItemFooter() {
    const { menuItem, isInMealPlan } = this.props;

    const thumbsUpIconClass =
      `MenuItem__menuItemPreference${
        menuItem.liked ? ' MenuItem__menuItemPreference--active' : ''
      }`;
    const thumbsDownIconClass =
      `MenuItem__menuItemPreference MenuItem__menuItemPreference--thumbsDown${
        menuItem.disliked ? ' MenuItem__menuItemPreference--active' : ''
      }`;

    return (
      <div className="MenuItem__menuItemFooter">
        <div
          data-step={this.props.withToolTip ? '3' : undefined}
          data-intro={this.props.withToolTip ? 'Here you can like or dislike meals. This will help us suggest a personalized meal plan for you! 👍' : undefined}
        >
          <div className={thumbsUpIconClass} onClick={() => this.props.onLike(menuItem.id)}>
            <ThumbIcon />
          </div>
          <div className={thumbsDownIconClass} onClick={() => this.props.onDislike(menuItem.id)}>
            <ThumbIcon />
          </div>
        </div>
        { isInMealPlan ? (
          <button
            className="button button--secondary"
            onClick={() => this.props.onRemoveFromMealPlan(menuItem.id)}
          >
            Remove
          </button>
        ) : (
          <button className="button" onClick={() => this.props.onAddToMealPlan(menuItem.id)}>
            Add
          </button>
        )}
      </div>
    );
  }
}

export default MenuItem;
