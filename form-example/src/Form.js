import React from "react";

export default class Form extends React.Component {
    constructor(props) {
        super();
        this.state = {
            name: "",
            pwd: "",
            email: "",
            numOnly: "",
            fixedLen: "",
            selectedVal: "",
            chkboxVal: false,
            nameErr: "",
            pwdErr: "",
            emailErr: "",
            numOnlyErr: "",
            fixedLenErr: "",
            selectedValErr: "",
            chkboxValErr: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }
    
    validate = () => {
        let nameErr = "";
        let pwdErr = "";
        let emailErr = "";
        let numOnlyErr = "";
        let fixedLenErr = "";
        let selectedValErr = "";
        let chkboxValErr = "";

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
            fixedLenErr = "Length should be larger than 5";

        if (!this.state.selectedVal)
            selectedValErr = "Required";

        if(!this.state.chkboxVal)
            chkboxValErr = "Required";

        if (nameErr || pwdErr || emailErr
            || numOnlyErr || fixedLenErr || selectedValErr
            || chkboxValErr) {
            this.setState({
                nameErr,
                pwdErr,
                emailErr,
                numOnlyErr,
                fixedLenErr,
                selectedValErr,
                chkboxValErr
            });
            return false;
        }
    }

    resetForm = () => {
        this.setState({
            name: "",
            nameErr: "",
            pwd: "",
            pwdErr: "",
            email: "",
            emailErr: "",
            numOnly: "",
            numOnlyErr: "",
            fixedLen: "",
            fixedLenErr: "",
            selectedVal: "",
            selectedValErr: "",
            chkboxVal: false,
            chkboxValErr: ""
        });
    }

    handleChange = event => {
        const target = event.target;
        const isChkbox = target.type === "checkbox";

        this.setState({
            [target.name]: isChkbox? target.checked : target.value
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

                <label>Select List: </label>
                <select name="selectedVal" value={this.state.selectedVal} onChange={this.handleChange}>
                    <option value="">Please Select</option>
                    <option value="opt1">Option 1</option>
                    <option value="opt2">Option 2</option>
                    <option value="opt3">Option 3</option>
                </select>
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.selectedValErr}
                </div>

                <label>Checkbox: </label>
                <input
                    type="checkbox"
                    name="chkboxVal"
                    checked={this.state.chkboxVal}
                    onChange={this.handleChange} />
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.chkboxValErr}
                </div>

                <input type="submit" />
                <input type="reset" onClick={this.resetForm} />
            </form>
        );
    }
}