import React, { FC, useCallback, useState } from 'react';
import { Switch, Route } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '@bem-react/classname';

import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Product } from './pages/Product';
import { Delivery } from './pages/Delivery';
import { Contacts } from './pages/Contacts';
import { Helmet } from 'react-helmet';
import { Cart } from './pages/Cart';
import { useSelector } from 'react-redux';
import { ApplicationState } from './store';

const bem = cn('Application');

export const Application: FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const cart = useSelector((s: ApplicationState) => s.cart);

    const toggle = useCallback(() => setCollapsed(!collapsed), [setCollapsed, collapsed]);
    const hide = useCallback(() => {
        if (process.env.BUG_ID === '4') {
            setCollapsed(false);
        } else {
            setCollapsed(true);
        }
    }, [setCollapsed]);

    const count = Object.keys(cart).length;
    const cartLabel = count ? `Cart (${count})` : 'Cart';
    const navbarClass = collapsed ? 'collapse navbar-collapse' : 'navbar-collapse';

    return <div className={bem()}>
        <Helmet titleTemplate="%s — Example store" />
        <nav className="navbar navbar-expand-sm navbar-light bg-light" data-testid="navbar">
            <div className="container">
                <Link className={bem('Brand', ['navbar-brand'])} to="/" data-testid="main-title">Example store</Link>
                <button className={bem('Toggler', ['navbar-toggler'])} aria-label="Toggle navigation" onClick={toggle} data-testid="navbar-toggler">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={bem('Menu', [navbarClass])} data-testid="menu">
                    <div className="navbar-nav">
                        <NavLink className="nav-link" activeClassName="active" to="/catalog" onClick={hide} data-testid="nav-link">Catalog</NavLink>
                        <NavLink className="nav-link" activeClassName="active" to="/delivery" onClick={hide} data-testid="nav-link">Delivery</NavLink>
                        <NavLink className="nav-link" activeClassName="active" to="/contacts" onClick={hide} data-testid="nav-link">Contacts</NavLink>
                        <NavLink className="nav-link" activeClassName="active" to="/cart" onClick={hide} data-testid="nav-link">{cartLabel}</NavLink>
                    </div>
                </div>
            </div>
        </nav>
        <div className="container pt-4" data-testid="container">
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/catalog" exact component={Catalog} />
                <Route path="/catalog/:id" component={Product} />
                <Route path="/delivery" component={Delivery} />
                <Route path="/contacts" component={Contacts} />
                <Route path="/cart" component={Cart} />
            </Switch>
        </div>
    </div>;
};
