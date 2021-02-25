import React, { Component } from "react";
import _ from "lodash";

import AppContext from "../../AppContext";

class ViewContext extends Component {
    static contextType = AppContext;

    render() {
        return (
            <div>
                <h1>App Context</h1>
                <pre>{JSON.stringify(this.context, null, 2)}</pre>
            </div>
        );
    }
}

export default ViewContext;
