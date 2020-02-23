<Router>
<div className="App">
    <div className="container">
        <div className="col-md-4 side-bar">Sidebar
                <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link href="/home" className="list-items">
                    Home
            </Nav.Link>
                <Nav.Link eventKey="1" href="/searchprofile" className="list-items">
                    Search Profile
                </Nav.Link>
                <Nav.Link eventKey="2" href="/addreview" className="list-items">
                    Add Review
            </Nav.Link>
                <Nav.Link eventKey="3" href="/myaccount" className="list-items">
                    My Account
            </Nav.Link>
            </Nav>
        </div>
        <div className="col-md-8">
            <div className="row">
                <div className="header">Header</div>
            </div>
            <div className="row">
                <Switch>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            children={<route.main />}
                        />
                    ))}
                </Switch>
            </div>
        </div>
    </div>
</div>
</Router>