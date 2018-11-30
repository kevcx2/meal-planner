import React, { Component } from 'react';
import { Row, Col } from 'react-simple-flex-grid';

import MenuItem from './menuItem/MenuItem';
import CustomMealCreator from './customMealCreator/CustomMealCreator';

import { MENU_TAB } from '../../util/constants';

import './MenuList.css';
import 'react-simple-flex-grid/lib/main.css';

class MenuList extends Component {
  render() {
    return (
      <div
        className="MenuList__container"
        data-step="2"
        data-intro="This is the menu of available meals. Here you can add or remove them to your personal meal plan. When you do that, you will see your meal plan nutrition and how it compares to your goals. 🍲"
        data-scrollto="tooltip"
      >
        <Row gutter={10}>
          {this.renderCustomMealCreator()}
          {this.renderMenuItems()}
        </Row>
      </div>
    );
  }

  renderCustomMealCreator() {
    if (this.props.currentTab !== MENU_TAB) return null;

    return (
      <Col xs={12} sm={4} md={3}>
        <CustomMealCreator onAddCustomMeal={this.props.onAddCustomMeal} />
      </Col>
    );
  }

  renderMenuItems() {
    return this.props.menu.map((menuItem, idx) => {
      const {
        onAddToMealPlan,
        onRemoveFromMealPlan,
        onLike,
        onDislike,
      } = this.props;
      const isInMealPlan = this.props.mealPlan.includes(menuItem.id);

      return (
        <Col xs={12} sm={4} md={3} key={menuItem.id}>
          <MenuItem
            menuItem={menuItem}
            isInMealPlan={isInMealPlan}
            onAddToMealPlan={onAddToMealPlan}
            onRemoveFromMealPlan={onRemoveFromMealPlan}
            onLike={onLike}
            onDislike={onDislike}
            withToolTip={idx === 0}
          />
        </Col>
      );
    });
  }
}

export default MenuList;
