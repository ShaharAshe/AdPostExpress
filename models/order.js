'use strict';

const { DataTypes, Model } = require('sequelize');
/**
 * This model is not used in the example, it is only to show
 * you how to define associations in the model classes.
 * A contact may have many orders. An order belongs to a contact.
 *
 * note also the use of the defaultValue, unique constraints and custom validation.
 */
module.exports = (sequelize) => {
    class Order extends Model {
        static associate(models) {
        // define association here
        Order.belongsTo(models.Contact, {
            foreignKey: 'contact_id'
        });
        }
    }
    Order.init({
            contact_id: DataTypes.INTEGER,
            orderDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }, // you can set a default value
            orderAmount: { type: DataTypes.DECIMAL, defaultValue: 1.0 },
            orderStatus: {
                type: DataTypes.ENUM('pending', 'shipped', 'delivered'), // you can define ENUMs
                defaultValue: 'pending'
            },
            referenceNumber: { type: DataTypes.STRING, unique: true }
        }, {
            sequelize,
            modelName: 'Order',
            // this is a custom validation example
            validate: {
                noOrderWithSameContactOrderDate() {
                    // This is a custom model level validation
                    // that checks for the uniqueness of the contact_id and orderDate
                    return Order.findOne({
                        where: {
                            contact_id: this.contact_id,
                            orderDate: this.orderDate
                        }
                    }).then((order) => {
                        if (order) {
                            throw new Error('An order of the same contact at the same date already exists');
                        }
                    });
                }
            }
        });
    return Order;
}