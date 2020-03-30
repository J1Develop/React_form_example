import React from "react";

export default class Form extends React.Component {
    state = {
        name: "",
        pwd: "",
        email: "",
        numOnly: "",
        fixedLen: "",
        nameErr: "",
        pwdErr: "",
        emailErr: "",
        numOnlyErr: "",
        fixedLenErr: "",
    }

    validate = () => {
        let nameErr = "";
        let pwdErr = "";
        let emailErr = "";
        let numOnlyErr = "";
        let fixedLenErr = "";

        if (!this.state.name)
            nameErr = "Required";

        const pwdRegex = /.*[0-9].*/;
        if (!pwdRegex.test(this.state.pwd))
            pwdErr = "At least contains one number";

        if (!this.state.email.includes("@"))
            emailErr = "Email Only";

        const digitOnlyRegex = /^[0-9\b]+$/;
        if (!digitOnlyRegex.test(this.state.numOnly))
            numOnlyErr = "Numbers Only";

        if (this.state.fixedLen.length < 5)
            fixedLenErr = "Length should be larger than 5"

        if (nameErr || pwdErr || emailErr
            || numOnlyErr || fixedLenErr) {
            this.setState({
                nameErr,
                pwdErr,
                emailErr,
                numOnlyErr,
                fixedLenErr
            });
            return false;
        }
    }

    resetForm = () => {
        this.setState({
            name: "",
            pwd: "",
            email: "",
            numOnly: "",
            fixedLen: "",
        });
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid)
            console.log('State: ' + this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name: </label>
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange} />
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.nameErr}
                </div>

                <label>Password: </label>
                <input
                    type="password"
                    name="pwd"
                    value={this.state.pwd}
                    onChange={this.handleChange} />
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.pwdErr}
                </div>

                <label>Email: </label>
                <input
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange} />
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.emailErr}
                </div>

                <label>Number Only: </label>
                <input
                    name="numOnly"
                    value={this.state.numOnly}
                    onChange={this.handleChange} />
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.numOnlyErr}
                </div>

                <label>Fixed Length: </label>
                <input
                    name="fixedLen"
                    value={this.state.fixedLen}
                    onChange={this.handleChange} />
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.fixedLenErr}
                </div>

                <input type="submit" />
                <input type="reset" onClick={this.resetForm} />
            </form>
        );
    }
}