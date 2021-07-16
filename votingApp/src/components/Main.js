import React, { Component } from 'react'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptValue: "",
      rejectValue: "",

    };

    this.onChange = this.onChange.bind(this);

  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }



  render() {
    return (

      <div class="row">
        <div class="col-sm-2"></div>

        <div class="card" style={{ width: '18rem;' }}>
          <div class="card-header">
            <center>   Voting Process </center>
          </div>

          <div class="card border-success mb-3" style={{ width: '18rem;' }}>

            <div class="card-header bg-info border-info">Register Proposal</div>

            <div class="card-body text-primary">

              <div className="card-body card border-primary">

                <form className="mb-3" onSubmit={(event) => {
                  event.preventDefault()
                  let proposalName
                  let proposalDesc
                  proposalName = this.input.value.toString()
                  proposalDesc = this.input.value.toString()
                  this.props.registerProposal(proposalName, proposalDesc)
                }}>

                  <div className="row">
                    <div className="col">
                      <input
                        type="text"
                        ref={(input) => { this.input = input }}
                        className="form-control form-control-lg"
                        required />
                      <label><b>Proposal Name</b></label>
                    </div>

                    <div className="col">
                      <input
                        type="text"
                        ref={(input) => { this.input = input }}
                        className="form-control form-control-lg"
                        required />
                      <label><b>Proposal Description</b></label>
                    </div>
                  </div>
                  <div class="card-footer bg-transparent border-success">
                    <div className="col">
                      <center>    <button type="submit" className="btn btn-dark">Register Proposal!</button>
                      </center>
                    </div>
                  </div>
                </form>
              </div>
            </div>





            <div class="card border-danger mb-3" style={{ width: '18rem;' }}>
              <div class="card-header border-danger bg-warning ">Voting Section</div>

              <div class="row">
                <form className="mb-3" onSubmit={(event) => {
                  event.preventDefault()
                  this.props.registerVoter()
                }}>


                  <div class="card-footer bg-transparent border-success">
                    <div className="col">
                      <button type="submit" className="btn btn-success">Register Voter</button>
                    </div>
                  </div>
                </form>

                <div class="row">
                  <form className="mb-3" onSubmit={(event) => {
                    event.preventDefault()
                    this.props.Winner()
                    alert('Winning Proposals will reward 1000 eTokens to positive voters')
                  }}>
                    <div class="card-footer bg-transparent border-success">
                      <div className="col">
                        <button type="submit" className="btn btn-danger"> Winning Reward </button>
                      </div>
                    </div>
                  </form>



                  <div className="card-body card border">
                    <form className="mb-3" onSubmit={(event) => {
                      alert(this.state.acceptValue)
                      event.preventDefault()
                      let proposalAddress = this.state.acceptValue
                      this.props.voteInFavour(proposalAddress)
                    }}>



                      <div className="col">
                        <input
                          class="form-control"
                          value={this.state.acceptValue}
                          name="acceptValue"
                          onChange={this.onChange}
                          type="text"
                          placeholder="value"
                          className="form-control form-control-lg"
                          required="required"

                        /> <label><b>Enter Proposal Address</b></label>


                      </div>

                      <div class="card-footer bg-transparent border-success">
                        <div className="col">
                          <button type="submit" className="btn btn-info">Accept Proposal</button>
                        </div>
                      </div>
                    </form>

                  </div>
                  <div className="card-body">
                    <form className="mb-3" onSubmit={(event) => {
                      alert(this.state.rejectValue)
                      event.preventDefault()
                      let proposalAddress = this.state.rejectValue
                      this.props.voteInRejection(proposalAddress)
                    }}>
                      <div class="col">
                        <input
                          class="form-control"
                          value={this.state.rejectValue}
                          name="rejectValue"
                          onChange={this.onChange}
                          type="text"
                          placeholder="value"
                          className="form-control form-control-lg"
                          required="required"
                        />
                        <label><b>Enter Proposal Address </b></label>
                      </div>
                      <div class="card-footer bg-transparent border-success">
                        <div className="col">
                          <button type="submit" className="btn btn-info">Reject Proposal</button>
                        </div>
                      </div>
                    </form>


                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Main;