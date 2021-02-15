import React, { Component } from "react";
import "./home-component.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import markdownFile from "./home-component-markdown.md";

class Home extends Component {
    // Initialising state for the component
    constructor(props) {
        super(props);

        this.state = {
            file: markdownFile,
            markdown: "",
        };
    }

    // Importing markdown when the file is loaded
    componentDidMount() {
        axios.get(this.state.file).then((response) => {
            this.setState({
                markdown: response.data,
            });
        });
    }

    render() {
        return (
            <div>
                <ReactMarkdown children={this.state.markdown}></ReactMarkdown>
            </div>
        );
    }
}

export default Home;
