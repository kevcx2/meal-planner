import React, { Component } from 'react';
import { Row, Col } from 'react-simple-flex-grid';

import MenuItem from './menuItem/MenuItem';

import './MenuList.css';
import 'react-simple-flex-grid/lib/main.css';

class MenuList extends Component {
  render() {
    return (
      <div className="MenuList__container">
        <Row gutter={10}>
          {this.renderMenuItems()}
        </Row>
      </div>
    );
  }

  renderMenuItems() {
    return this.props.menu.map((menuItem) => {
      const { onAddToMealPlan, onRemoveFromMealPlan, onLike, onDislike } = this.props;
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
          />
        </Col>
      );
    });
  }
}

export default MenuList;
