class Input extends React.Component {
    constructor() {
        super()

        this.onChange = this.onChange.bind(this);
        this.state = {
            value: ""
        };
    }

    _option(key, value, idx) {
        const optionKey = `option-${idx}`;
        var defaultValue = false;

        if (key === this.props.value) {
            defaultValue = value;
        }

        return [<option key={optionKey} value={value}>{key}</option>, defaultValue];
    }

    onChange(event, value) {
        var val = value || event.target.value;

        if (this.props.type === "select") {
            try {
                val = JSON.parse(val);
            } catch (e) { /* Not a JSON value */ }
        }

        this.state = {
            value: val
        };

        if (this.props.onChange) {
            this.props.onChange(this, val);
        }
    }

    render() {
        return (
            <label>
                {this.props.title}
                {(() => {
                    switch ((this.props.type || "").toLowerCase()) {
                    case "select":
                        var options, props = {};

                        if (this.props.options) {
                            const isArray = Array.isArray(this.props.options);

                            options = (isArray ? this.props.options : Object.keys(this.props.options)).map((key, idx) => {
                                const [option, def] = this._option(
                                    key,
                                    isArray ? key: JSON.stringify(this.props.options[key]),
                                    idx
                                );

                                if (def) { props.defaultValue = def; }

                                return option;
                            });
                        }

                        return <select {...props} onChange={this.onChange}>{options}</select>

                    default:
                        return <input type="text" value={this.props.value} placeholder={this.props.placeholder} onChange={this.onChange} />
                    }
                })()}
            </label>
        );
    }
}

class Generator extends React.Component {
    constructor() {
        super()

        const randomPick = (arr) => {
            return arr[Math.floor(Math.random() * arr.length)];
        };

        this.onChange = this.onChange.bind(this);
        this.onSelectClicked = this.onSelectClicked.bind(this);

        this.locations = {
            "<None>": [],

            "Copenhagen": [
                "LEO Innovation Lab, Denmark",
                "Niels Hemmingsens Gade 1",
                "DK-1153 Kbh K"
            ],

            "London": [
                "LEO Innovation Lab, UK",
                "Second Home",
                "68-80 Hanbury St",
                "London E1 5JL"
            ],

            "Paris": [
                "LEO Innovation Lab, France",
                "Chez Kwerk",
                "50 route de la Reine",
                "92100 Boulogne-Billancourt"
            ],

            "San Francisco": [
                "LEO Innovation Lab, USA",
                "Page Mill Rd",
                "94306 Palo Alto"
            ],

            "Toronto": [
                "LEO Innovation Lab, Canada",
                "‪123 Commerce Valley Dr., Suite 400‪",
                "Markham, ONT, L3T 7W8"
            ],
        };

        this.state = {
            name: "Kristian Hart",
            title: randomPick([
                "Chocolate Beer Specialist",
                "Shredded Cheese Authority",
                "Smarties Expert",
                "Cat Behavior Consultant",
                "Ex-moonshiner",
                "Chief of Unicorn Division",
                "Slow Runner",
            ]),
            phone: "+45 1234 5678",
            location: this.locations["Copenhagen"]
        };
    }

    get _signatureBox() {
        return (
            <div style={{
                fontSize: "14px",
                fontWeight: 200,
                fontFamily: "Montserrat,'Helvetica Neue',Helvetica,Arial,sans-serif",
                lineHeight: "17px",
                letterSpacing: "0.015em",
            }} id="signature-box">
            {(() => {
                const result = [];

                if (this.state.name) {
                    result.push((
                        <p key="name" style={{
                            fontWeight: 600,
                            margin: 0,
                        }}>{this.state.name}</p>
                    ));
                }

                if (this.state.title) {
                    result.push((
                        <p key="title" style={{
                            margin: "0 0 2px",
                        }}>{this.state.title}</p>
                    ));
                }

                if (this.state.phone) {
                    result.push((
                        <p key="phone" style={{
                            margin: "0 0 10px"
                        }}>
                            <a href="tel: +45 31 33 47 81" style={{
                                color: "#dd574d",
                                textDecoration: "none"
                            }}>{this.state.phone}</a>
                        </p>
                    ));
                }

                if (this.state.location) {
                    const locationElements = this.state.location.map((entry, idx) => {
                        const locationKey = `loc-${idx}`;

                        return <span key={locationKey} style={{display: "block"}}>{entry}</span>
                    });

                    result.push((
                        <p key="location" style={{
                            margin: "0 0 4px",
                            color: "#dd574d",
                        }}>
                            {locationElements}
                        </p>
                    ));
                }

                result.push((
                    <p key="logo">
                        <a href="http://www.leoinnovationlab.com">
                            <img
                                src="https://lh3.google.com/u/0/d/0B9f8ZRdsj6klZjdlaGNhV0RlNjQ=w3867-h3181-k-iv1?v=1470044354000"
                                alt="LEO Innovation Lab"
                                title="LEO Innovation Lab"
                                width="200"
                                height="51"
                                style={{
                                    border: 0,
                                    width: "200px",
                                    height: "51px",
                            }} />
                        </a>
                        <span style={{
                            display: "block",
                            color: "#dd574d",
                            fontSize: "12px",
                        }}>
                            www.leoinnovationlab.com
                        </span>
                    </p>
                ))

                return result;
            })()}
            </div>
        );
    }

    onSelectClicked() {
        const signatureBox = document.getElementById("signature-box");

        signatureBox.focus();

        if (document.selection) {
            var range = document.body.createTextRange(signatureBox);
            range.moveToElementText();
            range.select();
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(signatureBox);
            window.getSelection().addRange(range);
        }
    }

    onChange(input, value) {
        if (input) {
            const newState = {};

            newState[input.props.name] = value;

            this.setState(newState);
        }
    }

    render() {
        return (
            <div>
                <div key="leftColumn" className="col">
                    <Input name="name" title="Full name" value={this.state.name} onChange={this.onChange} />
                    <Input name="title" title="Title" value={this.state.title} onChange={this.onChange} />
                    <Input name="phone" title="Telephone" value={this.state.phone} onChange={this.onChange} />
                    <Input name="location" type="select" value="Copenhagen" title="Location" options={this.locations} onChange={this.onChange} />
                </div>
                <div key="rightColumn" className="col">
                    {this._signatureBox}
                    <a href="javascript:void(0)" className="selectButton" onClick={this.onSelectClicked}>Select signature</a>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    React.createElement(Generator, null),
    document.getElementById("container")
);
