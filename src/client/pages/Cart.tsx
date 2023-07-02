import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import { CheckoutFormData } from '../../common/types';
import { Form } from '../components/Form';
import { ApplicationState, checkout, clearCart } from '../store';

const bem = cn('Cart');

export const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const cart = useSelector((s: ApplicationState) => s.cart);
    const latestOrderId = useSelector((s: ApplicationState) => s.latestOrderId);

    const onClear = useCallback(() => {
        dispatch(clearCart());
    }, [dispatch]);

    const onSubmit = useCallback((form: CheckoutFormData) => {
        dispatch(checkout(form, cart));
    }, [dispatch, cart]);

    let content: React.ReactNode = null;

    const cartIsEmpty = !Object.keys(cart).length;

    if (!cartIsEmpty) {
        const rows = Object.entries(cart).map(([id, item], index) => {

            return (
                <tr key={id} data-testid={`order-table-row-${id}`}>
                    <th className={bem('Index')} scope="row">{index + 1}</th>
                    <td className={bem('Name')} data-testid="row-name">{item.name}</td>
                    <td className={bem('Price')} data-testid="row-price">${item.price}</td>
                    <td className={bem('Count')} data-testid="row-count">{item.count}</td>
                    <td className={bem('Total')} data-testid="row-total">${item.count * item.price}</td>
                </tr>
            );
        });

        const total = Object.values(cart).reduce((sum, { count, price }) => sum + count * price, 0);

        content = (
            <table className={bem('Table', ['table'])} data-testid="order-table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Count</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4}>Order price:</td>
                        <td className={bem('OrderPrice')} data-testid="total">${total}</td>
                    </tr>
                </tfoot>
            </table>
        );
    } else {
        content = (
            <>
                Cart is empty. Please select products in the <Link to="/catalog" data-testid="link-to-catalog">catalog</Link>.
            </>
        );
    }

    const actions = cartIsEmpty ? null : (
        <div className="row mb-4">
            <div className="col-6">
                <button className={bem('Clear', ['btn', 'btn-outline-secondary'])} onClick={onClear} data-testid="order-clear">Clear shopping cart</button>
            </div>
        </div>
    );

    const form = cartIsEmpty ? null : (
        <div className="row" data-testid="order-from">
            <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                <h2>Сheckout</h2>
                <Form onSubmit={onSubmit} />
            </div>
        </div>
    );

    const alertClass = process.env.BUG_ID !== '8' ? 'alert-success' : 'alert-danger';

    const orderInfo = cartIsEmpty && latestOrderId ? (
        <div className="row my-2">
            <div className="col-12 col-sm-8 col-md-6">
                <div className={bem('SuccessMessage', ['alert', alertClass])} data-testid="success-message">
                    <h4 className="alert-heading">Well done!</h4>
                    <p>Order #<strong className={bem('Number')} data-testid="order-counter">{latestOrderId}</strong> has been successfully completed.</p>
                    <hr/>
                    <p className="mb-0">Please wait for confirmation of delivery.</p>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <div className={bem()}>
            <Helmet title="Shopping cart" />
            <div className="row mb-4">
                <div className="col">
                    <h1>Shopping cart</h1>
                    {orderInfo}
                    {content}
                </div>
            </div>
            {actions}
            {form}
        </div>
    );
}
